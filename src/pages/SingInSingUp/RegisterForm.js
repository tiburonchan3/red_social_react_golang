import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'

export default function RegisterForm() {

    const [formData,setFormData] = useState(initiatFormValue());

    const onSubmit = e =>{
        e.preventDefault();
        console.log(formData);
    }
    const onChange = e =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    return (
        <div className="register__form">
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group className="group">
                    <label htmlFor="user" className="label">Nombre</label>
                    <Form.Control
                        type="text"
                        defaultValue={formData.nombre}
                        name="nombre"
                    />
                    <span className="border"></span>
                </Form.Group>
                <Form.Group className="group">
                    <label htmlFor="user" className="label">Apellidos</label>
                    <Form.Control
                        type="text"
                        defaultValue={formData.apellidos}
                        name="apellidos"
                    />
                    <span className="border"></span>
                </Form.Group>
                <Form.Group className="group">
                    <label htmlFor="user" className="label">E-mail</label>
                    <Form.Control
                        type="email"
                        defaultValue={formData.email}
                        name="email"
                    />
                    <span className="border"></span>
                </Form.Group>
                <Form.Group className="group">
                    <label htmlFor="user" className="label">Password</label>
                    <Form.Control
                        type="password"
                        defaultValue={formData.password}
                        name="password"
                    />
                    <span className="border"></span>
                </Form.Group>
                <Form.Group className="group">
                    <label htmlFor="user" className="label">Repeat your password</label>
                    <Form.Control
                        type="password"
                        defaultValue={formData.repeatPassword}
                        name="repeatPassword"
                    />
                    <span className="border"></span>
                </Form.Group>
                <Button variant="primary" type="submit">Registrarse</Button>
            </Form>
        </div>
    )
}
function initiatFormValue(){
    return{
        nombre:'',
        apellidos:'',
        email:'',
        password:'',
        repeatPassword:''
    }
}
