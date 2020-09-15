import React,{useState,useEffect} from 'react';
import './SingInSingUp.scss';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm'

export default function SingInSingUp(props) {
    const {setRefreshCheckLogin} = props
    const [modalShow, setModalShow] = useState(false);
    const [userRegister, setUserRegister] = useState(false)
    const [checkRegister,setCheckRegister] = useState(false)
    useEffect(() => {
        setUserRegister(true)
        setCheckRegister(false)
    }, [checkRegister])
    if(!userRegister) return null
    return (
        <div className="login-wrap">
        <div className="singIn__singUp">
            <h2 className="lead text-center">Bienvenido!!!</h2>
            <div className="hr"></div>
            <div className="login-form">
            <LoginForm setRefreshCheckLogin={setRefreshCheckLogin}/>
            </div>
        </div>
        <a className="lead register__link text-center" onClick={() => setModalShow(true)}>Aun no tienes una cuenta?</a>
        <RegisterForm modalShow={modalShow} setModalShow={setModalShow}/>
    </div>
    );
}
