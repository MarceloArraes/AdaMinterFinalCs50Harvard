const process = require("process");
const pinataSDK = require("@pinata/sdk");
const PINATA_API_KEY = "7a81146a57ffd37429e3";
const PINATA_SECRET_API_KEY =
  "";
const pinata = pinataSDK(PINATA_API_KEY, PINATA_SECRET_API_KEY);

var metadata = process.argv[2];
var edition = process.argv[3];

var newMetadata = JSON.parse(metadata);
// console.log(`newMetadata: ${newMetadata}`)

newMetadata["name"] =
  newMetadata["name"] + ` #${edition} of ${newMetadata["total_editions"]}`;

const options = {};
pinata
  .pinJSONToIPFS(newMetadata, options)
  .then((result) => {
    console.log(result["IpfsHash"]);
  })
  .catch((err) => {
    console.log(err);
  });
