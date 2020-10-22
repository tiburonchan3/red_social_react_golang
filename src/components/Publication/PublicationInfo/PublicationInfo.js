import React from 'react'
import {CopyBlock,dracula} from 'react-code-blocks'
import './PublicationInfo.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faThumbsUp,faCommentAlt} from '@fortawesome/free-solid-svg-icons'

export default function PublicationInfo(props) {
    const {pub} = props
    return (
        <>
            <div className="publication">
                <p className="publication__txt">
                    {pub.publicacion}
                </p>
                <span className="publication__tnlg">
                    #{pub.tecnologias}
                </span>
                <div className="publication__code">
                <CopyBlock
                text={pub.code}
                language={pub.tecnologias}
                showLineNumbers={true}
                theme={dracula}
                wrapLines
            />
                </div>
                <div className="publication__like-comment">
                <span className="like">
                   <FontAwesomeIcon icon={faThumbsUp} />
                    <span className="count">140</span>
               </span>
               <span  className="comments">
                    <FontAwesomeIcon icon={faCommentAlt} />
                    <span className="count">140</span>
                </span>
                <div className="hr"/>
                </div>
            </div>
       </>
    )
}
