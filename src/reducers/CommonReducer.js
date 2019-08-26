import {GET_SESSION_STORAGE, SET_SESSION_STORAGE} from "../actions/CommonAction";



export default function sessionStore(state={},action){
    switch(action.type){
        case GET_SESSION_STORAGE:
            return state[action.key];
        case SET_SESSION_STORAGE:
            return {...state,...action.pairs}
        default:
            return state;
    }
}
