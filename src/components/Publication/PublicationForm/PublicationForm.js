import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import './PublicationForm.scss'
import {createComment} from '../../../api/comment'
import {toast} from 'react-toastify'

export default function PublicationForm(props) {
    const [comentario, setComentario] = useState(initial)
    const {id,setRefreshComments} = props
    const Submit = (e)=>{
        setRefreshComments(true)
        e.preventDefault()
        if(comentario.comentario !== ''){
            createComment(id,comentario).then(() => {
                setRefreshComments(false)
               toast.success("se añadio el comentario")
               document.getElementById('comment').value = ""
               document.getElementById('form').reset();
               setComentario('')
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
        <Form id="form" onChange={Change} onSubmit={Submit}>
            <div className="comment-form">
                <Form.Group>
                    <Form.Control placeholder="Escribe un comentario......" id="comment" defaultValue={comentario.comentario} type="text" name="comentario"/>
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
