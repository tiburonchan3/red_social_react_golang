import React,{useState,useEffect} from 'react'
import './User.scss'
import {Button,Spinner} from 'react-bootstrap'
import BasicLayout from '../../layouts/BasicLayout'
import {toast} from 'react-toastify'
import {withRouter} from 'react-router-dom'
import {getUserApi} from '../../api/user'
import BannerAvatar from '../../components/User/BannerAvatar'
import useAuth from '../../hooks/useAuth'
import InfoUser from '../../components/User/InfoUser'
import {GetUserPublicationApi} from '../../api/publication'
import PublicationList from '../../components/User/PublicationList'
import AddPublication from '../../components/User/AddPublication'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

function User(props){
    const {setRefreshCheckLogin,match} = props
    const {params} = match
    const [user,setUser] = useState(null)
    const loggedUser = useAuth()
    const [publications, setPublications] = useState(null)
    const [refreshPublication, setRefreshPublication] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [page, setPage] = useState(1)
    const [loadingPublication,setLoadingPublication] = useState(false)
    useEffect(() => {
        getUserApi(params.id).then(response=>{
            if(!response) toast.error("Usuario no existente")
            setUser(response)
        }).catch(()=>{
            toast.error("Error del servidor")
        })
    }, [params])
    useEffect(() => {
        GetUserPublicationApi(params.id,1)
        .then(response=>{
            setPublications(response)
        }).catch(()=>{
            setPublications([])
        })
    }, [params,showModal,refreshPublication])
    const morePublication = ()=>{
        const pageTemp = page + 1
        setLoadingPublication(true)
        GetUserPublicationApi(params.id,pageTemp).then(response => {
            if(!response){
                setLoadingPublication(0)
            }else{
                setPublications([...publications,...response])
                setPage(pageTemp)
                setLoadingPublication(false)
            }
        })
    }
    return (
        <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin} className="user">
            <div className="user__title">
            <h2>
                {user ? `${user.nombre} ${user.apellidos}` : "Usuario no encontrado"}
            </h2>
            </div>
            <BannerAvatar user={user} loggedUser={loggedUser}></BannerAvatar>
            <InfoUser user={user} ></InfoUser>
            {loggedUser._id === user?.id &&
                <Button onClick={()=>setShowModal(true)} className="addPublication">
                    <FontAwesomeIcon icon={faPlus}/>
                    <span>Agregar publicacion</span>
                </Button>
            }
            <AddPublication showModal={showModal} setShowModal={setShowModal}></AddPublication>
            <div className="user__publications">
                <h3>Publicaciones</h3>
                {publications &&(<PublicationList setRefreshPublication={setRefreshPublication} loggedUser={loggedUser} publications={publications}/>)}
            </div>
               <Button onClick={morePublication} className="more">
               {loadingPublication < 0 ? (
                   (loadingPublication !== 0) && "Ver mas..."
                   ) : (
                      "No hay mas publicaciones para mostrar"
                   )
               }
            </Button>
        </BasicLayout>
    )
}
export default withRouter(User)
