/* eslint-disable no-fallthrough */
const {   knownGenesis,handle,cryptoWaitReady } = require('./polkadot');
const { async } = require('rxjs');
const { assert, isHex } = require('@polkadot/util');

async function initWallet(network) {
    switch(network){
     case 1:
        await cryptoWaitReady();
        break;
     default:
         throw new Error(`init wallet fail`);
    }
 }

async function postWallet(network,type,data) {
   switch(network){
    case 1:
        return await handle(type,data);
    default:
        throw new Error(`Unable to handle message of type ${type}`);
   }
}


async function main (){
    await initWallet(1);
    const seed = await postWallet(1,'pol.mnemonicGenerate',{});
    const {
      address,
      sk
    } = await postWallet(1,'pol.seedCreateAddress',{seed});

    const genesisHash = knownGenesis.acala[0];
    const name = "test";
    const oldpasswd = "123456";

    const data =  {
      genesisHash,
      name,
      seed,
      address,
      oldpasswd,
    };
    const f = await postWallet(1,'pol.saveAccountsCreate',data);

    assert(f,"create account fail ..");

    console.log(`create address ${address} , seed ${seed.toString()}`)
    const newPass = "12345678";
  
    // update passwd
    const ps1 = {
      address,
      newPass,
      oldpasswd
    } 
    const r = await postWallet(1,'pol.accountsChangePassword',ps1)

    assert(r,"update passwd fail.....");

    console.log(`update passwd  ${address} , newpd ${newPass.toString()}`)

    const ps2 = {
      address,
      newPass
    }
    const json = await postWallet(1,'pol.accountsExport',ps2);
    console.log(`export json keystore ${JSON.stringify(json)}`)

    const ps3 = {
      address,
      newPass
    }
    const validate = await postWallet(1,'pol.accountsValidate',ps3)
    console.log(`validate account  ${validate}`)

    let ps4 = {
      json,
      newPass
    }

    await postWallet(1,'pol.jsonRestore',ps4);

    console.log(`import account success`)
 }
//  main();
module.exports = {
    postWallet,initWallet

}