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

//create a random name for the wallet
const randomName = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let name = "";
  for (let i = 0; i < 10; i++) {
    name += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return name;
};

const walletName = randomName();

createWallet(walletName);

//send the name of the wallet to the frontend
module.exports = walletName;


