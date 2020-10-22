import React,{useState,useEffect} from 'react'
import './BannerAvatar.scss'
import {API_HOST} from '../../../utils/constants'
import {checkFollowApi,followApi,unFollowApi} from '../../../api/follow'
import NotFound from '../../../assets/avatar-no-found.png'
import {Button} from 'react-bootstrap'
import ConfigUser from '../../UserConfig'
import { toast } from 'react-toastify'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons'

export default function BannerAvatar(props) {
    const [modalShow, setModalShow] = useState(false);
    const {user,loggedUser} = props
    const [following, setFollowing] = useState(null)
    const [reloadFollow, setReloadFollow] = useState(false)
    useEffect(() => {
       if(user){
        checkFollowApi(user?.id).then(response=>{
            if(response?.status){
                setFollowing(true)
            }else{
                setFollowing(false)
            }
        })
       }
       setReloadFollow(false)
    }, [user,reloadFollow])
    const Follow = ()=>{
        followApi(user?.id).then(()=>{
            setReloadFollow(true)
            toast.info(`Ahora estas siguiendo a ${user?.nombre}`)
        })
    }
    const unFollow = ()=>{
        unFollowApi(user?.id).then(()=>{
            setReloadFollow(true)
            toast.error(`Has dejado de seguir a ${user?.nombre}`)
        })
    }
    const bannerUrl = user?.banner ? `${API_HOST}/mostrarBanner?id=${user.id}` : null;
    const avatarUrl = user?.avatar ? `${API_HOST}/mostrarAvatr?id=${user.id}` : NotFound;
    return (
       <div className="banner-avatar" style={{backgroundImage: `url('${bannerUrl}')` }}>
           <div className="avatar" style={{backgroundImage: `url('${avatarUrl}')` }}/>
           {user &&(
                <div className="option">
                    {loggedUser._id === user.id &&
                        <Button onClick={()=>setModalShow(true)} className="edit-btn">
                            <FontAwesomeIcon icon={faPencilAlt} />
                            <span>Editar perfil</span>
                        </Button>
                    }
                    {loggedUser._id !== user.id &&(
                        following !== null &&(
                            (following ?
                                <Button
                                    onClick={unFollow}
                                    className="btn-unFollow">
                                    <span className="unfollow-text">Dejar de seguir</span>
                                    <span className="following-text">Siguiendo</span>
                                </Button>
                            :
                            <Button onClick={Follow}>Seguir</Button>)
                        )
                    )}
                </div>
           )}
            <ConfigUser modalShow={modalShow} setModalShow={setModalShow} user={user}/>
       </div>
    )
}
