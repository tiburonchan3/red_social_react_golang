import React from 'react'
import {Form,Button} from 'react-bootstrap';
import LogoWhite from '../../assets/geckoo.png';

export default function LoginForm() {
    return (
        <div className="login__form">
                <img src={LogoWhite} alt=""></img>
                <Form.Group className="group">
                    <label htmlFor="user" className="label">Username</label>
                    <Form.Control></Form.Control>
                    <span className="border"></span>
                </Form.Group>
                <Form.Group className="group">
                    <label htmlFor="user" className="label">Password</label>
                    <Form.Control></Form.Control>
                    <span className="border"></span>
                </Form.Group>
                <Button variant="primary">Iniciar Sesion</Button>
                <div className="hr"></div>
                <div className="foot-lnk">
                    <a href="#forgot">Forgot Password?</a>
                </div>
            </div>
    )
}
