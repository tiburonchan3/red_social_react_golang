import React,{useEffect,useState} from 'react'
import Layout from '../../layouts/BasicLayout'
import {withRouter} from 'react-router-dom'
import {GetPublication} from '../../api/publication'
import {getUserApi} from '../../api/user'
import UserPublication from '../../components/Publication/UserPublication'
import PublicationInfo from '../../components/Publication/PublicationInfo'
import PublicationForm from '../../components/Publication/PublicationForm'
import NotFound from '../../assets/no-image.jpg'
import {API_HOST} from '../../utils/constants'
import {map} from 'lodash'

function Publication(props) {
    const {match} = props
    const {params} = match
    const [user, setUser] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [publication, setPublication] = useState(null)
    useEffect(() => {
        getUserApi(params.uid).then(response => {
            setUser(response)
            setAvatarUrl(
                response?.avatar
                ? `${API_HOST}/mostrarAvatr?id=${response.id}`
                : NotFound
             )
        })
        GetPublication(params.pid).then(response => {
            setPublication(response)
        })
    }, [params])
    return (
        <Layout>
            <div>
                {map(publication,(pub,index) =>(
                    <div key={index}>
                        <UserPublication pub={pub} avatarUrl={avatarUrl} user={user}/>
                        <PublicationInfo pub={pub}/>
                    </div>
                ))}
                <PublicationForm id={params.pid}/>
            </div>

        </Layout>
    )
}
export default withRouter(Publication)
