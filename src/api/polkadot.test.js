const { assert } = require('@polkadot/util');
const { initWallet,postWallet } = require('./walletManager');

const json = '{"encoded":"cOA/2X8ZcEI5d6/OMp5SJscZZwF30k0W7Lbh+00i94kAgAAAAQAAAAgAAACLwH9TeAzVvvjX9iWwuV4jTEwV2FBCQVLM4KooBPsHYSXpOhf87CDMhio+n4HxCA9ZGD88e8zngnb2KsHm8DK4PQfzpUslN4xnU06BshGSxFh+RxaiTgqIi2Vucn91j5aTH+QLdSS9fS73gBge6ccfpP72W7RMDShDuFBWNL4PeO6WkD6l2APDoKKyboRZg+kt2Kb8zHMroTGg8ser","encoding":{"content":["pkcs8","sr25519"],"type":["scrypt","xsalsa20-poly1305"],"version":"3"},"address":"5CSMqmBPNBdAHGmL6XCEH2VTJ8mWNfKJePzoXL3oypbb3kAk","meta":{"genesisHash":null,"isHidden":false,"name":"测试账户","whenCreated":1661235707935}}';
const address = '5Gb9AfeJnhedZN4H6xVEEixLmSatLmpZaacPLVMesZuRZxgr';//'5CSMqmBPNBdAHGmL6XCEH2VTJ8mWNfKJePzoXL3oypbb3kAk'
async function main (){
    let ps4 = {
      address:'EJJuXJGycFmy6e7ePJVEU57hmLAgiB1y5RFfguo61fgTU9A'
    }

    let r  = await postWallet(1,'pol.nftByAddress',ps4);
    console.log(r);
    // await initWallet(1);

    // // const {
    // //   address,
    // //   seed
    // // } = await postWallet(1,'pol.seedCreateAddress','penalty casual garment mosquito panic blind kangaroo feel tobacco meadow crime return');

    // // let prefix = 105;
    // // const data =  {
    // //     address,prefix,
    // // };

    // let ps4 = {
    //   json:JSON.parse(json),
    //   newPass:'123456'
    // }

    // const defaul = 1000000000000;
    // await postWallet(1,'pol.jsonRestore',ps4);

    // await postWallet(1,'pol.openConnnect','wss://rococo-rpc.polkadot.io');
    // let { data: { free: previousFree }, nonce: previousNonce } = await postWallet(1,'pol.balance',{address});
    // console.log(`${address} , ${previousFree}`)
    // assert(previousFree/defaul > 0,"balance is zero");


    // //transfer
    // const to = '5G9nJdAhNVncmmydKBkq7N7SZ2ZsPNr2hz86a5XxUqxKKnrU';
    // const money = 1 * defaul ;
    // let r = await postWallet(1,'pol.transfer',{from:address,to:to,passwd:'123456',balance:money});
    // console.log("hash:" + r);
    // await postWallet(1,'pol.closeConnection',{});
    

    // const formatAddress = await postWallet(1,'pol.formatAddressByChain',data);
    // console.log(formatAddress)

    // const genesisHash = knownGenesis.acala[0];
    // const name = "xxx";
    // const oldpasswd = "1234"

    // const data =  {
    //   genesisHash,
    //   name,
    //   seed,
    //   address,
    //   oldpasswd,
    // };
    // const f = await postWallet(1,'pol.saveAccountsCreate',data);

    // assert(f,"create account fail ..");

    // console.log(`create address ${address} , ${seed.toString()}`)
    // const newPass = "1234";
  
    // update passwd
    // const ps1 = {
    //   address,
    //   newPass,
    //   oldpasswd
    // } 
    // const r = await postWallet(1,'pol.accountsChangePassword',ps1)

    // assert(r,"update passwd fail.....");

    // console.log(`update passwd  ${address} , newpd ${newPass.toString()}`)

    // const ps2 = {
    //   address,
    //   newPass
    // }
    // const json = await postWallet(1,'pol.accountsExport',ps2);
    // console.log(`export json keystore ${JSON.stringify(json)}`)

    // const ps3 = {
    //   address,
    //   newPass
    // }
    // const validate = await postWallet(1,'pol.accountsValidate',ps3)
    // console.log(`validate account  ${validate}`)

    // let ps4 = {
    //   json,
    //   newPass
    // }

    // await postWallet(1,'pol.jsonRestore',ps4);

    // console.log(`import account success`)
 }

 main();