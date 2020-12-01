import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import './PublicationForm.scss'
import {createComment} from '../../../api/comment'
import {toast} from 'react-toastify'

export default function PublicationForm(props) {
    const [comentario, setComentario] = useState(initial)
    const {id,setRefreshComments} = props
    const Submit = (e)=>{
        e.preventDefault()
        if(comentario.comentario !== ''){
            createComment(id,comentario).then(() => {
               toast.success("se añadio el comentario")
               setComentario(initial)
               setRefreshComments(true)
            }).catch(err =>{
                console.log(err)
            })
        }else{
            toast.warning("Agrega el comentario")
        }
    }
    const Change = e => {
        setComentario({...comentario,[e.target.name]: e.target.value})
    }

        return (
        <Form onChange={Change} onSubmit={Submit}>
            <div className="comment-form">
                <Form.Group>
                    <Form.Control defaultValue={comentario.comentario} type="text" name="comentario"/>
                </Form.Group>
                <Button type="submit">Comentar</Button>
            </div>
        </Form>
    )
}
function initial(){
    return {
        comentario: ""
    }
}
