const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')

//files to call upon clicking and submitting. Call trought fetchs carryng the metadata and other factors.


app.use(cors())

app.get('/', (req, res) => {
  var a = require('./src/testfile.js');
  var fee = require('./src/fee-cost.js');

  console.log(req.url);
  a('marcelo')
  
  //metad = JSON.parse(req.headers['metadata']);
  //metad = JSON.stringify(req.headers.metadata);
  metad = req.headers.metadata;
  //console.log(fee(metad))

  console.log("FIRST CALL FOR FEE:"+fee(req.headers.metadata));

  //res.status(201).json({message: "Like retrieved successfully.",fee:fee(metad), metadata:req.headers['metadata']})
  res.send({metadata:req.headers.metadata, fee: fee(metad)})
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})