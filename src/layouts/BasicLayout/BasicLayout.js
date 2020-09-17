import React from 'react'
import './BasicLayout.scss'
import {Container,Row,Col} from 'react-bootstrap'
import LeftMenu from '../../components/LeftMenu';
import {getTokenApi} from '../../api/auth'

export default function BasicLayout(props) {
    console.log(getTokenApi())
    const {className, setClassName,setRefreshCheckLogin,children} = props
    return (
        <Container className={`basic-layout ${className} themed-container`} fluid={true}>
            <Row>
                <Col xs={3} className="basic-layout__menu">
                    <LeftMenu setRefreshCheckLogin={setRefreshCheckLogin}/>
                </Col>
                <Col xs={9} className="basic-layout__content">
                    {children}
                </Col>
            </Row>
        </Container>
    )
}
