/* eslint-disable no-unused-vars */
const TypeRegistry = require('@polkadot/types');
// const { decodeAddress, encodeAddress } = require('@polkadot/keyring');
const  _uiKeyring  = require('@polkadot/ui-keyring').default;
const  _crypto = require('@polkadot/util-crypto');
const { assert, isHex } = require('@polkadot/util');
const { ApiPromise, WsProvider } = require('@polkadot/api');
const { ContractPromise } = require('@polkadot/api-contract'); 
const { HttpProvider } = require('@polkadot/rpc-provider');
// var https = require('https');
const axios = require('axios').default;
const {
  ScProvider,
  WellKnownChain,
} = require("@polkadot/rpc-provider/substrate-connect");
const { async } = require('rxjs');

const baseURL = "https://singular.rmrk.app/api/rmrk1/account/";
const _type = "sr25519";
const SEED_DEFAULT_LENGTH = 12;
const ETH_DERIVE_DEFAULT = "/m/44'/60'/0'/0/0";
let provider,polkadotApi;

// // Construct
// const wsProvider = new WsProvider('wss://rpc.polkadot.io');
// const api = await ApiPromise.create({ provider: wsProvider });
// const contract = new ContractPromise(api, metadata, address);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////       account manager        //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getSuri (seed, type) {
   return type === 'ethereum'
     ? `${seed}${ETH_DERIVE_DEFAULT}`
     : seed;
 }

// init crypto
async function cryptoWaitReady(){
   await _crypto.cryptoWaitReady();
   _uiKeyring.loadAll({type: 'sr25519' });
}

// Randomly generated mnemonic
function mnemonicGenerate(){
   let seed = _crypto.mnemonicGenerate(SEED_DEFAULT_LENGTH);
   return seed;
} 
// Create address
function seedCreateAddress(mnemonic){
   let seed = ( typeof mnemonic === 'undefined' ? mnemonicGenerate() : mnemonic );
   console.log(seed);
   let address =  _uiKeyring.createFromUri(getSuri(seed, _type), {}, _type).address;
   return {
      address,
      seed
   };
}
//update genesisHash
//Use when selecting a different network
function updateAccountHash(data) {
  let {
    address,
    genesisHash
  } = data;
  const pair = _uiKeyring.getPair(address);
  assert(pair, 'Unable to find pair');
  _uiKeyring.saveAccountMeta(pair, { ...pair.meta,
    genesisHash
  });
  return true;
}

// different chain format addresses
// When choosing a different network, display the address
function formatAddressByChain(data){
   let { address,prefix } = data;
   const publicKey = _crypto.decodeAddress(address);
   const _prefix = prefix === -1 ? 42 : prefix;
   return _crypto.encodeAddress(publicKey, _prefix)
}

// save account
function saveAccountsCreate(data) {
    let {
      genesisHash,
      name,
      seed,
      address,
      oldpasswd
    } = data;
   let r = _uiKeyring.addUri(getSuri(seed, _type), oldpasswd, {
     genesisHash,
     name
   }, _type);
   return true;
 }

// Account setup password
function accountsChangePassword(data){
   let {
      address,
      newPass,
      oldPass
    } = data;
    const pair = _uiKeyring.getPair(address);
    assert(pair, 'Unable to find pair');
    try {
      if (!pair.isLocked) {
        pair.lock();
      }
      pair.decodePkcs8(oldPass);
    } catch (error) {
      console.log(error);
      throw new Error('oldPass is invalid');
    }
    _uiKeyring.encryptAccount(pair, newPass);
    return true;
}

// Verify account address
function seedValidate (data) {
   let {
      suri,
      type
   } = data;
   const { phrase } = _crypto.keyExtractSuri(suri);

   if (_crypto.isHex(phrase)) {
     assert(_crypto.isHex(phrase, 256), 'Hex seed needs to be 256-bits');
   } else {
     assert(_crypto.mnemonicValidate(phrase), 'Not a valid mnemonic seed');
   }
   return {
     address: _uiKeyring.createFromUri(suri, {}, type).address,
     suri
   };
 }

// account validate 
 function accountsValidate (data) {
   let {
      address,
      newPass
   } = data
   try {
      _uiKeyring.backupAccount(_uiKeyring.getPair(address), newPass);
     return true;
   } catch (e) {
     return false;
   }
 }
 
 // export account to json file
 function accountsExport (data){
   let {address,newPass}  = data;
   return _uiKeyring.backupAccount(_uiKeyring.getPair(address),newPass)
 }

 // jsonstore import 
 function jsonRestore (data) {
   let {
      json,
      newPass
   } = data;
   try {
      _uiKeyring.restoreAccount(json, newPass);
      return true;
   } catch (error) {
      return false;
    //  throw new Error(error);
   }
 }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////       transfer        //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// polkadot = "polkadot",
// ksmcc3 = "ksmcc3",
// rococo_v2_2 = "rococo_v2_2", 
// westend2 = "westend2"
async function openConnnect(chain){
  if(typeof provider === 'undefined'){
    provider = new WsProvider(chain);
    // provider = new HttpProvider(chain);
    // provider = new ScProvider(chain);//WellKnownChain.polkadot
    try {
      await provider.connect();
    } catch (error) {
      closeConnection();
      throw new Error('connect is invalid');
    }
    polkadotApi = await ApiPromise.create({ provider });
  }
}

async function closeConnection(){
  if(provider!== null){
    await  provider.disconnect()
  }
}

async function balance(data){
  let { address } = data;
  return await polkadotApi.query.system.account(address);
}

// transfer 
async function transfer(data){
  let { from,passwd,to,balance} = data;
  const pair = _uiKeyring.getPair(from);
  if(pair.isLocked){
    pair.unlock(passwd)
  }
  try {
    const txHash = await polkadotApi.tx.balances
    .transfer(to, balance)
    .signAndSend(pair);
    return txHash;
  } catch (error) {
    throw new Error('trans fail');
  }
 
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////       nft        //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function nftByAddress(data){
  let { address } = data;
  axios.get(baseURL + address)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}

async function handle(type,data) {
   switch (type) {
     case 'pol.mnemonicGenerate':
       return mnemonicGenerate();
     case 'pol.seedCreateAddress':
       return seedCreateAddress(data);
     case 'pol.formatAddressByChain':
        return formatAddressByChain(data);
     case 'pol.updateAccountHash':
        return updateAccountHash(data);
     case 'pol.saveAccountsCreate':
       return saveAccountsCreate(data);
     case 'pol.accountsChangePassword':
       return accountsChangePassword(data);
     case 'pol.accountsExport':
       return accountsExport(data);
     case 'pol.jsonRestore':
       return jsonRestore(data);
     case 'pol.accountsValidate':
       return accountsValidate(data);
     case 'pol.openConnnect':
        return openConnnect(data);
     case 'pol.closeConnection':
          return closeConnection();
     case 'pol.balance':
        return balance(data);
     case 'pol.transfer':
       return transfer(data);
      case 'pol.nftByAddress':
       return nftByAddress(data);
     default:
       throw new Error(`Unable to handle message of type ${type}`);
   }
 }
module.exports = {
   handle,
   cryptoWaitReady
}