const process = require("process");
const fs = require("fs");
const pinataSDK = require('@pinata/sdk');
const PINATA_API_KEY = "";
const PINATA_SECRET_API_KEY =
  "";
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
