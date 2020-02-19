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
  // console.log('Recieved', theXlsxJson)
  mcqq = {
    "type": "MCQ",
    "correct_answer": 0
  }
  baseJson = {}
  section = {}
  question = {}
  marks = {}
  interludes = {}
  qGroup = 0
  secCounter = 0
  qNo = 0
  headerJson = {
    "type": "header",
    "content": []
  }
  metadata = []

  for(row of theXlsxJson) {
    // console.log(row)
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
      baseJson['metadata'] = metadata;

      // console.log('Base:', baseJson)
    }
    console.log('upper test',)
    if (row.Key.toUpperCase() === 'METADATA') {
      // metaJson = {}
      if (row.Value.includes(',')) {
        a = row.Value.split(',')
        for(b of a) {
          c = b.split(':')
          // console.log('meta',c)
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
      baseJson['content'] = []
      // console.log('Base:', baseJson)

    }
    if (row.Key.toUpperCase() === 'HEADER') {
      if (row.Value.includes('.jpg') || row.Value.includes('.png') || row.Value.includes('.JPG') || row.Value.includes('.PNG')) {
        if (row.Value.includes(',')) {
          header = {
            "type": "image-group"
          }
          a = row.Value.split(',')
          header.images = a
          // for(b of a) {
          //   c = b.split(':')
          //   console.log('meta',c)
          //   metaJson = `{"${c[0]}":"${c[1]}"}`
          //   metadata.push(JSON.parse(metaJson))
          // }
          headerJson.content.push(header)
        }
        else {
          header = {
            "type": "image"
          }
          header.image = row.Value
          headerJson.content.push(header)

        }
      }
      else {
        header = {
          "type": "text"
        }
        header.text = row.Value
        headerJson.content.push(header)
      }
    }
    if (row.Key.toUpperCase() === 'QTYPE') {
      if(row.Group) {
        qGroup = row.Group
      }
      else {
        qGroup = 0
      }
      ++qNo
      if (!question.hasOwnProperty(qGroup)) {
        question[`${qGroup}`] = {}
      }
      if (row.Value.toUpperCase().includes('MCQ')) {
        question[`${qGroup}`][`${qNo}`] = {
          "type": `${row.Value}`,
          // "options": []
        }
      }
      else {
        question[`${qGroup}`][`${qNo}`] = {
          "type": `${row.Value}`,
          "lines": 1
        }
      }
    }
    if (row.Key.toUpperCase() === 'QUESTION') {
      question[`${qGroup}`][`${qNo}`]['prompt'] = row.Value
    }
    if (row.Key.toUpperCase() === 'LINES') {
      question[`${qGroup}`][`${qNo}`]['lines'] = row.Value
    }
    if (/C\d/.test(row.Key.toUpperCase())) {
      if (!question[`${qGroup}`][`${qNo}`].hasOwnProperty('options')) {
        question[`${qGroup}`][`${qNo}`]['options'] = []
      }
      question[`${qGroup}`][`${qNo}`]['options'].push(row.Value)
    }
    if (row.Key.toUpperCase() === 'ANSWER' && question[`${qGroup}`][`${qNo}`]['type'].includes('MCQ')) {
      question[`${qGroup}`][`${qNo}`]['correct_answer'] = row.Value - 1
    }
    if (row.Key.toUpperCase() === 'GLOBALLYUNIQUEID') {
      metaJson = `{"globallyUniqueId":"${row.Value}"}`
      metadata.push(JSON.parse(metaJson))
    }
    if (row.Key.toUpperCase() === 'STUDYDESIGNYEAR') {
      metaJson = `{"studyDesignYear":"${row.Value}"}`
      metadata.push(JSON.parse(metaJson))
    }
    if (row.Key.toUpperCase() === 'YEARLEVEL') {
      metaJson = `{"yearLevel":"${row.Value}"}`
      metadata.push(JSON.parse(metaJson))
    }
    if (row.Key.toUpperCase() === 'CREATEDBY') {
      metaJson = `{"createdBy":"${row.Value}"}`
      metadata.push(JSON.parse(metaJson))
    }
    if (row.Key.toUpperCase() === 'QUESTIONTYPE') {
      metaJson = `{"questionType":"${row.Value}"}`
      metadata.push(JSON.parse(metaJson))
    }
    if (row.Key.toUpperCase() === 'COURSE') {
      metaJson = `{"course":"${row.Value}"}`
      metadata.push(JSON.parse(metaJson))
    }
    if (row.Key.toUpperCase() === 'SUBJECT') {
      metaJson = `{"subject":"${row.Value}"}`
      metadata.push(JSON.parse(metaJson))
    }
    if (row.Key.toUpperCase() === 'VCAAREFERENCE') {
      metaJson = `{"vcaaReference":"${row.Value}"}`
      metadata.push(JSON.parse(metaJson))
    }
    if (row.Key.toUpperCase() === 'DIFFICULTY') {
      metaJson = `{"difficulty":"${row.Value}"}`
      metadata.push(JSON.parse(metaJson))
    }
    if (row.Key.toUpperCase() === 'TIME') {
      metaJson = `{"time":"${row.Value}"}`
      metadata.push(JSON.parse(metaJson))
    }
    if (row.Key.toUpperCase() === 'TMARKS') {
      metaJson = `{"marks":"${row.Value}"}`
      metadata.push(JSON.parse(metaJson))
    }
    if (row.Key.toUpperCase() === 'YEARGENERATED') {
      metaJson = `{"yearGenerated":"${row.Value}"}`
      metadata.push(JSON.parse(metaJson))
    }
    if (row.Key.toUpperCase() === 'STATE') {
      metaJson = `{"state":"${row.Value}"}`
      metadata.push(JSON.parse(metaJson))
    }
    if (row.Key.toUpperCase() === 'ONLINEEXAM') {
      metaJson = `{"onlineExam":"${row.Value}"}`
      metadata.push(JSON.parse(metaJson))
    }
    if (row.Key.toUpperCase() === 'PRINTABLE') {
      metaJson = `{"printable":"${row.Value}"}`
      metadata.push(JSON.parse(metaJson))
    }
    if (row.Key.toUpperCase() === 'TEACHERONLY') {
      metaJson = `{"teacherOnly":"${row.Value}"}`
      metadata.push(JSON.parse(metaJson))
    }
    if (row.Key.toUpperCase() === 'TRIALQUESTION') {
      metaJson = `{"trialQuestion":"${row.Value}"}`
      metadata.push(JSON.parse(metaJson))
    }
    if (row.Key.toUpperCase() === 'LINESPRINTED') {
      metaJson = `{"linesPrinted":"${(typeof row.Value != 'undefined')? row.Value : 0 }"}`
      metadata.push(JSON.parse(metaJson))
    }

    if (row.Key.toUpperCase() === 'MARKS') {
      if (!marks.hasOwnProperty(qGroup)) {
        marks[`${qGroup}`] = {}
      }
      marks[`${qGroup}`][`${qNo}`] = row.Value
    }
    if (row.Key.toUpperCase() === 'QHEADER') {
      if (!interludes.hasOwnProperty(qGroup)) {
        interludes[`${qGroup}`] = {}
      }
      interludes[`${qGroup}`][`${qNo}`] = row.Value
    }
    // console.log("Section", section)
    if (row.Key.toUpperCase() === 'SECTION' && typeof row.Group != 'undefined') {
      // console.log(row.Key.toUpperCase())
      ++secCounter
      if (row.Group > 1) {
        if (!marks.hasOwnProperty('1')) {
          marks['1'] = {}
        }
        marks['1'][`${qNo+1}`] = false
      }
      section[`${row.Group}`] = {
        "type": "assembly",
        "prompt": false,
        "marks": [],
        "interludes": [],
        "questions": []
      }
      if (row.Value) {
        section[`${row.Group}`]['prompt'] = row.Value
      }
      
    }
  }
  console.log(secCounter)
  if (section['1']) {
    for (i = secCounter; i > 1; i--) {
      for(var q in question[secCounter]) {
        section[i].marks.push(marks[i][q])
        section[i]['questions'].push(question[secCounter][q])
      }
    }
    for (j in marks['1']) {
      secC = 2
      if (typeof marks[1][j] === 'number') {
        section[1].marks.push(marks[1][j])
        section[1]['questions'].push(question[1][j])
      }
      else if (typeof marks[1][j] === 'boolean') {
        console.log('Test3',section[secC])
        section[1].marks.push(marks[1][j])
        section[1]['questions'].push(section[secC])
        ++secC
      }
      else if (typeof marks[1][j] === 'string') {
        console.log('Test3',j)
      }
    }
  }
  var completeData = baseJson['content'].push(headerJson)
  if (question['0']) {
    for (q in question['0']) {
      baseJson['content'].push(question['0'][q])
    }
  }

  // console.log('Section: ',section)
  // var completeData = Object.assign({}, baseJson, headerJson);
  if (section[1]){
    completeData = baseJson['content'].push(section['1'])
  }
  // let pmData = JSON.stringify(XLSX.utils.sheet_to_json(pmWorksheet), null, 2);
  fs.writeFileSync('./Output/JSON.json', JSON.stringify(baseJson));
  return baseJson
  // return './Output/JSON.json'
}

module.exports = MyJsonFunction;
