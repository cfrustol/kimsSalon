import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = ({setLoggedIn}) => {
    const {state,dispatch} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        console.log("current state")
        console.log(state)
        state.user && navigate('/myAppointments')
    },[state.user])

    const login = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login/', {
            email,
            password,
        }, {withCredentials:true})
            .then(res => {
                
                dispatch({
                type:"SET_USER",
                payload:res.data
                })
            
                setLoggedIn(true)
                console.log("updated current state")
                console.log(state)
                navigate('/myAppointments')
                })

            .catch((err) => {
                console.log(err.response);
                setErrors(err.response.data.error);
      });
    }

    return (
    <div>
        <div className='flex justify-evenly w-full m-5 h-max'>
            <div>
                <h1 className=' text-4xl p-4'>Login</h1>
                <form onSubmit={login} className='px-4 rounded mx-auto max-w-3xl w-full inputs space-y-6'>
                    <div className='grid grid-cols-1 items-center gap-4 py-2'>
                        <div className='grid grid-cols-2 items-center'>
                            <label>Email:</label>
                            <input className="rounded w-full" type="email" name="email" onChange = {(e)=>setEmail(e.target.value)}/>
                            {errors ? <p className=' text-orange'>{errors}</p> : null}
                        </div>
                        <div className='grid grid-cols-2 items-center'>
                            <label>Password:</label>
                            <input className="rounded w-full" type="password" name="password" onChange = {(e)=>setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <input className=' form-input px-4 py-2 rounded-lg hover:bg-blue hover:text-white' value={"Login"} type="submit"/>
                </form>
            </div>
        </div>
    </div>
    )
}
export default Login;
