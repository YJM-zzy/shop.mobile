import {applyMiddleware, combineReducers, createStore, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise'
import TabbarReducer from './reducers/TabbarReducer'
import AddressReducer from "./reducers/AddressReducer";

// 持久化配置
const persistConfig = {
	key: 'redux',
	storage,
	whitelist: ['AddressReducer']
}

const reducer = combineReducers({
	TabbarReducer,
	AddressReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)
// 配置redux开发工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer,composeEnhancers(applyMiddleware(reduxThunk, reduxPromise)));
let persistor = persistStore(store)
export {store, persistor}