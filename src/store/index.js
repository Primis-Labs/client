import { createStore } from "redux";
import { SET_SEED, SET_ACCOUNT, SET_ADDRESS } from './action'
import { persistStore, persistReducer } from 'redux-persist';
//  sessionStorage
import storageSession from 'redux-persist/lib/storage';
// import storage from 'redux-persist/lib/storage'; //localStorage
//import { AsyncStorage } from 'react-native'; //react-native
const storageConfig = {
    key: 'root',
    storage: storageSession, //
    blacklist: [], // reducer
};

function user(state, action) {
    console.log(action)
    switch (action.type) {
        case SET_ACCOUNT:
            return {
                ...state,
                account: action.account,
            }
        case SET_SEED:
            return {
                ...state,
                seed: action.seed
            }
        case SET_ADDRESS:
            return {
                ...state,
                address: action.address
            }
        default:
            return state;
    }
}


const myPersistReducer = persistReducer(storageConfig, user);
const store = createStore(myPersistReducer);
export const persistor = persistStore(store);
export default store;