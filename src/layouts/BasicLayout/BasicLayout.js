import React from 'react'
import './BasicLayout.scss'
import {Container,Row,Col} from 'react-bootstrap'
import LeftMenu from '../../components/LeftMenu';

export default function BasicLayout(props) {
    const {children} = props
    const {className, setClassName} = props
    return (
        <Container className={`basic-layout ${className} themed-container`} fluid={true}>
            <Row>
                <Col xs={3} className="basic-layout__menu">
                    <LeftMenu/>
                </Col>
                <Col xs={9} className="basic-layout__content">
                    {children}
                </Col>
            </Row>
        </Container>
    )
}
