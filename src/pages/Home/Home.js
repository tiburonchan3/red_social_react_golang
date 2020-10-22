import React,{useState,useEffect} from 'react'
import './Home.scss'
import BasicLayout from '../../layouts/BasicLayout'
import AddPublication from '../../components/User/AddPublication'
import {GetAllPublicationApi} from '../../api/publication'
import List from '../../components/User/PublicationList'

export default function Home(props) {
    const {setRefreshCheckLogin} = props
    const [showModal, setShowModal] = useState(false)
    const [page, setPage] = useState(1)
    const [publications, setPublications] = useState(null)
    useEffect(() => {
       GetAllPublicationApi(page).then((response) => {
          console.log(response)
       })
    }, [page])
    return (
        <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
            <h3 className="text-center">Publicaciones de tus amigos</h3>
            <AddPublication showModal={showModal} setShowModal={setShowModal}></AddPublication>
            {publications?(<List publications={publications}/>) : (<h6>No hay publicaciones para mostrar</h6>)}
        </BasicLayout>
    )
}
function formatModel(publications){
    const tempPublication = []
    publications.forEach(publication => {
       tempPublication.push({
        _id:publication._id,
        userid:publication.userRelationid,
        publicacion:publication.Publicacion.publicacion,
        fechaPublicacion:publication.Publicacion.fecha
       })
       console.log(publication)
    });
    return tempPublication
}
