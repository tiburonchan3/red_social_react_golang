import React from 'react'
import './Home.scss'
import BasicLayout from '../../layouts/BasicLayout'

export default function Home(props) {
    const {setRefreshCheckLogin} = props
    return (
        <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
            <h3>Estamos en home</h3>
        </BasicLayout>
    )
}
