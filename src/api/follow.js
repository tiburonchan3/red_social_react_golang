import {API_HOST} from '../utils/constants'
import {getTokenApi} from './auth'

export function checkFollowApi(idUser){
    const url = `${API_HOST}/consultaRelacion?id=${idUser}`
    const params = {
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url,params).then(response=>{
        return response.json()
    })
    .then(response=>{
        return response
    })
    .catch(err=>{
        return err
    })
}
export function followApi(idUser){
    const url = `${API_HOST}/insertRelation?id=${idUser}`
    const params = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url,params).then(response=>{
        return response.json()
    })
    .then(response=>{
        return response
    })
    .catch(err=>{
        return err
    })
}
export function unFollowApi(idUser){
    const url = `${API_HOST}/unfollow?id=${idUser}`
    const params = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url,params).then(response=>{
        return response.json()
    })
    .then(response=>{
        return response
    })
    .catch(err=>{
        return err
    })
}
export function getFollowFriends(paramsUrl){
    const url = `${API_HOST}/listaUsuarios?${paramsUrl}`
    const params = {
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url,params).then((response)=>{
        return response.json()
    })
    .then(response=>{
        return response
    })
    .catch(err=>{
        return err
    })
}
