import React from 'react';
import './SingInSingUp.scss';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm'

export default function SingInSingUp() {
    return (
        <div className="login-wrap">
        <div className="singIn__singUp">
            <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab">Iniciar Sesion</label>
            <input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab">Crear Cuenta</label>
            <div className="login-form">
            <LoginForm/>
            <RegisterForm/>
            </div>
        </div>
    </div>
    );
}
