const CardanocliJs = require("cardanocli-js");
const os = require("os");
const path = require("path");

const dir = path.join(os.homedir(), "git/minter/minter/nftminter");

const alonzoPath = path.join(
  os.homedir(),
  "cardano-my-node",
  "testnet-alonzo-genesis.json"
);

//console.log(path.join(os.homedir(), 'cardano-my-node/db/node.socket'));

const cardanocliJs = new CardanocliJs({
  //   era: "alonzo",
  network: `testnet-magic 1097911063`,
  dir,
  alonzoGenesisFile: alonzoPath,
  socketPath: path.join(os.homedir(), "cardano-my-node/db/socket"),
});

module.exports = cardanocliJs;
 
