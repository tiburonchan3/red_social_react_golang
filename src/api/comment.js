import {getTokenApi} from './auth'
import {API_HOST} from '../utils/constants'

export function createComment(id,comentario){
    const url = `${API_HOST}/comentar?publicacionid=${id}`
    const params = {
        method: "POST",
        headers:{
            Authorization: `Bearer ${getTokenApi()}`
        },
        body:JSON.stringify(comentario)
    }
    return fetch(url,params).then(response => {
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })
}
export function getComments(id){
    const url = `${API_HOST}/mostrarComentarios?id=${id}`
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
export function getReactionsComment(id){
    const url = `${API_HOST}/readRComment?idP=${id}`
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
export function addReactionComment(id,react){
    const url = `${API_HOST}/reactComment?commentid=${id}&react=${react}`
    const params = {
        method: 'POST',
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url,params)
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        return err
    })
}
export function deleteReactionComment(id){
    const url = `${API_HOST}/delRComment?id=${id}`
    const params = {
        method: 'DELETE',
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url,params)
    .then(response=>{
        return response
    })
    .catch((err)=>{
        return err
    })
}
