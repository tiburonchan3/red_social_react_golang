import React, { useState, useCallback } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import './AddPublication.scss'
import NoImage from '../../../assets/no-image.jpg'
import classNames from 'classnames'
import { AddPublicationApi } from '../../../api/publication'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faImage } from '@fortawesome/free-solid-svg-icons'
import { lenguajes } from '../../../utils/lenguajes'
import { map } from 'lodash'
import { useDropzone } from 'react-dropzone'

export default function AddPublication(props) {
    const { showModal, setShowModal } = props
    const [publication, setPublication] = useState("")
    const [formData, setFormData] = useState(initialValues())
    const [foto, setFoto] = useState(null)
    const [fotoUrl, setFotoUrl] = useState(null)
    const limit = 500;
    const Submit = (e) => {
        e.preventDefault()
        AddPublicationApi(formData,foto).then(() => {
            toast.success("Se agrego correctamente")
            setShowModal(false)
            setPublication('')
        }).catch(() => {
            toast.error("No se pudo agregar la publicacion")
        })
    }
    const Change = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const onDropFoto = useCallback(acceptedFile => {
        const file = acceptedFile[0]
        setFotoUrl(URL.createObjectURL(file))
        setFoto(file)
        console.log(fotoUrl, foto)
    })
    const {
        getRootProps: getRootFotoProps,
        getInputProps: getInputFotoProps
    } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop: onDropFoto
    })
    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            show={showModal}
            onHide={() => setShowModal(false)}
            className="add-publication"
        >
            <Modal.Header>
                <span className="close" onClick={() => setShowModal(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                <Modal.Title>
                    Agregar Publicacion
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-data__show">
                    <Form onSubmit={Submit} onChange={Change}>
                        <div className="content">
                            <Form.Group>
                                <label>Publicacion</label>
                                <Form.Control as="textarea" name="publicacion" row="5" col="5"
                                    onChange={(e) => setPublication(e.target.value)}
                                ></Form.Control>
                                <span className={classNames("count", {
                                    error: publication.length > limit
                                })}>{publication.length}</span>
                            </Form.Group>
                            <Form.Group>
                                <label>Tecnologia</label>
                                <Form.Control className="select" as="select" name="tecnologias">
                                    <option disabled defaultValue>Selecciona un lenguaje</option>
                                    {map(lenguajes, (lang, index) => {
                                        return <option key={index} value={lang.name}>{lang.name}</option>
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div
                            className="banner"
                            {...getRootFotoProps()}
                        >
                            <div className="mask">
                                <span><FontAwesomeIcon className="up-icon" icon={faImage} /></span>
                                <input
                                    {...getInputFotoProps()}
                                />
                            </div>
                        </div>
                        {fotoUrl ? <img className="up-image" src={fotoUrl} alt="no-image"/> : null}
                        <Button className="btn-pub"
                            type="submit"
                        >
                            Publicar
                    </Button>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    )
}
function initialValues() {
    return {
        publicacion: "",
        tecnologias: "",
    }
}
