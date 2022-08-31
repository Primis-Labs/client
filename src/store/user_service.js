import { legacy_createStore } from "redux";

const { idbCon } = require("./idb_service");

export class UserService {

    constructor() {
        this.tableName = "Users";

    }

    async getUser(address) {
        return await idbCon.select({
            from: this.tableName,
            where:{
                from:address
            }
        })
    }

    async add(user) {
        return await idbCon.insert({
            into: this.tableName,
            values: [user],
            return: true
        })
    }

    async getById(id) {
        return await idbCon.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }

    async remove(id) {
        return await idbCon.remove({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }

    async updateById(id, updateData) {
        return await idbCon.update({
            in: this.tableName,
            set: updateData,
            where: {
                id: id
            }
        })
    }

    async updateByAddress(address, updateData) {
        return await idbCon.update({
            in: this.tableName,
            set: updateData,
            where: {
                address: address
            }
        })
    }
}