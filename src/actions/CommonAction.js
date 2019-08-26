import axios from '../common/axios-global';

// action types
export const GET_SESSION_STORAGE = "GET_SESSION_STORAGE";
export const SET_SESSION_STORAGE = "SET_SESSION_STORAGE";

// action create function
export function setSessionInfo(pairs){
    console.log(pairs);
    return {type:SET_SESSION_STORAGE,pairs}
}

export function getSessionInfo(key){
    return {type:GET_SESSION_STORAGE,key}
}

export function setSessionInfoAsync(key){
    console.log(key);
    return dispatch => {
        if(window.sessionStorage.getItem(key)){
            dispatch(setSessionInfo({[key]:JSON.parse(window.sessionStorage.getItem(key))}))
        }else{
            axios.get("/common/"+key)
            .then(res => {
                let result = res.data;
                if(result.code === 1){
                    window.sessionStorage.setItem(key,JSON.stringify(result.data));
                    dispatch(setSessionInfo({[key]:result.data}));
                }else{
                    throw new Error(result.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
        
    }
    
}