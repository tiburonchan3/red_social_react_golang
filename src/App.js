import React,{useState} from 'react';
import SingInSingUp from './pages/SingInSingUp';

export default function App() {
    const [user,setUser] = useState(null);
    return(user ? (<h1>no estas loggueado</h1>) : (<SingInSingUp/>) );
}

