import React,{useState} from 'react'
import './Home.scss'
import BasicLayout from '../../layouts/BasicLayout'
import {Button} from 'react-bootstrap'
import Add from '../../assets/icons/add.png'
import AddPublication from '../../components/User/AddPublication'

export default function Home(props) {
    const {setRefreshCheckLogin} = props
    const [showModal, setShowModal] = useState(false)
    return (
        <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
            <Button onClick={()=>setShowModal(true)}><img src={Add} alt="none"/>Agregar publicacion</Button>
            <AddPublication showModal={showModal} setShowModal={setShowModal}></AddPublication>
        </BasicLayout>
    )
}
