import React from 'react'
import './UserConfig.scss'
import Close from '../../assets/icons/cancel.png'
import {Modal} from 'react-bootstrap'
import EditUserForm from '../User/EditUserForm'


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
            <img src={Close} alt="none" onClick={()=>setModalShow(false)}></img>
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
