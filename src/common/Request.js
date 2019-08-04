
// headers:{
//     // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//     // 'Content-Type': 'multipart/form-data', //上传form-data不要设置
//     // 'Content-Type': 'application/json;charset=UTF-8',
// }

// "proxy": "http://localhost:8082/hello",

const serverURL = "http://localhost:8082/hello";

const init = {
    cache: 'no-cache',
    credentials: 'include',
    mode: 'cors',
    redirect: 'follow',
}

export const EncodeFormUrl = function(data){
    let encodedURL = "";
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            encodedURL += encodeURI("&"+key+"="+data[key]);
        }
    }
    return encodedURL.substring(1);
}

// form表单另一个生成方法 new FormData(document.querySelector("form"));
export const GenerateFormData = function(data){
    if(data instanceof FormData){
       return data; 
    }
    if(typeof data === "string"){
        let ele = document.querySelector(data);
        return ele && new FormData(ele);
    }
    let form = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            form.append(key,data[key]);
        }
    }
    return form;
}

export const POST = async function(url, data, fetchInit) {
    fetchInit = fetchInit || {};
    fetchInit.headers = fetchInit.headers || {};
    if(!fetchInit.headers['Content-Type']){
        fetchInit.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }
    const response = await fetch(serverURL+url, {
        body: EncodeFormUrl(data),
        method: 'POST',
        ...init,
        ...fetchInit
    });
    return await response.json();
}

export const GET = async function(url, data, fetchInit){
    const response = await fetch(serverURL+url+"?"+EncodeFormUrl(data), {
        method: 'GET',
        ...init,
        ...fetchInit
    });
    return await response.json();
}

// post with form data
export const PWFD = async function(url, data, fetchInit) {
    const response = await fetch(serverURL+url, {
        body: GenerateFormData(data),
        method: 'POST',
        ...init,
        ...fetchInit
    });
    return await response.json();
}