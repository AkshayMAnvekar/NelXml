const EasyDocx = require('node-easy-docx')
 
const easyDocx = new EasyDocx({
  path: './Test.docx'
})
 
easyDocx.parseDocx()
  .then(data => {
    // JSON data as result
    console.log(data)
  })
  .catch(err => {
    console.error(err)
  })
