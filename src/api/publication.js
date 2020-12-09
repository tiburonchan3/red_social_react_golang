import {getTokenApi} from './auth'
import {API_HOST} from '../utils/constants'

export function AddPublicationApi(data,foto){
    const formData = new FormData()
    formData.append("foto",foto)
    formData.append("publicacion",data.publicacion)
    formData.append("tecnologias",data.tecnologias)
    const url = `${API_HOST}/publicacion`
    const params = {
        method: "POST",
        headers:{
            Authorization: `Bearer ${getTokenApi()}`
        },
        body:formData
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
export function DeletePublication(id){
    const url = `${API_HOST}/deletePublicacion?id=${id}`
    const params = {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url,params).then(response=>{
        return response
    }).then(result=>{
        return result
    }).catch(err=>{
        return err
    })
}
export function GetPublication(id){
    const url = `${API_HOST}/Apublication?idPublicacion=${id}`
    const params = {
        headers:{
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url,params).then(response => {
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })
}
export function addReaction(id){
    const url = `${API_HOST}/reaccion?publicacionid=${id}`
    const params = {
        method: 'POST',
        headers:{
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url,params).then(response => {
        return response
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })
}
export function readReaction(id){
    const url = `${API_HOST}/mostrarReacciones?idP=${id}`
    const params = {
        headers:{
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url,params).then(response => {
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })
}
export function deleteReaction(id){
    const url = `${API_HOST}/delreaccion?id=${id}`
    const params = {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url,params).then(response => {
        return response
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })
}
