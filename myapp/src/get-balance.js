// create get-balance.js
const cardano = require("./cardano");

function getWalletData(walletname){

const sender = cardano.wallet(walletname);

const senderadress = sender.paymentAddr;
const balanceValue = sender.balance().value;

return JSON.stringify({senderadress, balanceValue})

}

module.exports = getWalletData;