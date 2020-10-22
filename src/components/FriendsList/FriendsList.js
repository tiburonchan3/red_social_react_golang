import React,{useState,useEffect} from 'react'
import './FriendsList.scss'
import {map,isEmpty} from 'lodash'
import {getUserApi} from '../../api/user'
import {Media,Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {API_HOST} from '../../utils/constants'
import NotFound from '../../assets/avatar-no-found.png'

export default function FriendsList(props) {
    const {followFriends} = props
    console.log(props)
    if(isEmpty(followFriends)){
        return (<h2>No hay resultados</h2>)
    }
    return (
        <div>
            <ul className="list-friends">
                {map(followFriends,(friend,index) =>(
                    <List friend={friend} key={index}/>
                ))}
            </ul>
        </div>
    )
}
function List(props){
    const {friend} = props
    const [friendInfo, setFriendInfo] = useState(null)
    useEffect(() => {
        getUserApi(friend.id).then(response=>{
            setFriendInfo(response)
            console.log(response)
        }).catch(()=>{
            setFriendInfo([])
        })
     }, [friend])
    return (
        <Media as={Link} to={`/${friend.id}`} className={'list-friends__friend'}>
            <Image
                width={50}
                height={50}
                roundedCircle
                className="mr-2"
                src={friendInfo?.avatar ? `${API_HOST}/mostrarAvatr?id=${friendInfo.id}` : NotFound}
                alt="none"
                >
            </Image>
            <Media.Body>
                <h5>
                    {friend.nombre} {friend.apellidos}
                </h5>
                <p>{friendInfo?.biografia}</p>
            </Media.Body>
        </Media>
    )
}
