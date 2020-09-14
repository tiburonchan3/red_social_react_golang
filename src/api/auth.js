import {API_HOST, TOKEN} from '../utils/constants';
import JwtDecode from 'jwt-decode'

export function signUpApi(user){
    const url = `${API_HOST}/registro`;
    const User_temp = {
        ...user,
        email: user.email.toLowerCase()
    }
    delete User_temp.repeatPassword;
    const params = {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(User_temp)
    }
    return fetch(url,params).then(response =>{
        if(response.status>=200 && response.status < 300){
            return response.json();
        }else{
            return {code:400, message:"E-mail no disponible"}
        }
    }).then(result => {
        return result
    }).catch(err =>{
        return err;
    })
}
export function loginApi(user){
    const url = `${API_HOST}/login`;
    const userTemp = {
        ...user,
        email: user.email.toLowerCase()
    }
    const params = {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(userTemp)
    }
    return fetch(url,params).then(response =>{
        if(response.status>=200 && response.status < 300){
            return response.json();
        }else{
            return {code:400, message:"email o password incorrecto"}
        }
    }).then(result => {
        return result
    }).catch(err =>{
        return err;
    })
}
export function SetTokenApi(token){
    localStorage.setItem(TOKEN,token)
}
export function getTokenApi(){
    return localStorage.getItem(TOKEN)
}
export function logoutApi(){
    localStorage.removeItem(TOKEN)
}
export function isUserLoggedApi(){
    const token = getTokenApi()
    if(!token){
        logoutApi()
        return null
    }
    if(isExpiredToken(token)){
        logoutApi()
    }
    return JwtDecode(token)
}
export function isExpiredToken(token){
    const {expirate} = JwtDecode(token);
    const expire = expirate *1000
    const timeOut = expire - Date.now()
    if(timeOut<0){
        return true
    }
    return false
}
