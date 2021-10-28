// create get-balance.js
const cardano = require("./cardano");

const sender = cardano.wallet("ADAPI2");

console.log(sender.balance());
