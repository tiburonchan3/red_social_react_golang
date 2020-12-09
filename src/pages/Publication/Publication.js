import React,{useEffect,useState} from 'react'
import Layout from '../../layouts/BasicLayout'
import {withRouter} from 'react-router-dom'
import {GetPublication} from '../../api/publication'
import {getUserApi} from '../../api/user'
import UserPublication from '../../components/Publication/UserPublication'
import PublicationInfo from '../../components/Publication/PublicationInfo'
import PublicationForm from '../../components/Publication/PublicationForm'
import PublicationComments from '../../components/Publication/PublicationComments'
import NotFound from '../../assets/no-image.jpg'
import {API_HOST} from '../../utils/constants'
import {map} from 'lodash'
import * as Comment from '../../api/comment'

function Publication(props) {
    const {setRefreshCheckLogin,match} = props
    const {params} = match
    const [user, setUser] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [publication, setPublication] = useState(null)
    const [comments, setComments] = useState(null)
    const [refreshComments, setRefreshComments] = useState(false)
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
        Comment.getComments(params.pid).then(response => {
            setComments(response)
        })
    }, [params,refreshComments])
    return (
        <Layout setRefreshCheckLogin={setRefreshCheckLogin}>
            <div>
                {map(publication,(pub,index) =>(
                    <div key={index}>
                        <UserPublication pub={pub} avatarUrl={avatarUrl} user={user}/>
                        <PublicationInfo comments={comments} pub={pub}/>
                    </div>
                ))}
                <PublicationForm setRefreshComments={setRefreshComments} id={params.pid}/>
                <PublicationComments comments={comments}/>
            </div>

        </Layout>
    )
}
export default withRouter(Publication)
