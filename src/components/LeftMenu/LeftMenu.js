import React from 'react'
import './LeftMenu.scss'
import {Link} from "react-router-dom"
import LogoWhite from "../../assets/geckoo.png"
import Home from "../../assets/home.png"
import Users from "../../assets/friends.png"
import Account from "../../assets/user.png"
import Exit from "../../assets/logout.png"
import {logoutApi} from '../../api/auth'
import useAuth from '../../hooks/useAuth'

export default function LeftMenu(props) {
    const userLog = useAuth()
    const {setRefreshCheckLogin} = props
    const Logout = ()=>{
        logoutApi()
        setRefreshCheckLogin(true)
    }
    return (
        <div className="left-menu">
          <img src={LogoWhite} alt="none" className="logo"></img>
          <Link to="/" className="link">
                <img src={Home} className="icon_link" alt="null" /> Inicio
          </Link>
          <Link to="/" className="link">
                <img src={Users} className="icon_link" alt="null" /> Usuarios
          </Link>
          <Link to={`/${userLog?._id}`} className="link">
                <img src={Account} className="icon_link" alt="null" /> Mi Cuenta
          </Link>
          <Link to="" className="link" onClick={Logout}>
                <img src={Exit} className="icon_link" alt="null" /> Cerrar Sesion
          </Link>
        </div>
    )
}
