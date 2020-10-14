import React,{useState,useEffect} from 'react'
import {Image} from 'react-bootstrap'
import {map} from 'lodash'
import {getUserApi} from '../../../api/user'
import {replaceURLWithHTMLLinks} from '../../../utils/functions'
import {API_HOST} from '../../../utils/constants'
import NotFound from '../../../assets/no-image.jpg'
import "./PublicationList.scss"
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faThumbsUp,faCommentAlt} from '@fortawesome/free-solid-svg-icons'
import {CopyBlock,dracula} from 'react-code-blocks'

export default function List(props) {
    const {publications} = props
    return (
        <div className="publication-list">
            {map(publications,(publication,index) =>(
                <Publication key={index} publication={publication}/>
            ))}
        </div>
    )
}
function Publication(props){
    const {publication} = props
    const [userInfo, setUserInfo] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(null)
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
                <span className="date">{moment(publication.fechaPublicacion).calendar()}</span>
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
               <span className="comments">
                   <FontAwesomeIcon icon={faCommentAlt} />
                   <span className="count">140</span>
               </span>
            </div>
        </div>
    </div>)
}
