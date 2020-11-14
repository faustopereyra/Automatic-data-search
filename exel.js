const Excel = require('exceljs');

module.exports.exTest = async function(localidades, title, worksheet, workbook){


const loc = localidades

//console.log(loc)

worksheet.addRow({mayorista: loc.name, contacto: 'Direccion:'+loc.formatted_address , localidad: title, particularidad:loc.types});
worksheet.addRow({contacto: 'Tel:'+ loc.formatted_phone_number , localidad: title});
worksheet.addRow({contacto: loc.website , localidad: title});



// save under Provincias.xlsx
await workbook.xlsx.writeFile('provincias.xlsx');


//console.log("File is written");

const totalRows = worksheet.rowCount;  



};
