import React,{useState} from 'react'
import {Modal,Button, Form} from 'react-bootstrap'
import {toast} from 'react-toastify'
import Close from '../../../assets/icons/cancel.png'
import './AddPublication.scss'
import NoImage from '../../../assets/no-image.jpg'
import classNames from 'classnames'
import {AddPublicationApi} from '../../../api/publication'

export default function AddPublication(props) {
    const {showModal,setShowModal} = props
    const [classDiv, setClassDiv] = useState(true)
    const [publication, setPublication] = useState("")
    const [formData,setFormData] = useState(initialValues())

    const Click = ()=>{
        setClassDiv(false)
    }
    const limit = 500;
    const Submit = (e)=>{
        e.preventDefault()
        AddPublicationApi(formData).then(response=>{
            console.log(response)
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
            <img src={Close} alt="none" onClick={()=>{setShowModal(false); setClassDiv(true)} }></img>
            <Modal.Title>
                {classDiv ? "Agregar Publicacion" : "Agregar imagen"}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className={classDiv ? "form-data__show" : "form-data__hidde"}>
                <Form onSubmit={Submit} onChange={Change}>
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
                        <label>Tecnologias</label>
                        <Form.Control type="text" name="tecnologias"></Form.Control>
                    </Form.Group>
                    <Button
                    disabled={publication.length>limit || publication.length<1}
                    variant="primary" type="submit" className="btn-next">
                 Siguiente
            </Button>
                </Form>
            </div>
            <div className={classDiv ? "form-data__hidde" : "form-data__show"}>
                <div className="img" style={{backgroundImage:`url(${NoImage})`}}></div>
                <Button className="btn-pub">
                    Publicar
                </Button>
            </div>
            {!classDiv &&(<Button variant="primary" type="submit" className={`btn-submit`} onClick={()=>setClassDiv(true)}>
                 Anterior
            </Button>)}

        </Modal.Body>
    </Modal>
    )
}
function initialValues(){
    return{
        publicacion:"",
        tecnologias:""
    }
}
