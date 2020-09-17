import React,{useState,useEffect} from 'react'
import './User.scss'
import {Button,Spinner} from 'react-bootstrap'
import BasicLayout from '../../layouts/BasicLayout'
import {toast} from 'react-toastify'
import {withRouter} from 'react-router-dom'
import {getUserApi} from '../../api/user'
import BannerAvatar from '../../components/User/BannerAvatar'

function User(props)
{
    const {setRefreshCheckLogin,match} = props
    const {params} = match
    const [user,setUser] = useState(null)
    useEffect(() => {
        getUserApi(params.id).then(response=>{
            if(!response) toast.error("Usuario no existente")
            setUser(response)
        }).catch(()=>{
            toast.error("Error del servidor")
        })
    }, [params])
    return (
        <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin} className="user">
            <div className="user__title">
            <h2>
                {user ? `${user.nombre} ${user.apellidos}` : "Usuario no encontrado"}
            </h2>
            </div>
            <BannerAvatar user={user}></BannerAvatar>
            <div>Info Usuario</div>
            <div className="user__publications">Publicaciones</div>
        </BasicLayout>
    )
}
export default withRouter(User)
