import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = ({user, setLoggedIn}) => {
    const {state,dispatch} = useContext(AuthContext);
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState(""); 
    const [email, setEmail] = useState("");  
    const [phoneNumber, setPhoneNumber] = useState("");  
    const [password, setPassword] = useState("");  
    const [confirmPassword, setConfirmPassword] = useState("");  
    const [errors, setErrors] = useState({});
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        console.log("current state")
        console.log(state)
        user && navigate('/')
    },[user])
    
    const handleRegister = (e) => {
        e.preventDefault();
       
        axios.post('http://localhost:8000/api/register/', {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            confirmPassword
        }, {withCredentials:true})
            .then(res=>{
                dispatch({
                type:"SET_USER",
                payload:res.data
                })
                setLoggedIn(true)
                console.log(res);
                console.log(res.data);
                console.log("updated current state")
                console.log(state)
                navigate("/bookAppointment");
            })
            .catch((err) => {
                setErrors(err.response.data.error.errors);
                console.log(err.response.data.error.errors);
            })
    ;
    }

    return (
    <div>
        <div className='flex justify-evenly w-full m-5 h-max'>
            <div>
                <h1 className=' text-4xl p-4'>Register</h1>
                <form onSubmit={handleRegister} className='px-4 rounded mx-auto max-w-3xl w-full inputs space-y-6'>
                    <div className='grid grid-cols-1 items-center gap-4 py-2'>
                        <div className='grid grid-cols-2 items-center'>
                            <label>First Name:</label>
                            <input className="rounded w-full" type="text" name="firstName" id="firstName" onChange = {(e)=>setFirstName(e.target.value)}/>
                            {errors.firstName ? <p className=' text-orange'>{errors.firstName.message}</p> : null}
                        </div>
                        <div className='grid grid-cols-2 items-center'>
                            <label>Last Name:</label>
                            <input className="rounded w-full" type="text" name="lastName" id="lastName" onChange = {(e)=>setLastName(e.target.value)}/>
                            {errors.lastName ? <p className=' text-orange'>{errors.lastName.message}</p> : null}
                        </div>
                        <div className='grid grid-cols-2 items-center'>
                            <label>Email:</label>
                            <input className="rounded w-full" type="email" name="email" onChange = {(e)=>setEmail(e.target.value)}/>
                            {errors.email ? <p className=' text-orange'>{errors.email.message}</p> : null}
                            {error ? <p className=' text-orange'>{error}</p> : null}
                        </div>
                        <div className='grid grid-cols-2 items-center'>
                            <label>Phone Number:</label>
                            <input className="rounded w-full" type="tel" id="phone" name="phone" placeholder="123-453-6780" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange = {(e)=>setPhoneNumber(e.target.value)}/>
                            {errors.phoneNumber ? <p className=' text-orange'>{errors.phoneNumber.message}</p> : null}
                        </div>
                        <div className='grid grid-cols-2 items-center'>
                            <label>Password:</label>
                            <input className="rounded w-full" type="password" name="password" onChange = {(e)=>setPassword(e.target.value)}/>
                            {errors.password ? <p className=' text-orange'>{errors.password.message}</p> : null}
                        </div>
                        <div className='grid grid-cols-2 items-center'>
                            <label>Confirm Password:</label>
                            <input className="rounded w-full" type="password" name="confirmPassword" id="confirmPassword" onChange = {(e)=>setConfirmPassword(e.target.value)}/>
                            {errors.confirmPassword ? <p className=' text-orange'>{errors.confirmPassword.message}</p> : null}
                        </div>
                        
                    </div>
                    <input className=' form-input px-4 py-2 rounded-lg hover:bg-blue hover:text-white' value={"Register"} type="submit"/>
                </form>
            </div>
        </div>
    </div>
    )
}
export default Register;
