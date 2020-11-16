const Excel = require('exceljs');

module.exports.exDatabase = async function(loc, title, worksheet, workbook){

//Add new row containing the data
worksheet.addRow({mayorista: loc.name, contacto: 'Direccion:'+loc.formatted_address , localidad: title, particularidad:loc.types});
worksheet.addRow({contacto: 'Tel:'+ loc.formatted_phone_number , localidad: title});
worksheet.addRow({contacto: loc.website , localidad: title});



// save under Provincias.xlsx
await workbook.xlsx.writeFile('provincias.xlsx');

};
