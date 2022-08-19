//age
export const SET_AGE = 'set_age'
//name
export const SET_NSME='set_name'
//age  n  get  age
export function setAge(age) {
    return {
        type: SET_AGE,
        age: age
    }
}
//  get name
export function setName(name) {
    return {
        type: SET_NSME,
        name: name
    }
}