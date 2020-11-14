const keys = require("./key");

const Excel = require('exceljs');
const { data } = require("./test");

const newvaProvincia = data

https = require('https');

exel = require("./exel")

const key = keys.key


const searchLookup =  (query, localidad) =>{
     https.get( query, (resp) =>{
        let data = '';
       
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        resp.on('end', () => {
          result = JSON.parse(data)
          
          result.results.forEach( el => {
    
             detailLookup(el.place_id, localidad)
          });


          if(result.next_page_token){
            let newQuery = "https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken="+ result.next_page_token+"&key="+key;
            searchLookup(newQuery, localidad)
        }
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}



const detailLookup =  (id, localidad) =>{
    const newQuery = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+ id +"&fields=name,formatted_phone_number,formatted_address,type,website&key=" + key;

    https.get( newQuery, (resp) =>{
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
          });

          resp.on('end',  () => {
            let details = JSON.parse(data).result
            console.log(details)
             exel.exTest(details, localidad, worksheet, workbook);
          });

        
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
};


const workbook = new Excel.Workbook();
const worksheet = workbook.addWorksheet("Provincia");

worksheet.columns = [
  {header: 'Mayorista', key: 'mayorista', width: 30},
  {header: 'Contacto', key: 'contacto', width: 45}, 
  {header: 'Particularidad', key: 'particularidad', width: 25,},
  {header: 'Localidad', key: 'localidad', width: 25,}
];




newvaProvincia.forEach( search => {
    const place = search[0];
    const localidad = search[1]
    const query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+ place +"&fields=name,formatted_phone_number&key=" + key;
    searchLookup(query, localidad);
} );



