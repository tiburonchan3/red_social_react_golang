import React from 'react'
import './LeftMenu.scss'
import {NavLink} from "react-router-dom"
import LogoWhite from "../../assets/geckoo.png"
import {logoutApi} from '../../api/auth'
import useAuth from '../../hooks/useAuth'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser,faHome,faUsers,faSignOutAlt,faTimes} from '@fortawesome/free-solid-svg-icons'

export default function LeftMenu(props) {
    const userLog = useAuth()
    const {setRefreshCheckLogin,setVisible} = props
    const Logout = ()=>{
        logoutApi()
        setRefreshCheckLogin(true)
    }
    return (
        <div className="left-menu">
            <span className="close" onClick={()=>setVisible('invisible')}>
                <FontAwesomeIcon icon={faTimes}/>
            </span>
            <img src={LogoWhite} alt="none" className="logo"></img>
            <NavLink exact to="/" className="link">
                <FontAwesomeIcon icon={faHome}/> Inicio
            </NavLink>
            <NavLink exact to="/friends" className="link">
                <FontAwesomeIcon icon={faUsers} /> Usuarios
            </NavLink>
            <NavLink exact to={`/${userLog?._id}`} className="link">
                <FontAwesomeIcon icon={faUser} /> Mi Cuenta
            </NavLink>
            <p className="link" onClick={Logout} style={{cursor: 'pointer'}}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesion
            </p>
        </div>
    )
}
