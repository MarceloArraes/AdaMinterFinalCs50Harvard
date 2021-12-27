const { json } = require("body-parser");
const cardano = require("./cardano");

const createWallet = (account) => {
  const payment = cardano.addressKeyGen(account);
  const stake = cardano.stakeAddressKeyGen(account);
  cardano.stakeAddressBuild(account);
  cardano.addressBuild(account, {
    paymentVkey: payment.vkey,
    stakeVkey: stake.vkey,
  });
  return cardano.wallet(account);
};

module.exports = function(walletName) {
  return json({ message: "Wallet created inside nodejs", wallet: createWallet(walletName)});
};
