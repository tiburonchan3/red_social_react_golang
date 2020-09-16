import React from 'react'
import './LeftMenu.scss'
import {Button} from "react-bootstrap"
import {Link} from "react-router-dom"
import LogoWhite from "../../assets/geckoo.png"
import Home from "../../assets/home.png"
import Users from "../../assets/friends.png"
import Account from "../../assets/user.png"
import Logout from "../../assets/logout.png"
import user from "../../assets/foto.jpg"
import {logoutApi} from '../../api/auth'

export default function LeftMenu() {
    return (
        <div className="left-menu">
          <img src={LogoWhite} alt="none" className="logo"></img>
          <img src={user} alt="null" className="user-photo"></img>
          <Link to="/" className="link">
                <img src={Home} className="icon_link" alt="null" /> Inicio
          </Link>
          <Link to="/" className="link">
                <img src={Users} className="icon_link" alt="null" /> Usuarios
          </Link>
          <Link to="/" className="link">
                <img src={Account} className="icon_link" alt="null" /> Mi Cuenta
          </Link>
          <Link to="" className="link" onClick={logoutApi}>
                <img src={Logout} className="icon_link" alt="null" /> Cerrar Sesion
          </Link>
        </div>
    )
}
