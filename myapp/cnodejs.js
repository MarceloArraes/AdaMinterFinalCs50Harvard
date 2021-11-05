const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
// import from myapp/src/_pinImgToPinata.js
const pinImgToPinata = require('./src/_pinImgToPinata.js')
//files to call upon clicking and submitting. Call trought fetchs carryng the metadata and other factors.


app.use(cors())

app.get('/ipfsRegister',(req,res)=>{
    console.log("entered ipfsRegister on Cnodejs.js");
    console.log(req.headers.base64image);
    //get url from blobimage
    var imgData = req.headers.base64image;
    console.log(imgData);
    //save blobimage locally
    const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        
    fs.writeFileSync('minter/nftminter/static/img', base64Data,  {encoding: 'base64'});

    //pinImgToPinata(url)

    res.json({message: `IpfsRegister on Cnodejs.js `})

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

  res.json({message: "Entered the MINT ASSET CNODEJS", metadata: metad, adress: adress, txHash: mintConfirmation["txHash"]})
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