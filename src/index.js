import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'whatwg-fetch'; //window.fetch polyfill
import 'promise-polyfill/src/polyfill'; 
import App from './App';
import * as serviceWorker from './serviceWorker';
// import Promise from 'promise-polyfill/src/polyfill';
import setAsap from 'setasap';
/**
 * By default promise-polyfill uses setImmediate, 
 * but falls back to setTimeout for executing asynchronously. 
 * If a browser does not support setImmediate (IE/Edge are the only browsers with setImmediate)
 * setAsap or setImmediate work well.
 */
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import appState from "./reducers";

const middleware = [ thunk ]; // store.dispatch()的功能增强。即可以在reducer中进行一些异步的操作。
// console.log(process.env.NODE_ENV);
if("development" === process.env.NODE_ENV){
    middleware.push(createLogger())
}


let store = createStore(appState,applyMiddleware(...middleware));
// console.log(store.getState())


Promise._immediateFn = setAsap; 

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
