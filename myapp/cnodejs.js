const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');
// import from myapp/src/_pinImgToPinata.js
const pinImgToPinata = require('./src/_pinImgToPinata.js')
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


app.get('/ipfsRegister2',(req,res)=>{
    //console.log("entered ipfsRegister on Cnodejs.js");
    //get url from blobimage
    //save blobimage locally
    //var url = req.query.blobimage;
    //pinImgToPinata(url)

    res.json({message: `IpfsRegister on Cnodejs.js `})

})


app.get('/balanceCheck', (req, res) => {
  //console.log("entered balancheCheck on CNODEJS");
  
  var walletData = require('./src/get-balance')
  var ADAPI2 = walletData("ADAPI2")
  var wallet = JSON.parse(ADAPI2)

  //console.log(wallet["balanceValue"]["lovelace"]);


  res.json({balance: wallet["balanceValue"]["lovelace"]})
})

app.get('/mintAsset', async (req, res) => {
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
})




app.get('/', (req, res) => {
  metad = JSON.parse(req.headers.metadata);
  
  //console.log(typeof(metad.title));
  //console.log(metad.title);
  
  if(metad.title == "" || metad.title === undefined)
  {
    res.send({metadata: "ERROR: Title cannot be empty.",fee:"Can't calculate"})
    return;
  }

  var fee = require('./src/fee-cost.js');
  var walletData = require('./src/get-balance')

  //console.log("FIRST CALL FOR FEE:"+fee(req.headers.metadata));

  //res.status(201).json({message: "Like retrieved successfully.",fee:fee(metad), metadata:req.headers['metadata']})
  res.json({metadata:metad, fee: fee(req.headers.metadata), wallet: JSON.parse(walletData("ADAPI2")) })
  //res.send({metadata:req.headers.metadata, fee: fee(metad)})
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})