import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Solid from "@fortawesome/free-solid-svg-icons";
import * as Regular from "@fortawesome/free-regular-svg-icons";
import './ReactionComment.scss';
import * as Comment from '../../../api/comment';

export default function ReactionComment(props) {
    const { reactions,setRefreshComment, id } = props;
    const [likes, setLikes] = useState([]);
    const [userLike, setUserLike] = useState([]);
    const [dislikes, setDislikes] = useState([]);
    const [userDislike, setUserDislike] = useState([]);
    const [reaction, setReaction] = useState(0)
    const user = useAuth()
    useEffect(() => {
        setLikes(reactions.filter((react) => react.reactcomment === "1"));
        setDislikes(reactions.filter((react) => react.reactcomment === "2"));
        setUserDislike(reactions.filter((react) => react.userId === user._id && react.reactcomment === "2"));
        setUserLike(reactions.filter((react) => react.userId === user._id && react.reactcomment === "1"));
    }, [props,user,reactions]);
    if(userLike.length >  0 || userDislike.length > 0) {
        console.log("Aqui se podra editar la reaccion de 1 a 2 o de 2 a 1")
    }else{
        if(reaction!==0){
            Comment.addReactionComment(id,reaction).then(() => {
            console.log("exito")
            setReaction(0)
            setRefreshComment(true)
        }).catch(()=> {
            console.log("error")
        })
        }
    }
    const deleteReaction = ()=> {
        console.log(likes)
        // Comment.deleteReactionComment(id).then(response=>{
        //     console.log("se Elimino la reacion")
        //     setRefreshComment(true)
        // }).catch(()=>{
        //     console.log("error en el codigo weon qliao")
        // })
    }
    return (
        <div className="reaction-section">
            {userLike.length > 0 ? (
                <p className="like" onClick={deleteReaction}>
                    <FontAwesomeIcon
                        className="solid-like"
                        icon={Solid.faThumbsUp}
                    ></FontAwesomeIcon>
                    {likes.length > 0 ? <span>{likes.length}</span> : ""}
                </p>
            ) : (
                    <p className="no-like" onClick={() => setReaction(1)}>
                        <FontAwesomeIcon
                            className="regular-like"
                            icon={Regular.faThumbsUp}
                        ></FontAwesomeIcon>
                        {likes.length > 0 ? <span>{likes.length}</span> : ""}
                    </p>
                )}
                {userDislike.length > 0 ? (
                <p className="dislike" onClick={deleteReaction}>
                    <FontAwesomeIcon
                        className="solid-dislike"
                        icon={Solid.faThumbsDown}
                    ></FontAwesomeIcon>
                    {dislikes.length > 0 ? <span>{dislikes.length}</span> : ""}
                </p>
            ) : (
                    <p className="no-dislike" onClick={() => setReaction(2)}>
                        <FontAwesomeIcon
                            className="regular-dislike"
                            icon={Regular.faThumbsDown}
                        ></FontAwesomeIcon>
                        {dislikes.length > 0 ? <span>{dislikes.length}</span> : ""}
                    </p>
                )}
        </div>
    );
}
