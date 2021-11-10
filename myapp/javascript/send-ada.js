//bring in instance of cardanoCLIJS
//import { cardano } from './cardano.js';

const cardano = require("./cardano");

//bring in wallet opener
//import { openWallet } from './open_wallet.js';

//open burner wallet
//const sender = openWallet('Wallet2');

const sender = cardano.wallet("ADAPI3");

//check wallet balance
console.log(sender.balance());

//this is the testnet faucet
const receiver =
  "addr_test1qp54wrul5q9whumqtfs4vkumuhynn7hah7phy07tf0gtmfae0vkdu39q0cryqp0jt5ncgt6jwqs729ezlc2rzalqp7csracyxs";
//   'addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3';

//this is Wallet1
//const receiver =
//  'addr_test1qpz97cy600kq7mty8nhu0lfdcpskf4l8t0gpsstfe25v0ws3gkakzlwfzt6x28qgugapqqc4h5wnpwpclg2zw0g95djqjmae48';

//set amount to send
const amount = cardano.toLovelace(80);

//define build transaction
const createTransaction = (tx) => {
  let raw = cardano.transactionBuildRaw(tx);
  let fee = cardano.transactionCalculateMinFee({
    ...tx,
    txBody: raw,
  });
  tx.txOut[0].value.lovelace -= fee;
  return cardano.transactionBuildRaw({ ...tx, fee });
};

//define sign transaction
const signTransaction = (wallet, tx, script) => {
  return cardano.transactionSign({
    signingKeys: [wallet.payment.skey, wallet.payment.skey],
    txBody: tx,
  });
};

//creating an object containing lovelace and all tokens on the wallet utxo
const walletBalance = {
  ...sender.balance().value,
};

//subtracting the send amount from the wallet UTXOValue.lovelace amount but leaving reference to all other tokens unchanged
walletBalance.lovelace = walletBalance.lovelace - cardano.toLovelace(amount);

//define transaction information
const txInfo = {
  txIn: cardano.queryUtxo(sender.paymentAddr),
  txOut: [
    {
      address: sender.paymentAddr,
      value: { ...walletBalance }, //this value contains the correct amount of lovelace left over after transaction but retains all other tokens, so
      //txIn will match txOut minus the payment
    },
    //value going back to sender
    {
      address: receiver,
      value: {
        lovelace: cardano.toLovelace(amount),
      },
    }, //value going to receiver
  ],
  metadata: { 1: { cardano: "Test send" } },
  witnessCount: 1,
};

//create raw transaction
const raw = createTransaction(txInfo);

//create signed transaction
const signed = signTransaction(sender, raw);

//submit transaction
const txHash = cardano.transactionSubmit(signed);
console.log(txHash);
