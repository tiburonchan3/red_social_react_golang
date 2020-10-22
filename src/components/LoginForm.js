import React, {useState} from 'react'
import {Form,Button,Spinner} from 'react-bootstrap'
import {values,size} from 'lodash'
import {toast} from 'react-toastify'
import {isEmailValid} from '../utils/validation'
import LogoWhite from '../assets/geckoo.png'
import { loginApi,SetTokenApi } from '../api/auth'

export default function LoginForm(props) {
    const {setRefreshCheckLogin} = props
    const [formData, setFormData] = useState(initialValue)
    const [loginLoading, setLoginLoading] = useState(false)
    const onSubmit = e =>{
        e.preventDefault()
        let validCount = 0;
        values(formData).some(value =>{
            value && validCount++
            return null
        })
        if(validCount !== size(formData)){
            toast.warning("Todos los campos son necesarios");
        }else if(!isEmailValid(formData.email)){
            toast.warning("El correo es incorrecto")
        }else{
            setLoginLoading(true);
            loginApi(formData).then(response =>{
                if(response.message){
                    toast.warning(response.message)
                }else{
                    toast.success("Datos Correctos");
                    SetTokenApi(response.token)
                    setRefreshCheckLogin(true)
                }
            }).catch( ()=>{
                toast.error("error del servidor");
            }).finally( () =>{
                setLoginLoading(false)
            })
        }
    }
    const onChange = e =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    return (
        <Form onSubmit={onSubmit} onChange={onChange}>
            <div className="login__form">
                <img src={LogoWhite} alt=""></img>
                <Form.Group className="group">
                    <label htmlFor="user" className="label">E-mail</label>
                    <Form.Control
                        type="email"
                        defaultValue={formData.email }
                        name="email"
                    />
                </Form.Group>
                <Form.Group className="group">
                    <label htmlFor="user" className="label">Password</label>
                    <Form.Control
                        type="password"
                        defaultValue={formData.password }
                        name="password"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                   {
                       !loginLoading ? "Iniciar Sesion" : <Spinner animation="border"/>
                   }
                </Button>
                <div className="foot-lnk">
                    <a href="#forgot">Forgot Password?</a>
                </div>
            </div>
        </Form>
    )
}

const initialValue = {
    email: "",
    password:""
}
