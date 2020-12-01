import React,{useState,useEffect} from 'react'
import {map} from 'lodash'
import Comment from '../Comment'
export default function PublicationComments(props) {
    const {comments} = props
    return (
        <div>
            {
                map(comments,(comment,index)=>(
                    <Comment key={index} comment={comment} />
                ))
            }
        </div>
    )
}
