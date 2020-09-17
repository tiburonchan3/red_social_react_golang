import React from 'react'
import './BannerAvatar.scss'
import {API_HOST} from '../../../utils/constants'
import NotFound from '../../../assets/avatar-no-found.png'
import {Button,Spinner} from 'react-bootstrap'

export default function BannerAvatar(props) {
    const {user,loggedUser} = props

    const bannerUrl = user?.banner ? `${API_HOST}/mostrarBanner?id=${user.id}` : null;
    const avatarUrl = user?.avatar ? `${API_HOST}/mostrarAvatr?id=${user.id}` : NotFound;
    return (
       <div className="banner-avatar" style={{backgroundImage: `url('${bannerUrl}')` }}>
           <div className="avatar" style={{backgroundImage: `url('${avatarUrl}')` }}/>
           {user &&(
                <div className="option">
                    {loggedUser._id === user.id && <Button>Editar perfil</Button>}
                    {loggedUser._id !== user.id && <Button>Seguir</Button>}
                </div>
           )}
       </div>
    )
}
