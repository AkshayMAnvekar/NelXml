const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const XLSX = require('xlsx');
// import pd = require('pretty-data';);
const pd = require('pretty-data').pd;
const MyJsonFunction = require('./JsonGenerator.js');

const app = express();

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
  new formidable.IncomingForm().parse(req)
    .on('file', async function(name, file) {
      let workbook = XLSX.readFile(`${file.path}`);
      let xlsxJSON = '';
      let tuteXml = '';
      // console.log(workbook)
      let sheet_name_list = workbook.SheetNames;
      for(let x of sheet_name_list){
        xlsxJSON = XLSX.utils.sheet_to_json(workbook.Sheets[x], {defVal:""});
        console.log(xlsxJSON);
        //  let xml = MyJsonFunction(xlsxJSON);
        //  console.log(pd.xml(xml));
        await MyJsonFunction(xlsxJSON).then(value => {
          tuteXml += value
          console.log('1',tuteXml)
        });
        console.log('2',tuteXml);
      }
      return res.send(
        // tuteXml
        pd.xml(tuteXml)
      )
    });

})

app.get('*', (req, res)=>{
  res.send('My web page');
})

const PORT = process.env.PORT || 3000
app.listen(PORT);
