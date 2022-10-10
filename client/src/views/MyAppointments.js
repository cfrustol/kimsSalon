import React, { useState } from 'react'
import UserAppointments from '../components/UserAppointments';
import NavBar from '../components/NavBar';


const MyAppointments = () => {
    
    const [appointments, setAppointments] = useState([]);
    const [errors, setErrors] = useState([]); 
    const removeFromDom = appointmentId => {
        setAppointments(appointments.filter(appointment => appointment._id !== appointmentId)); 
    }
    return (
        <div>
            <NavBar/>
            <UserAppointments appointments={appointments} setAppointments={setAppointments} errors={errors} setErrors={setErrors} removeFromDom={removeFromDom} />    
        </div>
    )
}
export default MyAppointments;