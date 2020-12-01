import React from 'react'
import {CopyBlock,dracula} from 'react-code-blocks'
import './PublicationInfo.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as Solid from '@fortawesome/free-solid-svg-icons'
import * as Regular from '@fortawesome/free-regular-svg-icons'

export default function PublicationInfo(props) {
    const {pub,comments} = props
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
                   <FontAwesomeIcon icon={Regular.faHeart} />
                    <span className="count">1</span>
               </span>
                {
                    comments && (
                        <span  className="comments">
                            <FontAwesomeIcon icon={Solid.faCommentAlt} />
                            <span className="count">{comments.length}</span>
                        </span>
                    )
                }
                <div className="hr"/>
                </div>
            </div>
       </>
    )
}
