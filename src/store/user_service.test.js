/* eslint-disable jest/valid-title */
const  { initJsStore } = require("./idb_service");
const { UserService }  = require("./user_service");


describe(' Store user avatars ',()=>{
  
  test('  storage test ',async() => {
    await initJsStore();
    var from = '5Gb9AfeJnhedZN4H6xVEEixLmSatLmpZaacPLVMesZuRZxgr';
    var obj = {
      address:from,
      img:'ipfs://.....',
      createTime:new Date()
    }
    var indexdb = new UserService();
    var r = indexdb.add(obj);

    var query = indexdb.getUser(from);
    console.log(`query db ${query}`);
  }) 

} )
