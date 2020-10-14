import {getTokenApi} from './auth'
import {API_HOST} from '../utils/constants'

export function AddPublicationApi(formData){
    const url = `${API_HOST}/publicacion`
    const params = {
        method: "POST",
        headers:{
            Authorization: `Bearer ${getTokenApi()}`
        },
        body:JSON.stringify(formData)
    }
    return fetch(url,params).then(response=>{
        return response
    }).then(result=>{
        return result
    }).catch(err=>{
        return err
    })
}
export function GetUserPublicationApi(idUser,page){
    const url = `${API_HOST}/readPublicacion?id=${idUser}&pagina=${page}`
    const params = {
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url,params)
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{
        return err
    })
}
export function GetAllPublicationApi(page = 1){
    const url = `${API_HOST}/allPublicaciones?page=${page}`
    const params = {
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url,params)
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{
        return err
    })
}
