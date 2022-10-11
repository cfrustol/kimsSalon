import React from 'react'
import Register from '../components/Register';
import Login from '../components/Login';

const RegisterLogin = () => {
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
            <div className='flex justify-center'>
                <Register />
                <Login />
            </div>
        </div>
    )
}
export default RegisterLogin;