import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';


const RegisterLogin = () => {
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState(""); 
    const [email, setEmail] = useState("");  
    const [phoneNumber, setPhoneNumber] = useState("");  
    const [password, setPassword] = useState("");  
    const [confirmPassword, setConfirmPassword] = useState("");  
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const {register, error, isLoading} = useRegister()
    
    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     // await register(email, password)
    // }
    // const handleSubmit2 = async (e) => {
    //     e.preventDefault()
    //     console.log(email, password)
    // }

    
    const handleRegister = (e) => {
        e.preventDefault();
       
        console.log(email, password)
        axios.post('http://localhost:8000/api/register/', {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            confirmPassword
        })
            .then(res=>{
                console.log(res);
                console.log(res.data);
                navigate("/bookAppointment");
            })
            .catch((err) => {
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors);
      });
    }
    const login = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login/', {
            email,
            password,
        })
            .then(res=>{
                console.log(res);
                console.log(res.data);
                navigate("/myAppointments");
            })
            .catch((err) => {
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors);
      });
    }

    return (
    <div>
        <div className="flex justify-evenly items-center h-32 bg-blue text-white text-xl">
                <h1 className="text-5xl">Kim's Salon</h1>
                <div>
                    <h3>Hours</h3>
                    <p>Sunday: Closed</p>
                    <p>Mon-Sat: 9a - 7p</p>
                </div>
            </div>
        <div className='flex justify-evenly w-full m-5 h-max'>
            <div>
                <h1 className=' text-4xl p-4'>Register</h1>
                <form onSubmit={handleRegister} className='px-4 rounded mx-auto max-w-3xl w-full inputs space-y-6'>
                    <div className='grid grid-cols-1 items-center gap-4 py-2'>
                        <div className='grid grid-cols-2 items-center'>
                            <label>First Name:</label>
                            <input class="rounded w-full" type="text" name="firstName" id="firstName" onChange = {(e)=>setFirstName(e.target.value)}/>
                            {errors.firstName ? <p>{errors.firstName.message}</p> : null}
                        </div>
                        <div className='grid grid-cols-2 items-center'>
                            <label>Last Name:</label>
                            <input class="rounded w-full" type="text" name="lastName" id="lastName" onChange = {(e)=>setLastName(e.target.value)}/>
                            {errors.lastName ? <p>{errors.lastName.message}</p> : null}
                        </div>
                        <div className='grid grid-cols-2 items-center'>
                            <label>Email:</label>
                            <input class="rounded w-full" type="email" name="email" id="email" onChange = {(e)=>setEmail(e.target.value)}/>
                            {errors.email ? <p>{errors.email.message}</p> : null}
                        </div>
                        <div className='grid grid-cols-2 items-center'>
                            <label>Phone Number:</label>
                            <input class="rounded w-full" type="text" name="phoneNumber" id="phoneNumber" onChange = {(e)=>setPhoneNumber(e.target.value)}/>
                            {errors.phoneNumber ? <p>{errors.phoneNumber.message}</p> : null}
                        </div>
                        <div className='grid grid-cols-2 items-center'>
                            <label>Password:</label>
                            <input class="rounded w-full" type="password" name="password" id="password" onChange = {(e)=>setPassword(e.target.value)}/>
                            {errors.password ? <p>{errors.password.message}</p> : null}
                        </div>
                        <div className='grid grid-cols-2 items-center'>
                            <label>Confirm Password:</label>
                            <input class="rounded w-full" type="password" name="confirmPassword" id="confirmPassword" onChange = {(e)=>setConfirmPassword(e.target.value)}/>
                            {errors.confirmPassword ? <p>{errors.confirmPassword.message}</p> : null}
                        </div>
                        
                    </div>
                    <input disabled={isLoading} className=' form-input px-4 py-2 rounded-lg hover:bg-blue hover:text-white' value={"Register"} type="submit"/>
                    {error && <div>{error}</div>}
                </form>
            </div>
            <div>
                <h1 className=' text-4xl p-4'>Login</h1>
                <form onSubmit={login} className='px-4 rounded mx-auto max-w-3xl w-full inputs space-y-6'>
                    <div className='grid grid-cols-1 items-center gap-4 py-2'>
                        <div className='grid grid-cols-2 items-center'>
                            <label>Email:</label>
                            <input class="rounded w-full" type="email" name="email" id="email" onChange = {(e)=>setEmail(e.target.value)}/>
                            {errors.email ? <p>{errors.email.message}</p> : null}
                        </div>
                        <div className='grid grid-cols-2 items-center'>
                            <label>Password:</label>
                            <input class="rounded w-full" type="password" name="password" id="password" onChange = {(e)=>setPassword(e.target.value)}/>
                            {errors.password ? <p>{errors.password.message}</p> : null}
                        </div>
                    </div>
                    <input className=' form-input px-4 py-2 rounded-lg hover:bg-blue hover:text-white' value={"Login"} type="submit"/>
                </form>
            </div>
        </div>
    </div>
    )
}
export default RegisterLogin;
