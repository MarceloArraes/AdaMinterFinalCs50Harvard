const CardanocliJs = require("cardanocli-js");
const os = require("os");
const path = require("path");

const dir = path.join(os.homedir(), "minter2/minter/nftminter");

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

const wallet = cardanocliJs.wallet("ADAPI2");
console.log(wallet.paymentAddr);

const mintScript = {
  keyHash: cardanocliJs.addressKeyHash(wallet.name),
  type: "sig",
};

const policy = cardanocliJs.transactionPolicyid(mintScript);

console.log(policy);
ASSET_NAME = "MarceloNFT";

const MARCELOCOIN = policy + ".MarceloNFT";
console.log(MARCELOCOIN);

const metadata = {
  721: {
    [policy]: {
      [ASSET_NAME]: {
        name: ASSET_NAME,
        image: "ipfs://QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE",
        description: "Super Fancy Berry Space Green NFT",
        type: "image/png",
        src: "ipfs://Qmaou5UzxPmPKVVTM9GzXPrDufP55EDZCtQmpy3T64ab9N",
        // other properties of your choice
        authors: ["Thaline", "Ssanguinetti"],
      },
    },
  },
};

const tx = {
  txIn: wallet.balance().utxo,
  txOut: [
    {
      address: wallet.paymentAddr,
      value: { ...wallet.balance().value, [MARCELOCOIN]: 1 },
    },
  ],
  mint: [
    { action: "mint", quantity: 1, asset: MARCELOCOIN, script: mintScript },
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
