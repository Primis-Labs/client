import { createStore } from "redux";
//引入公用的方法
import { SET_NSME, SET_AGE } from './action'
import { persistStore, persistReducer } from 'redux-persist';
//  存储机制，可换成其他机制，当前使用sessionStorage机制
import storageSession from 'redux-persist/lib/storage/session';
// import storage from 'redux-persist/lib/storage'; //localStorage机制
//import { AsyncStorage } from 'react-native'; //react-native
// 数据对象
const storageConfig = {
    key: 'root', // 必须有的
    storage: storageSession, // 缓存机制
    blacklist: [], // reducer 里不持久化的数据,除此外均为持久化数据
};

//传值 name:姓名    age:  年龄
function user(state = { name: 'blue', age: 18 }, action) {
    switch (action.type) {
        case SET_AGE:
            return {
                ...state,
                age: state.age + action.age,
            }
        case SET_NSME:
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
}


const myPersistReducer = persistReducer(storageConfig, user);
const store = createStore(myPersistReducer);
export const persistor = persistStore(store);
export default store;