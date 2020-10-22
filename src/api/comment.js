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
