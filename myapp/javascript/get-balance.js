// create get-balance.js
const cardano = require("./cardano");

const sender = cardano.wallet("ADAPI3");

console.log(sender.balance());
