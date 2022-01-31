var json2xls = require('json2xls');
const fs=require('fs');
let jsonFilePath=`./temp.json`;
    let batsmanFile = fs.readFileSync(jsonFilePath);
    batsmanFile=JSON.parse(batsmanFile);
console.log(batsmanFile);
batsmanFile.length;
var xls = json2xls(batsmanFile);

fs.writeFileSync('data.xlsx', xls, 'binary');