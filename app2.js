const keys = require("./key");

const Excel = require('exceljs');
const { datar } = require("./test");

https = require('https');

exel = require("./exel")




const key = keys.key

let result = ""

let place = "mayoristas+la+plata+buenos+aires+argentina"

const query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+ place +"&fields=name,formatted_phone_number&key=" + key

//const query = "https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=ATtYBwKgQ3gMtUyCZLsPt4uM9KzNCtB5SWqA8EYsZfE_V7RgleQsfvH48O4HsVPRFMGm2y2cc5SWRiJZ_Ub0kDO8NSg7ipKXlajViiJrnjBWOYogiEMKrC62FYxsss99jcxn_dqlxusD6s1NG6lOwIMbwxfAEHLMmtqIE41zXOzvYf1u4Un9fE-cgKEZh78KqYW_gYfFhGPEY8nsgA4tzaSD9U1CM1l9cQy1bdMIpqoejolalqJJ2-qm-ykIgaYFGzHx_wxfWf3gPgdhKuO6_fTN7lMxAx-aj-N3vcjTF2SrmTvJcYIxfYoYukxHl9tY_2CmfIF2U1LKBLbkTfhlELdxHEa5rpB4aTu-Ut8-pXUGFlc-XjcDIB8gwM-nVNvosI84sL06kMOdOzqvwa6FILt4G7DaGdYBG23b0meN7YLvbUfyBrNb&key=AIzaSyCIZP4LIElJfQ5JAx7Vn3s6VYFTzN8ROVo"


const localidad = "san jose"

const searchLookup = (query, localidad, callback) =>{
      https.get( query, (resp) =>{
          let data = '';
         
          resp.on('data', (chunk) => {
            data += chunk;
          });
        
          resp.on('end', callback(data));
        
        }).on("error", (err) => {
          console.log("Error: " + err.message);
      });
  }








const recursive = (data) => {

    console.log(data)
    result = {results: [1]}
    
    result.results.forEach(el => {

      //detailLookup(el.place_id, localidad)
    });

    if(result.next_page_token){
        console.log("hola")
      let newQuery = "https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken="+ result.next_page_token+"&key="+key;
      searchLookup(newQuery, localidad, recursive)
  }
  }








const detailLookup = async (id, localidad) =>{
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
            //console.log(details.name)
          });

        
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
};



searchLookup(query, localidad, recursive);