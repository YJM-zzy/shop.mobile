import {applyMiddleware, combineReducers, createStore, compose } from "redux";
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise'
import TabbarReducer from './reducers/TabbarReducer'
import AddressReducer from "./reducers/AddressReducer";

const reducer = combineReducers({
	TabbarReducer,
	AddressReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(reducer,composeEnhancers(applyMiddleware(reduxThunk, reduxPromise)));