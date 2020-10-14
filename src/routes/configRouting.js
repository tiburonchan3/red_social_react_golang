import Home from '../pages/Home'
import User from '../pages/User'
import Error404 from '../pages/Error404'
import Friends from '../pages/Friends'

export default[
    {
        path: "/friends",
        exact: true,
        page: Friends
    },
    {
        path: "/:id",
        exact: true,
        page: User
    },
    {
        path:"/",
        exact: true,
        page: Home
    },
    {
        path: "*",
        page: Error404
    }
]
