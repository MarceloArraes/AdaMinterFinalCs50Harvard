const CardanocliJs = require("cardanocli-js");
const os = require("os");
const path = require("path");

const dir = path.join(os.homedir(), "minter2/minter/nftminter");

console.log("Mint Asset js file");

function exportMintConfirmation(meta, walletAdress){

  console.log("exportMintConfirmation function");
  console.log(meta);
  console.log(walletAdress);


  //will substitute all TXout wallet.paymentAddr for the adress from the input.
  //Maybe i will be able to mint using my local wallet and send to the client.
  // It would be great to get the adress of the user only looking at the transaction history of the wallet adapi2;
  // but that seems dificult for know, so i will ask the user for their adress instead.

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
const wallet = cardanocliJs.wallet("ADAPI2");
console.log(wallet.paymentAddr);

const createTransaction = (tx) => {
  let raw = cardanocliJs.transactionBuildRaw(tx);
  let fee = cardanocliJs.transactionCalculateMinFee({
    ...tx,
    txBody: raw,
  });
  tx.txOut[0].value.lovelace -= fee;
  return cardanocliJs.transactionBuildRaw({ ...tx, fee });
};

const signTransaction = (wallet, tx, script) => {
  return cardanocliJs.transactionSign({
    signingKeys: [wallet.payment.skey, wallet.payment.skey],
    txBody: tx,
  });
};

const mintScript = {
  keyHash: cardanocliJs.addressKeyHash(wallet.name),
  type: "sig",
};

const policy = cardanocliJs.transactionPolicyid(mintScript);

console.log(policy);

ASSET_NAME = meta["title"];

const COIN = policy + "." + ASSET_NAME;

console.log(COIN);

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
  txIn: wallet.balance().utxo,
  txOut: [
    {
      address: walletAdress,
      value: { ...wallet.balance().value, [COIN]: 1 },
    },
  ],
  mint: [
    { action: "mint", quantity: 1, asset: COIN, script: mintScript },
  ],
  metadata,
  witnessCount: 2,
};

const raw = createTransaction(tx);
console.log(raw);
const signed = signTransaction(wallet, raw);
console.log(signed);
console.log(cardanocliJs.transactionView({ txFile: signed }));
const txHash = cardanocliJs.transactionSubmit(signed);
console.log(txHash);

//just a confirmation for now.
return JSON.stringify({txHash, signed})

}

module.exports = exportMintConfirmation;