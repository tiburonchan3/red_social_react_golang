import React,{useState,useEffect} from 'react'
import * as User from '../../../api/user'
import {API_HOST} from '../../../utils/constants'
import NotFound from '../../../assets/no-image.jpg'
import './Comment.scss'
import moment from 'moment'
import {getReactionsComment} from '../../../api/comment'
import ReactionComment from '../ReactionComment'

export default function Comment(props) {
    const {comment} = props
    const [userInfo, setUserInfo] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [reactions, setReactions] = useState([])
    const [refreshComment, setRefreshComment] = useState(false)
    useEffect(() => {
        User.getUserApi(comment.userid).then(response=>{
            setUserInfo(response)
        })
        getReactionsComment(comment.id).then(response=>{
            setReactions(response || [])
        }).catch(()=>{
            console.log("error en el codigo")
        })
    }, [comment,refreshComment])
    useEffect(() => {
        setAvatarUrl(
            userInfo?.avatar
            ? `${API_HOST}/mostrarAvatr?id=${userInfo.id}`
            : NotFound
         )
    }, [userInfo])
    return (
        <div className="comment_content">
        <div className="comment">
            <div className="comment__user-info">
                <img src={avatarUrl} alt="none"/>
                <div className="user-name">{userInfo?.nombre} {userInfo?.apellidos}</div>
                <span className="fecha_comment">{moment(comment.fechacomentario).calendar()}</span>
            </div>
            <div className="comment__comment-body">
                <span>
                    {comment.comentario}
                </span>
            </div>
        </div>
        <div className="reactions">
            <ReactionComment id={comment.id} setRefreshComment={setRefreshComment} reactions={reactions}/>
        </div>
        <div className="hr"/>
        </div>
    )
}
