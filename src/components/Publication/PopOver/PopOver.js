import React from 'react'
import {Popover,Overlay,Button} from 'react-bootstrap'
import './PopOver.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'
import {DeletePublication} from '../../../api/publication'
import {toast} from 'react-toastify'

export default function PopOver(props) {
    const {pop,target,setPop,id,setRefreshPublication} = props
    const Delete = ()=>{
        DeletePublication(id).then(response=>{
            if(response.ok === true){
                setPop(false)
                toast.success("Se elimino la publicacion")
                setRefreshPublication(true)
            } else {
                toast.warning("No se pudo eliminar")
            }
        }).catch(()=>{
           console.log("error")
        })
    }
    return (
       <Overlay onHide={()=>setPop(!pop)} show={pop} placement="left" target={target}>
           <Popover id="popover-contained">
                <Popover.Title as="h3">Opciones</Popover.Title>
                <Popover.Content>
                    <div className="buttons">
                        <Button onClick={Delete}>
                            <span>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            Eliminar
                        </Button>
                        <Button>
                            <span>
                                <FontAwesomeIcon icon={faEdit} />
                            </span>
                            Editar
                        </Button>
                    </div>
                </Popover.Content>
            </Popover>
       </Overlay>
    )
}
