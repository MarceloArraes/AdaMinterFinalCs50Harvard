const process = require("process");
const fs = require("fs");
const pinataSDK = require('@pinata/sdk');
const PINATA_API_KEY = "7a81146a57ffd37429e3";
const PINATA_SECRET_API_KEY =
  "";
const pinata = pinataSDK(PINATA_API_KEY, PINATA_SECRET_API_KEY);

var imgPath = process.argv[2];
const readableStreamForFile = fs.createReadStream(imgPath);
const options = {};

pinata
  .pinFileToIPFS(readableStreamForFile, options)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
