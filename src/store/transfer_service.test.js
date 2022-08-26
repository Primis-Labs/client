const  { initJsStore } = require("./idb_service");
const { TransferService }  = require("./transfer_service");

async function main(){
   await initJsStore();
   var from = '5Gb9AfeJnhedZN4H6xVEEixLmSatLmpZaacPLVMesZuRZxgr';
   var obj = {
     hash:'123456',
     from:from,
     to:'5Gb9AfeJnhedZN4H6xVEEixLmSatLmpZaacPLVMesZuRZxgr',
     formatFrom:'gkKej1RjUhsfLCzVc4wHzd3mLCNet7EcvrC4n2FjU7fasSmzC',
     balance:100,
     symbols:'roc',
     status:'1',
     desc:'',
     createTime:new Date()
   }

   var indexdb = new TransferService();
   var r = indexdb.add(obj);

   var query = indexdb.getTransfers(from);
   console.log(`query db ${query}`);

}

main()