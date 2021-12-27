const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');
const { application } = require('express');
//files to call upon clicking and submitting. Call trought fetchs carryng the metadata and other factors.
const app = express()
const port = 3000

app.use(cors())

app.use(fileUpload({
  createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.post('/ipfsRegister', async (req, res) => {
  try {
      if(!req.body) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {
          //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
          let avatar = JSON.parse(req.headers.blob);
          //console.log(avatar);
          //Use the mv() method to place the file in upload directory (i.e. "uploads")
          avatar.mv('./uploads/' + avatar.name);

          //send response
          res.send({
              status: true,
              message: 'File is uploaded',
              data: {
                  name: avatar.name,
                  mimetype: avatar.mimetype,
                  size: avatar.size
              }
          });
      }
  } catch (err) {
      res.status(500).send(err);
  }
});

app.get('/createWallet', (req,res) => {
  console.log(req.body);
  console.log("Entered createWallet");
  const { walletName } = req.body;
  console.log(walletName);
  require('./src/create-wallet.js')(walletName);
  res.json({message: "Wallet created"});
});

app.get('/balanceCheck', (req, res) => {
  //console.log("entered balancheCheck on CNODEJS");
  //const { walletName } = req.body;
  //console.log(req.body);
  const metadataWallet = JSON.parse(req.headers.metadata);
  console.log(metadataWallet);
  console.log(metadataWallet.walletName);
  var walletData = require('./src/get-balance');
  var walletCreated = walletData(metadataWallet.walletName)
  var wallet = JSON.parse(walletCreated);
  console.log(wallet);

  if(wallet.balanceValue.hasOwnProperty("lovelace")){
    console.log("Wallet has lovelace");
    res.json({balance: wallet["balanceValue"]["lovelace"], senderadress: wallet["senderadress"]});
  }else{
    console.log("Wallet has no lovelace");
    res.json({balance: 0, senderadress: wallet["senderadress"]})
  }

})

app.get('/mintAsset', async (req, res) => {
  try{
  //console.log("entered MINT ASSET CNODE");
  //I have to get the USER ADRESS and METADATA and send it to mintData;
  const metad = JSON.parse(req.headers.metadata);
  //const adress = JSON.parse(req.headers.adress);
  const adress = metad.adress;
  //console.log(adress);
  delete metad.adress;
  //console.log(metad);

  var mintData = require('./src/mint-asset');
  //console.log(mintData);

  var mintReturn = mintData(metad ,adress);
  var mintParse = JSON.parse(mintReturn);
  //console.log(mintParse["txHash"]);

  res.json({message: "Entered the MINT ASSET CNODEJS", metadata: metad, adress: adress , txHash: mintParse["txHash"]})
  }
  catch(err){
    console.log(err);
  }
})


app.get('/', (req, res) => {
  metad = JSON.parse(req.headers.metadata);
  
  if(metad.title == "" || metad.title === undefined)
  {
    res.send({metadata: "ERROR: Title cannot be empty.",fee:"Can't calculate"})
    return;
  }
  console.log(metad.walletName);

  var fee = require('./src/fee-cost.js');
  var walletData = require('./src/get-balance')

  //res.status(201).json({message: "Like retrieved successfully.",fee:fee(metad), metadata:req.headers['metadata']})
  res.json({metadata:metad, fee: fee(req.headers.metadata), wallet: JSON.parse(walletData(metad.walletName))})
  //res.send({metadata:req.headers.metadata, fee: fee(metad)})
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})