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
