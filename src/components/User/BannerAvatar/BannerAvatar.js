import React from 'react'
import './BannerAvatar.scss'
import {API_HOST} from '../../../utils/constants'

export default function BannerAvatar(props) {
    const {user} = props
    const bannerUrl = user?.banner ? `${API_HOST}/mostrarBanner?id=${user.id}` : null;
    return (
       <div className="banner-avatar" style={{backgroundImage: `url('${bannerUrl}')` }}>
           <div></div>
       </div>
    )
}
