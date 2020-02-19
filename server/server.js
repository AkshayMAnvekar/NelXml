const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const XLSX = require('xlsx');
const fs = require('fs');
// const AdmZip = require('adm-zip');
var archiver = require('archiver');
// import pd = require('pretty-data';);
const pd = require('pretty-data').pd;
const MyJsonFunction = require('./JsonGenerator.js');
const FolderClearFunction = require('./folderClear.js');
const app = express();

async function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const CURRENT_WORKING_DIR = process.cwd();

app.use(express.static(path.join(CURRENT_WORKING_DIR, 'public')));

app.get('/test', (req, res)=>{
  res.send('My page');
})
app.get('/test1', (req, res)=>{
  res.send('My page 2');
})
app.get('/getfile', (req, res)=>{
  console.log(req.query)
  res.send('My page 2');
})
app.post('/getfile', (req, res)=>{
  // console.log(req,res)
  // fs.writeFileSync('./Output/req.json', req)
  // fs.writeFileSync('./Output/res.json', res)
  new formidable.IncomingForm().parse(req)
    .on('file', async function(name, file) {
      let workbook = XLSX.readFile(`${file.path}`);
      let xlsxJSON = '';
      let tuteXml = {};
      // console.log(workbook)
      let sheet_name_list = workbook.SheetNames;
      var a = 0
      await FolderClearFunction(`./Output/JSONS`)
      sleep(1000)
      for(let x of sheet_name_list){
        xlsxJSON = XLSX.utils.sheet_to_json(workbook.Sheets[x], {defVal:""});
        console.log(xlsxJSON);
        await MyJsonFunction(xlsxJSON).then(value => {
          ++a
          tuteXml[a] = value
          console.log('1',tuteXml)
          fs.writeFileSync(`./Output/JSONS/${x}.json`, pd.json(JSON.stringify(baseJson)));
          
        });
      }
      var output = fs.createWriteStream('./public/Output.zip');
      var archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      });
      archive.pipe(output);
      archive.directory('./Output/JSONS', false);
      archive.finalize();
      // tuteXml = JSON.parse(fs.readFileSync('./Output/JSON.json'))
      return res.send(
        // './Output/JSON.json',
        JSON.stringify(tuteXml)
        // pd.json(JSON.stringify(tuteXml))
      )
    });

})

app.get('*', (req, res)=>{
  res.send('My web page');
})

const PORT = process.env.PORT || 3000
app.listen(PORT);
