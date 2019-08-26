import { combineReducers } from "redux"; 
import sessionStore from './CommonReducer';

const appState = combineReducers({sessionStore});

export default appState