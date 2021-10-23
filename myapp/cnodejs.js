const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
var a = require('./src/testfile.js');
const fee = require('./src/fee-cost.js');
//files to call upon clicking and submitting. Call trought fetchs carryng the metadata and other factors.


app.use(cors())

app.get('/', (req, res) => {
  console.log(req.url);
  a('marcelo')
  
  //metad = JSON.parse(req.headers['metadata']);
  metad = JSON.stringify(req.headers.metadata);
  //fee(metad)
  console.log(fee(metad))

  res.status(201).json({message: "Like retrieved successfully.",fee:fee(metad), metadata:req.headers['metadata']})
  //res.send('Hello World!')
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})