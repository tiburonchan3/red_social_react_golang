import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import {values,size} from 'lodash'
import {toast} from 'react-toastify';
import {isEmailValid} from '../../utils/validation';

export default function RegisterForm() {

    const [formData,setFormData] = useState(initiatFormValue());

    const onSubmit = e =>{
        e.preventDefault();
        console.log(formData);
        let validCount = 0
        values(formData).some(value => {
            value && validCount++
            return null
        })
        if(validCount!==size(formData)){
            toast.warning("Todos los campos son necesarios");
        }else if(!isEmailValid(formData.email)){
            toast.warning("El email es invalido");
        }else if(formData.password!==formData.repeatPassword){
            toast.warning("las password no coinciden");
        }else if(size(formData.password)!==6){
            toast.warning("la password debe contener 6 caracteres");
        }else{
            toast.success("formulario correcto")
        }
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
