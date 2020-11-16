const keys = require("./key");

const Excel = require('exceljs');
const { data } = require("./test");

https = require('https');

exel = require("./exel")

const key = keys.key


const searchLookup =  (query, localidad) =>{
  //make http request
     https.get( query, (resp) =>{
        let data = '';
       
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        resp.on('end', () => {
          //Parse data
          result = JSON.parse(data)
          
          //Make a detail Lookup for each responce
          result.results.forEach( el => {
    
             detailLookup(el.place_id, localidad)
          });

          //Make a http request for the next query
          // if(result.next_page_token){
          //   let newQuery = "https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken="+ result.next_page_token+"&key="+key;
          //   searchLookup(newQuery, localidad)
          // }
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}



const detailLookup =  (id, localidad) =>{
    const newQuery = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+ id +"&fields=name,formatted_phone_number,formatted_address,type,website&key=" + key;

    //make a detail http request
    https.get( newQuery, (resp) =>{
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
          });

        resp.on('end',  () => {
          let details = JSON.parse(data).result
          console.log(details)

          //Call the exel function to add data to the worksheet
          exel.exDatabase(details, localidad, worksheet, workbook);
        });

        
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
};

//create Work spreadsheet

const workbook = new Excel.Workbook();
const worksheet = workbook.addWorksheet("Provincia");

//Setup the worksheet columns
worksheet.columns = [
  {header: 'Mayorista', key: 'mayorista', width: 30},
  {header: 'Contacto', key: 'contacto', width: 45}, 
  {header: 'Particularidad', key: 'particularidad', width: 25,},
  {header: 'Localidad', key: 'localidad', width: 25,}
];

//Gader data for each data point
data.forEach( search => {
    const place = search[0];
    const localidad = search[1]
    const query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+ place +"&fields=name,formatted_phone_number&key=" + key;
    searchLookup(query, localidad);
} );



