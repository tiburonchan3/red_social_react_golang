import React,{useState,useEffect} from 'react'
import {Image,Media, Popover} from 'react-bootstrap'
import {map} from 'lodash'
import {getUserApi} from '../../../api/user'
import {replaceURLWithHTMLLinks} from '../../../utils/functions'
import {API_HOST} from '../../../utils/constants'
import NotFound from '../../../assets/no-image.jpg'
import "./PublicationList.scss"
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faThumbsUp,faCommentAlt,faEllipsisH} from '@fortawesome/free-solid-svg-icons'
import {CopyBlock,dracula} from 'react-code-blocks'
import {Link} from 'react-router-dom'
import PopOver from '../../Publication/PopOver'

export default function List(props) {
    const {publications,setRefreshPublication} = props
    console.log(publications)
    return (
        <div className="publication-list">
            {map(publications,(publication,index) =>(
                <Publication key={index} publication={publication} setRefreshPublication={setRefreshPublication}/>
            ))}
        </div>
    )
}
function Publication(props){

    const {publication,loggedUser,setRefreshPublication} = props
    const [userInfo, setUserInfo] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(null)
    const isUserPublication = ()=>{
        if(loggedUser._id === publication.userid){
            return true
        } else {
            return false
        }
    }
    const [pop, setPop] = useState(false)
    const [target, setTarget] = useState(null);
    const ShowPop = (e)=>{
        setPop(!pop);
        setTarget(e.target)
    }
    useEffect(() => {
       getUserApi(publication.userid).then((response)=>{
           setUserInfo(response)
           setAvatarUrl(
               response?.avatar
               ? `${API_HOST}/mostrarAvatr?id=${publication.userid}`
               : NotFound
            )
       }).catch((err)=>{
           alert("error")
       })
    }, [publication])

    return (<div className="publication">
        <Image className="avatar" src={avatarUrl} roundedCircle/>
        <div>
            <div className="name">
                {userInfo?.nombre} {userInfo?.apellidos}
                <span className="date">{moment(publication.fecha).calendar()}</span>
                {isUserPublication ?
                    <span className="more-options" onClick={ShowPop}>
                        <FontAwesomeIcon icon={faEllipsisH}/>
                    </span> :
                    null
                }
            </div>
            <div
                className="link"
                dangerouslySetInnerHTML={{__html:replaceURLWithHTMLLinks(publication.publicacion)}}
            />
            <div>
            <div className="lang">
                <span>#{publication.tecnologias}</span>
            </div>
            <CopyBlock
                text={publication.code}
                language={publication.tecnologias}
                showLineNumbers={true}
                theme={dracula}
                wrapLines
            />
            </div>
            <div className="options">
               <span className="like">
                   <FontAwesomeIcon icon={faThumbsUp} />
                    <span className="count">140</span>
               </span>
               <Media as={Link} to={`/u/${publication.userid}/${publication._id}`}>
               <span  className="comments">
                    <FontAwesomeIcon icon={faCommentAlt} />
                    <span className="count">140</span>
                </span>
               </Media>

            </div>
            <PopOver setRefreshPublication={setRefreshPublication} id={publication._id} setPop={setPop} pop={pop} target={target}></PopOver>
        </div>
    </div>)
}
