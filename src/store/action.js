//age
export const SET_ACCOUNT = 'set_Account'
//name
export const SET_NSME='set_name'
//age  n  get  age
export function setAccount(account) {
    return {
        type: SET_ACCOUNT,
        account: account
    }
}
//  get name
export function setName(name) {
    return {
        type: SET_NSME,
        name: name
    }
}