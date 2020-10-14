import {API_HOST} from '../utils/constants'
import {getTokenApi} from './auth';

export function getUserApi(id){
    const url = `${API_HOST}/verperfil?id=${id}`
    const params = {
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url,params).then(response=>{
        if(response.status >=400) throw null
        return response.json()
    }).then(result=>{
        return result
    }).catch(err=>{
        return err.message
    })
}
export function uploadBannerApi(file){
    const url = `${API_HOST}/upBanner`
    const formData = new FormData()
    formData.append("banner",file)
    const params = {
        method: "POST",
        headers: {
            //"Content-Type":"multipart/",
            Authorization: `Bearer ${getTokenApi()}`
        },
        body:formData
    }
    return fetch(url,params).then(response=>{
        return response.json()
    }).catch(err=>{
        return err
    })
}
export function uploadAvatarApi(file){
    const url = `${API_HOST}/upAvatar`
    const formData = new FormData()
    formData.append("avatar",file)
    const params = {
        method: "POST",
        headers: {
            //"Content-Type":"multipart/",
            Authorization: `Bearer ${getTokenApi()}`
        },
        body:formData
    }
    return fetch(url,params).then(response=>{
        return response.json()
    }).then(result=>{
        return result
    }).catch(err=>{
        return err
    })
}
export function UpdateProfileApi(user){
    const url = `${API_HOST}/updateperfil`
    const params = {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${getTokenApi()}`
        },
        body:JSON.stringify(user)
    }
    return fetch(url,params)
    .then(response=>{
        return response
    }).catch(err=>{
        return err
    })
}
