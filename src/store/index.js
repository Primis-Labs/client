import { createStore } from "redux";
import { SET_NSME, SET_AGE } from './action'
import { persistStore, persistReducer } from 'redux-persist';
//  sessionStorage
import storageSession from 'redux-persist/lib/storage/session';
// import storage from 'redux-persist/lib/storage'; //localStorage
//import { AsyncStorage } from 'react-native'; //react-native
const storageConfig = {
    key: 'root', 
    storage: storageSession, //
    blacklist: [], // reducer
};

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