import React,{useState} from 'react'
import '../scss/index.scss'
import {Form,Button,Spinner,Row,Col,Modal} from 'react-bootstrap'
import {values,size} from 'lodash'
import {toast} from 'react-toastify';
import {isEmailValid} from '../utils/validation';
import {signUpApi} from '../api/auth'

export default function RegisterForm(props) {
    const [Data,setData] = useState(initiatFormValue());
    const {modalShow,setModalShow} = props
    const [signUploading, setSignUploading] = useState(false)

    const submitForm = e =>{
        e.preventDefault();
        let Count = 0
        values(Data).some(value => {
            value && Count++
            return null
        })
        if(Count!==size(Data)){
            toast.warning("Todos los campos son necesarios");
        }else if(!isEmailValid(Data.email)){
            toast.warning("El email es invalido");
        }else if(Data.password!==Data.repeatPassword){
            toast.warning("las password no coinciden");
        }else if(size(Data.password)!==6){
            toast.warning("la password debe contener 6 caracteres");
        }else{
            setSignUploading(true);
            signUpApi(Data).then(response => {
                if(response.code){
                    toast.warning(response.message)
                }else{
                    toast.success("Se guardo con exito")
                    setData(initiatFormValue);
                    console.log(response)
                    setModalShow(false)
                }
            }).catch(err => {
                toast.error("Error en el servidor");
            }).finally(()=>{
                setSignUploading(false);
            })
        }
    }
    const changeForm = e =>{
        setData({...Data,[e.target.name]:e.target.value})
    }

    return (
        <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        centered
        show={modalShow}
        onHide={()=> setModalShow(false)}
        className="register_modal"
    >
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Completa los siguientes datos
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="register__form">
            <Form onSubmit={submitForm} onChange={changeForm}>
                <Row>
                    <Col xs={6}>
                        <Form.Group className="group">
                            <label htmlFor="user" className="label">Nombre</label>
                            <Form.Control
                                type="text"
                                defaultValue={Data.nombre}
                                name="nombre"
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group className="group">
                            <label htmlFor="user" className="label">Apellidos</label>
                            <Form.Control
                                type="text"
                                defaultValue={Data.apellidos}
                                name="apellidos"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6">
                        <Form.Group className="group">
                            <label htmlFor="user" className="label">Fecha de nacimiento</label>
                            <Form.Control
                                type="date"
                                defaultValue={Data.fechaN}
                                name="fechaN"
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group className="group">
                            <label htmlFor="user" className="label">E-mail</label>
                            <Form.Control
                                type="email"
                                defaultValue={Data.email}
                                name="email"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                    <Form.Group className="group">
                    <label htmlFor="user" className="label">Password</label>
                    <Form.Control
                        type="password"
                        defaultValue={Data.password}
                        name="password"
                    />
                </Form.Group>
                    </Col>
                    <Col xs={6}>
                    <Form.Group className="group">
                    <label htmlFor="user" className="label">Repeat your password</label>
                    <Form.Control
                        type="password"
                        defaultValue={Data.repeatPassword}
                        name="repeatPassword"
                    />
                </Form.Group>
                    </Col>
                </Row>


                <Button
                    variant="primary"
                    type="submit">
                        {!signUploading ? "Registrarse" : <Spinner animation="border"/>}
                </Button>
            </Form>

        </div>
        </Modal.Body>
    </Modal>
    )
}
function initiatFormValue(){
    return{
        nombre:'',
        apellidos:'',
        email:'',
        fechaN:"",
        password:'',
        repeatPassword:''
    }
}
