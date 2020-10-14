import React from 'react'
import './InfoUser.scss'
import Location from '../../../assets/icons/location-pin.png'
import BirthDay from '../../../assets/icons/time-and-date.png'
import Link from '../../../assets/icons/link.png'
import moment from 'moment'
import localization from 'moment/locale/es'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMapMarkerAlt,faLink,faBirthdayCake} from '@fortawesome/free-solid-svg-icons'

export default function InfoUser(props) {
    const {user} = props
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
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                        <span>{user.ubicacion}</span>
                    </p>
                )}
                {user?.SitioWeb && (
                    <p>
                        <FontAwesomeIcon icon={faLink} />
                        <span><a href={user.SitioWeb} target="_blank" rel="noopener noreferrer">{user.SitioWeb}</a></span>
                    </p>
                )}
                 {user?.fechaN && (
                    <p>
                        <FontAwesomeIcon icon={faBirthdayCake} />
                        <span>{moment(user.fechaN).locale("es",localization).format("LL")}</span>
                    </p>
                )}
            </div>
        </div>
    )
}
