import React,{useState,useCallback} from 'react'
import {Form,Button,Row,Col, Spinner} from 'react-bootstrap'
import './EditUserForm.scss'
import DatePicker from 'react-datepicker'
import es from 'date-fns/locale/es'
import {useDropzone} from 'react-dropzone'
import {API_HOST} from '../../../utils/constants'
import {uploadBannerApi,uploadAvatarApi,UpdateProfileApi} from '../../../api/user'
import {toast} from 'react-toastify'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faImages,faEdit} from '@fortawesome/free-solid-svg-icons'
import { getTokenApi } from '../../../api/auth'
import jwt from 'jwt-decode'


export default function EditUserForm(props) {
    const userToken = jwt(getTokenApi())
    console.log(userToken)
    const {user,setModalShow} = props
    const [formData, setFormData] = useState(initialValue(user))
    const [bannerUrl, setBannerUrl] = useState(
        user?.banner ? `${API_HOST}/mostrarBanner?id=${user.id}` : null
    )
    const [spinner, setSpinner] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState(
        user?.banner ? `${API_HOST}/mostrarAvatr?id=${user.id}` : null
    )
    const [bannerFile, setBannerFile] = useState(null)
    const [avatarFile, setAvatarFile] = useState(null)
    const onChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value })
    }
    const Submit = async (e)=>{
        e.preventDefault()
        setSpinner(true)
        if(bannerFile){
            await uploadBannerApi(bannerFile).catch(()=>{
                toast.error("error al subir banner")
            })
        }
        if(avatarFile){
            await uploadAvatarApi(avatarFile).catch(()=>{
                toast.error("error al subir avatar")
            })
        }
        await UpdateProfileApi(formData)
        .then(()=>{
            setModalShow(false)
            toast.success("la imformacion de actualizo")
        }).catch( ()=>{
            toast.error("error al actualiza informacion")
        })
        setSpinner(false)
        window.location.reload()
    }
    const onDropBanner = useCallback(acceptedFile =>{
        const file = acceptedFile[0]
        setBannerUrl(URL.createObjectURL(file))
        setBannerFile(file)
        console.log(acceptedFile)
    })
    const {
        getRootProps: getRootBannerProps,
        getInputProps: getInputBannerProps
    } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple:false,
        onDrop: onDropBanner
    })
    const onDropAvatar = useCallback(acceptedFile =>{
        const file = acceptedFile[0]
        setAvatarUrl(URL.createObjectURL(file))
        setAvatarFile(file)
        console.log(acceptedFile)
    })
    const {
        getRootProps: getRootAvatarProps,
        getInputProps: getInputAvatarProps
    } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple:false,
        onDrop: onDropAvatar
    })
    return (
        <div className="edit-user-form">
            <div
                className="banner"
                style={({backgroundImage:`url('${bannerUrl}')`})}
                {...getRootBannerProps()}
            >
                <div className="mask">
                    <span><FontAwesomeIcon icon={faImages}/></span>
                <input
                        {...getInputBannerProps()}
                    />
                </div>
            </div>
            <div
                className="avatar"
                style={({backgroundImage:`url('${avatarUrl}')`})}
                {...getRootAvatarProps()}
            >
              <div className="mask">
                    <div className="mask">
                        <img src={Image} alt=""/>
                        <input
                            {...getInputAvatarProps()}
                        />
                    </div>
              </div>
            </div>
            <Form onSubmit={Submit}>
                <Row>
                    <Col xs={6}>
                        <label htmlFor="nombre" className="label">Nombre</label>
                        <Form.Control
                            type="text"
                            placeholder="nombre"
                            name="nombre"
                            defaultValue={formData.nombre}
                            onChange={onChange}>
                        </Form.Control>
                    </Col>
                    <Col xs={6}>
                        <label htmlFor="apellidos" className="label">Apellidos</label>
                        <Form.Control
                            type="text"
                            placeholder="apellidos"
                            name="apellidos"
                            defaultValue={formData.apellidos}
                            onChange={onChange}>
                        </Form.Control>
                    </Col>
                </Row>
                <Form.Group>
                    <label htmlFor="biografia" className="label">Biografia</label>
                    <Form.Control
                        as="textarea"
                        row="3"
                        placeholder="agrega tu biografia"
                        name="biografia"
                        defaultValue={formData.biografia}
                        onChange={onChange}
                        className="area"
                        >
                    </Form.Control>
                </Form.Group>
                <Row>
                    <Col xs={6}>
                        <label htmlFor="sitioWeb" className="label">Sitio Web</label>
                        <Form.Control
                            type="text"
                            placeholder="sitio web"
                            name="sitioWeb"
                            defaultValue={formData.SitioWeb}
                            onChange={onChange}>
                        </Form.Control>
                    </Col>
                    <Col xs={6}>
                        <label htmlFor="fechaN" className="label">Fecha de nacimineto</label>
                        <DatePicker
                            placeholderText="Fecha de nacimiento"
                            name="fechaN"
                            locale={es}
                            selected={new Date(formData.fechaN)}
                            onChange={value => setFormData({...formData,fechaN:value})}>
                        </DatePicker>
                    </Col>
                </Row>
                <Form.Group>
                <label htmlFor="ubicacion" className="label">Ubicacion</label>
                        <Form.Control
                            type="text"
                            placeholder="sitio web"
                            name="ubicacion"
                            defaultValue={formData.ubicacion}
                            onChange={onChange}>
                        </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" className="btn-submit">
                    {spinner ? <Spinner animation="border" size="sm"></Spinner> :
                                <span>
                                    <FontAwesomeIcon icon={faEdit}/>
                                    Actualizar
                                </span>
                    }
                </Button>
            </Form>
        </div>
    )
}
function initialValue(user){
    return{
        nombre : user.nombre || "",
        apellidos : user.apellidos || "",
        biografia : user.biografia || "",
        SitioWeb : user.SitioWeb || "",
        fechaN : user.fechaN || "",
        ubicacion: user.ubicacion || ""
    }
}
