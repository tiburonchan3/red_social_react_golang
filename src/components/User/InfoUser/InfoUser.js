import React from 'react'
import './InfoUser.scss'
import Location from '../../../assets/icons/location-pin.png'
import BirthDay from '../../../assets/icons/time-and-date.png'
import WebSite from '../../../assets/icons/globe.png'
import moment from 'moment'
import localization from "moment/locale/es"

export default function InfoUser(props) {
    const {user} = props
    console.log(user)
    return (
        <div className="info-user">
            <h2 className="name">
                {user?.nombre} {user?.apellidos}
            </h2>
            <p className="email">{user?.email}</p>
            {user?.biografia && (
                <div className="description">
                    {user.biografia}
                    <div className="hr"></div>
                </div>

            )}
            <div className="more-info">
                {user?.ubicacion && (
                    <p>
                        <img src={Location}/>{user.ubicacion}
                    </p>
                )}
                {user?.SitioWeb && (
                    <p>
                        <img src={WebSite}/>
                        <a href={user.SitioWeb} target="_blank" rel="noopener noreferrer">{user.SitioWeb}</a>
                    </p>
                )}
                 {user?.fechaN && (
                    <p>
                        <img src={BirthDay}/>
                        {moment(user.fechaN).locale("es",localization).format("LL")}
                    </p>
                )}
            </div>
        </div>
    )
}
