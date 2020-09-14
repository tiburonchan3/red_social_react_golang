import React,{useState} from 'react';
import SingInSingUp from './pages/SingInSingUp';
import {ToastContainer} from 'react-toastify'


export default function App() {
    const [user,setUser] = useState(null);
    return(
        <div>
            {user ?(
                <div>
                    <h1>no estas loggueado</h1>
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
        </div>
    );
}

