const TEST = artifacts.require("Test");
const fs = require("fs");
const path = require("path");
const web3 = new (require("web3"))("http://localhost:8545");
module.exports = async deployer => {
  const root = path.join(__dirname.substring(0, __dirname.lastIndexOf("/")), "/secret/account.json");
  const jsonString =  fs.readFileSync(root);
  if (!jsonString) {
    throw new Error(`${root} not found`);
  }
  const accountJSON = JSON.parse(jsonString);
  const unlockAccountFlag = await web3.eth.personal.unlockAccount(accountJSON.account, accountJSON.passphrase);
  if (!unlockAccountFlag) {
    throw new Error(`${accountJSON}: unlock Fail!`);
  }

  const contract = await deployer.deploy(TEST);
  await contract.setBaseURI("https://gateway.pinata.cloud/ipfs/QmQjJBRV8SHyCAHLAQHTaEiCiEoiHGtJo83GDYH7dwMFAY/");
};
