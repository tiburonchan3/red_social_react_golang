import React,{useState} from 'react'
import './BasicLayout.scss'
import {Container,Row,Col} from 'react-bootstrap'
import LeftMenu from '../../components/LeftMenu'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'

export default function BasicLayout(props) {
    const {className,setRefreshCheckLogin,children} = props
    const [visible, setVisible] = useState('')
    return (
        <Container className={`basic-layout ${className} themed-container`} fluid={true}>
            <Row>
                <Col xs={3} className={`basic-layout__menu ${visible}`} >
                    <LeftMenu setVisible={setVisible} setRefreshCheckLogin={setRefreshCheckLogin}/>
                </Col>
                <Col xs={9} className="basic-layout__content">
                    {children}
                </Col>
                <button className="bars" onClick={()=>setVisible('visible')}>
                    <span><FontAwesomeIcon icon={faBars}/></span>
                </button>
            </Row>
        </Container>
    )
}
