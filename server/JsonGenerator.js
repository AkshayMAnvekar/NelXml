const fs = require('fs');
const xml2js = require('xml2js');
const excel = require('excel4node');
const AdmZip = require('adm-zip');
const ExcelJS = require('exceljs');
const XLSX = require('xlsx');
const stringSimilarity = require('string-similarity');
// const XLSX = require('xlsx');
const path = require('path');

async function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

async function folderClear() {
  const directory = './Temp';
  const directory1 = './Output';

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
  fs.readdir(directory1, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory1, file), err => {
        if (err) throw err;
      });
    }
  });
}

async function MyJsonFunction(theXlsxJson) {
  console.log('Recieved')
  baseJson = {}
  for(row of theXlsxJson) {
    console.log(row)
    if (row.Key.toUpperCase() === 'ID') {
      baseJson['id'] = row.Value;
    }
    if (row.Key.toUpperCase() === 'TAGS') {
      tags = []
      if (row.Value.includes(',')) {
        tags = row.Value.split(',')
      }
      else {
        tags.push(row.Value)
      }
      baseJson['tags'] = tags;
      console.log('Base:', baseJson)
    }
    if (row.Key.toUpperCase() === 'METADATA') {
      metadata = []
      // metaJson = {}
      if (row.Value.includes(',')) {
        a = row.Value.split(',')
        for(b of a) {
          c = b.split(':')
          console.log('meta',c)
          metaJson = `{"${c[0]}":"${c[1]}"}`
          metadata.push(JSON.parse(metaJson))
        }
      }
      else {
        a = row.Value.split(':')
        metaJson = `{"${a[0]}":"${a[1]}"}`
        metadata.push(JSON.parse(metaJson))
      }
      baseJson['metadata'] = metadata;
    }
    if (row.Key.toUpperCase() === 'TITLE') {
      baseJson['title'] = (typeof row.Value === 'undefined' || row.Value.toUpperCase() === 'FALSE')? false : row.Value;
      console.log('Base:', baseJson)

    }
  }
  return baseJson
}

module.exports = MyJsonFunction;
