import React,{useState,useEffect} from 'react';
import SingInSingUp from './pages/SingInSingUp';
import {ToastContainer} from 'react-toastify'
import {authContext} from './utils/context';
import {isUserLoggedApi} from './api/auth'
import Routing from './routes/routing';


export default function App() {
    const [user,setUser] = useState(null);
    const [loadUser,setLoadUser] = useState(false);
    const [refreshCheckLogin,setRefreshCheckLogin] = useState(false)
    useEffect(() => {
      setUser(isUserLoggedApi())
      setRefreshCheckLogin(false)
      setLoadUser(true)
    }, [refreshCheckLogin])
    if(!loadUser) return null
    return(
        <authContext.Provider value={user}>
            {user ?(
                <Routing setRefreshCheckLogin={setRefreshCheckLogin}/>
            ) : (
                <div>
                    <SingInSingUp  setRefreshCheckLogin={setRefreshCheckLogin}/>
                </div>
            )}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
        </authContext.Provider>
    );
}

