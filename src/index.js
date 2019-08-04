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
Promise._immediateFn = setAsap; 

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
