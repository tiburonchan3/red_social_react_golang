import React from 'react'
import './UserConfig.scss'
import {Modal} from 'react-bootstrap'
import EditUserForm from '../User/EditUserForm'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'


export default function UserConfig(props) {
    const {modalShow,setModalShow,user} = props
    return (
        <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        show={modalShow}
        onHide={()=>setModalShow(false)}
        className="user-config"
    >
         <Modal.Header>
            <span onClick={()=>setModalShow(false)}>
                <FontAwesomeIcon icon={faTimes}/>
            </span>
            <Modal.Title>
                Datos del usuario
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditUserForm modalShow={modalShow} setModalShow={setModalShow} user={user}></EditUserForm>
        </Modal.Body>
    </Modal>
    )
}
