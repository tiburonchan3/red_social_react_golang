import React from 'react'
import './UserPublication.scss'
import moment from 'moment'

export default function UserPublication(props) {
    const {user, avatarUrl, pub} = props
    return (
        <div className="info">
            <img src={avatarUrl} alt="none"/>
            <div className="info-user">
            <div className="name-user">
                <p>{user?.nombre} {user?.apellidos}</p>
            </div>
            <span className="date-user">
                {moment(pub.fecha).calendar()}
            </span>
            </div>
        </div>
    )
}
