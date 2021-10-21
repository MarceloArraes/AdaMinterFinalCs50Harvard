const process = require("process");
const fs = require("fs");
const pinataSDK = require("@pinata/sdk");
const PINATA_API_KEY = "7a81146a57ffd37429e3";
const PINATA_SECRET_API_KEY =
  "cf4f3c31abef72468228386fd4fc64b5272ef415d01236e3b9f2c303117a16aa";
const pinata = pinataSDK(PINATA_API_KEY, PINATA_SECRET_API_KEY);

var imgPath = process.argv[2];
const readableStreamForFile = fs.createReadStream(imgPath);
const options = {};

pinata
  .pinFileToIPFS(readableStreamForFile, options)
  .then((result) => {
    console.log(result["IpfsHash"]);
  })
  .catch((err) => {
    console.log(err);
  });
