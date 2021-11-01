const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')

//files to call upon clicking and submitting. Call trought fetchs carryng the metadata and other factors.


app.use(cors())

app.get('/ipfsRegister',(req,res)=>{
    console.log("entered ipfsRegister on Cnodejs.js");

    const metadata = JSON.parse(req.headers.metadata);
    console.log(metadata);

    res.json({message: `IpfsRegister on Cnodejs.js ${metadata["imagePath"]}`})

})


app.get('/balanceCheck', (req, res) => {
  console.log("entered balancheCheck on CNODEJS");
  
  var walletData = require('./src/get-balance')
  var ADAPI2 = walletData("ADAPI2")
  var wallet = JSON.parse(ADAPI2)

  console.log(wallet["balanceValue"]["lovelace"]);


  res.json({balance: wallet["balanceValue"]["lovelace"]})
})

app.get('/mintAsset', (req, res) => {
  console.log("entered MINT ASSET CNODE");
  //I have to get the USER ADRESS and METADATA and send it to mintData;
  const metad = JSON.parse(req.headers.metadata);
  //const adress = JSON.parse(req.headers.adress);
  const adress = metad.adress;
  delete metad.adress;
  var mintData = require('./src/mint-asset');
  
  
  var mintConfirmation = mintData(metad ,adress);
  console.log(mintConfirmation);

  res.json({message: "Entered the MINT ASSET CNODEJS", metadata: metad, adress: adress, mintConfirmation: mintConfirmation})
})




app.get('/', (req, res) => {
  metad = JSON.parse(req.headers.metadata);
  
  console.log(typeof(metad.title));
  console.log(metad.title);
  
  if(metad.title == "" || metad.title === undefined)
  {
    res.send({metadata: "ERROR: Title cannot be empty.",fee:"Can't calculate"})
    return;
  }

  var fee = require('./src/fee-cost.js');
  var walletData = require('./src/get-balance')

  console.log("FIRST CALL FOR FEE:"+fee(req.headers.metadata));

  //res.status(201).json({message: "Like retrieved successfully.",fee:fee(metad), metadata:req.headers['metadata']})
  res.json({metadata:metad, fee: fee(req.headers.metadata), wallet: JSON.parse(walletData("ADAPI2")) })
  //res.send({metadata:req.headers.metadata, fee: fee(metad)})
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})