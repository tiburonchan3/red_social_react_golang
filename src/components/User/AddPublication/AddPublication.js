import React,{useState} from 'react'
import {Modal,Button, Form} from 'react-bootstrap'
import {toast} from 'react-toastify'
import './AddPublication.scss'
import NoImage from '../../../assets/no-image.jpg'
import classNames from 'classnames'
import {AddPublicationApi} from '../../../api/publication'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {lenguajes} from '../../../utils/lenguajes'
import {map} from 'lodash'

export default function AddPublication(props) {
    const {showModal,setShowModal} = props
    const [publication, setPublication] = useState("")
    const [formData,setFormData] = useState(initialValues())
    const [textAreaHide, setTextAreaHide] = useState('hide')
    const limit = 500;
    const Submit = (e)=>{
        e.preventDefault()
        console.log(formData)
        AddPublicationApi(formData).then(response=>{
           toast.success("Se agrego correctamente")
           setShowModal(false)
           setPublication('')
        }).catch(()=>{
            toast.error("No se pudo agregar la publicacion")
        })
    }
    const Change = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    return (
        <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        show={showModal}
        onHide={()=>setShowModal(false)}
        className="add-publication"
    >
         <Modal.Header>
            <span className="close" onClick={()=>setShowModal(false)}>
                <FontAwesomeIcon icon={faTimes}/>
            </span>
            <Modal.Title>
                Agregar Publicacion
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="form-data__show">
                <Form onSubmit={Submit} onChange={Change}>
                    <div className={`content ${textAreaHide}`}>
                    <Form.Group>
                        <label>Publicacion</label>
                        <Form.Control as="textarea" name="publicacion" row="5" col="5"
                            onChange={(e)=>setPublication(e.target.value)}
                        ></Form.Control>
                        <span className={classNames("count",{
                            error:publication.length > limit
                        })}>{publication.length}</span>
                    </Form.Group>
                    <Form.Group>
                        <label>Lenguaje</label>
                        <Form.Control className="select" as="select" name="tecnologias">
                            <option disabled defaultValue>Selecciona un lenguaje</option>
                            {map(lenguajes,(lang,index)=>{
                                return <option key={index} value={lang.name}>{lang.name}</option>
                            })}
                        </Form.Control>
                    </Form.Group>
                    </div>
                   <div className={`area ${textAreaHide}`}>
                    <Form.Group >
                            <label>Codigo</label>
                            <Form.Control
                                as="textarea"
                                row="5"
                                col="5"
                                name="code"
                                placeholder="Escribe el fragmento de codigo donde tienes problemas"
                                className="codigo"
                            />
                    </Form.Group>
                   </div>
                    <Button
                    disabled={publication.length>limit || publication.length<1}
                    variant="primary" className="btn-next"
                    onClick={()=>setTextAreaHide('show')}
                    className={`btn-next ${textAreaHide}`}
                    >
                        Siguiente
                    </Button>
                    <Button className={`btn-pub ${textAreaHide}`}
                        type="submit"
                    >
                        Publicar
                    </Button>
                    <Button
                    variant="primary" className="btn-prev"
                    onClick={()=>setTextAreaHide('hide')}
                    className={`btn-prev ${textAreaHide}`}
                    >
                        Anterior
                    </Button>
                </Form>
            </div>
        </Modal.Body>
    </Modal>
    )
}
function initialValues(){
    return{
        publicacion:"",
        tecnologias:"",
        code:"",
    }
}
