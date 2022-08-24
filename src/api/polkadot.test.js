const { initWallet,postWallet } = require('./walletManager');

async function main (){
    await initWallet(1);
    const {
      address,
      seed
    } = await postWallet(1,'pol.seedCreateAddress',{});

    let prefix = 105;
    const data =  {
        address,prefix,
    };
    const formatAddress = await postWallet(1,'pol.formatAddressByChain',data);
    console.log(formatAddress)

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