import React,{useState,useEffect} from 'react';
import SingInSingUp from './pages/SingInSingUp';
import {ToastContainer} from 'react-toastify'
import {authContext} from './utils/context';
import {isUserLoggedApi} from './api/auth'
// import {API_HOST, TOKEN} from './utils/constants';
// import JwtDecode from 'jwt-decode'


export default function App() {
    const [user,setUser] = useState(null);
    useEffect(() => {
      setUser(isUserLoggedApi())
    }, [])
    return(
        <authContext.Provider value={user}>
            {user ?(
                <div>
                    <h1>Estas loggueado</h1>
                </div>
            ) : (
                <div>
                    <SingInSingUp/>
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

