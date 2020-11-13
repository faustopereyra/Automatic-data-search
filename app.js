const keys = require("./key");

const Excel = require('exceljs');

https = require('https');

exel = require("./exel")

const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Ciudad");

worksheet.columns = [
  {header: 'Mayorista', key: 'mayorista', width: 30},
  {header: 'Contacto', key: 'contacto', width: 45}, 
  {header: 'Particularidad', key: 'particularidad', width: 25,},
  {header: 'Localidad', key: 'localidad', width: 25,}
];


const key = keys.key

let result = ""

let place = "mayoristas+la+plata+buenos+aires+argentina"

let query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+ place +"&fields=name,formatted_phone_number&key=" + key



const searchLookup = (query) =>{
    https.get( query, (resp) =>{
        let data = '';
       
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        resp.on('end', () => {
          result = JSON.parse(data)
          //console.log(result)
          
          result.results.forEach(el => {
    
            detailLookup(el.place_id)
          });

          if(result.next_page_token){
              console.log("hola")
            let newQuery = "https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken="+ result.next_page_token+"&key="+key ;
            let p = "este es p"
            searchLookup(newQuery)
        }
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}



const detailLookup = (id) =>{
    const newQuery = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+ id +"&fields=name,formatted_phone_number,formatted_address,type,website&key=" + key;

    //console.log(newQuery)
    https.get( newQuery, (resp) =>{
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
          });

          resp.on('end', () => {
            //console.log(JSON.parse(data));
            let details = JSON.parse(data).result
            //console.log(details)
            exel.exTest(details, "posadas", worksheet, workbook);
          });

        
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
};

searchLookup(query)