/* 
cardano-cli transaction calculate-min-fee 
--tx-body-file tx1.draft 
--tx-in-count 1 
--tx-out-count 1 
--witness-count 1 
--byron-witness-count 0 
--testnet-magic 1097911063 
--protocol-params-file protocol.json 
 */

const CardanocliJs = require("cardanocli-js");
const { json } = require("express");
const os = require("os");
const path = require("path");

const dir = path.join(os.homedir(), "git/minter/minter/nftminter");

console.log("ENTERED FEE");


function exportFee(meta) {

  meta = JSON.parse(meta)

const shelleyPath = path.join(
  os.homedir(),
  "cardano-my-node",
  "testnet-shelley-genesis.json"
);

const cardanocliJs = new CardanocliJs({
  network: "testnet-magic 1097911063",
  dir: dir,
  shelleyGenesisPath: shelleyPath,
});

const feeCalcule = (tx) => {
  let raw = cardanocliJs.transactionBuildRaw(tx);
  let fee = cardanocliJs.transactionCalculateMinFee({
    ...tx,
    txBody: raw,
  });

  return fee;
};

const wallet = cardanocliJs.wallet("ADAPI3");

const mintScript = {
  keyHash: cardanocliJs.addressKeyHash(wallet.name),
  type: "sig",
};

const policy = cardanocliJs.transactionPolicyid(mintScript);

ASSET_NAME = meta["title"];

const COIN = policy + "." + ASSET_NAME;

const metadata = {
  721: {
    [policy]: {
      [ASSET_NAME]: {
        name: ASSET_NAME,
        image: "ipfs://QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE",
        description: meta["description"],
        type: "image/png",
        src: meta["fileWebLink"],
        // other properties of your choice
        authors: meta["author"],
        nsfw: meta["nsfw"],
      },
    },
  },
};

const tx = {
  txIn: cardanocliJs.queryUtxo(wallet.paymentAddr),
  txOut: [
    {
      address: wallet.paymentAddr,
      value: { lovelace: wallet.balance().value.lovelace/* - cardanocliJs.toLovelace(5) */, [COIN]: 1 },
    },
    //{ address: walletreceiver.paymentAddr, value: { lovelace: cardanocliJs.toLovelace(5) } },
  ],
  mint: [
    { action: "mint", quantity: 1, asset: COIN, script: mintScript },
  ],
  metadata,
  witnessCount: 2,
};

const fee = feeCalcule(tx);
return fee;
};

module.exports = exportFee;