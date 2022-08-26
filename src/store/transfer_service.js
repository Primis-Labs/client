const { idbCon } = require("./idb_service");

export class TransferService {

    constructor() {
        this.tableName = "Transfers";
    }

    getTransfers(address) {
        return idbCon.select({
            from: this.tableName,
            where:{
                from:address
            }
        })
    }

    add(transfer) {
        console.log('obj :' + idbCon)
        return idbCon.insert({
            into: this.tableName,
            values: [transfer],
            return: true
        })
    }

    getById(id) {
        return idbCon.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }

    remove(id) {
        return idbCon.remove({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }

    updateById(id, updateData) {
        return idbCon.update({
            in: this.tableName,
            set: updateData,
            where: {
                id: id
            }
        })
    }
}