const Excel = require('exceljs');

module.exports.exTest = async function(localidades, title, worksheet, workbook){
  
//console.log(localidades)

const loc = localidades

    worksheet.addRow({mayorista: loc.name, contacto: 'Direccion:'+loc.formatted_address , localidad: title, particularidad: new Date(1970, 1, 1)});
    worksheet.addRow({contacto: 'Tel:'+ loc.formatted_phone_number , localidad: title, particularidad: new Date(1970, 1, 1)});
    worksheet.addRow({contacto: loc.website , localidad: title, particularidad: new Date(1970, 1, 1)});


    //worksheet.addRow({mayorista: 1, contacto: 'Tel:', localidad: "parana", particularidad: new Date(1970, 1, 1)});
    //'worksheet.addRow({mayorista: 1, contacto: 'Mail:', localidad: "parana", particularidad: new Date(1970, 1, 1)});



//worksheet.addRow({mayorista: 2, contacto: '', localidad: "parana", particularidad: new Date(1965, 1, 7)});

// save under export.xlsx
await workbook.xlsx.writeFile('provincias.xlsx');


console.log("File is written");
};

const data =[ {
    formatted_address: 'Av. Jorge Newbery 2394, Paraná, Entre Ríos, Argentina',
    formatted_phone_number: '0343 426-9291',
    name: 'Exfa Distribuciones',
    types: [ 'store', 'point_of_interest', 'establishment' ],
    website: 'http://www.facebook.com/ExfaDistrib'
}]



//exTest(data, "posadas");