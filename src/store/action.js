//年龄
export const SET_AGE = 'set_age'
//姓名
export const SET_NSME='set_name'
//年龄  n 接收年龄
export function setAge(age) {
    return {
        type: SET_AGE,
        age: age
    }
}
//姓名  name 接收姓名
export function setName(name) {
    return {
        type: SET_NSME,
        name: name
    }
}