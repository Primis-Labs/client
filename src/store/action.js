//age
export const SET_ACCOUNT = 'set_Account'
//name
export const SET_SEED='set_Seed'

export const SET_ADDRESS='set_Address'
//age  n  get  age
export function setAccount(account) {
    return {
        type: SET_ACCOUNT,
        account: account
    }
}
//  get name
export function setSeed(seed) {
    return {
        type: SET_SEED,
        seed: seed
    }
}
export function setAddress(address) {
    return {
        type: SET_ADDRESS,
        address: address
    }
}

