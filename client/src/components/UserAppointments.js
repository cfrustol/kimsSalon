import React, {useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';



const UserAppointments = (props) => {

    const { appointments, setAppointments} = props;
    const {id} = useParams(); 

    const { removeFromDom } = props;
    const deleteAppointment = (appointmentId) => {
        axios.delete('http://localhost:8000/api/appointments/' + appointmentId)
            .then(res => {
                removeFromDom(appointmentId)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/appointments")
            .then( res => {
                console.log(res.data);
                setAppointments(res.data);
            })
            .catch( err => console.log(err) )
    }, [id])
    
    
    
    return ( 
        <div className=' h-max m-5'>
            <h1 className=' text-4xl p-4'>My Appointments</h1>
            <h3 className=' text-2xl p-4'>Upcoming Appointments</h3>
            <div className=' grid grid-cols-3 gap-4 w-max '>
            {
                appointments.map((appointment, index)=>{
                return (
                    <div key={index}>    
                        <div className='border-4 rounded-lg border-blue bg-off-white shadow hover:shadow-lg w-max p-4 space-y-4'>
                            <p>Service: {appointment.service}</p>
                            <p>Day: {appointment.day}</p>
                            {/* <p>Day: {appointment.day.toDateString()}</p> */}
                            <p>Time: {appointment.time}</p>   
                            <Link to={"/appointments/edit/" + appointment._id}><button className=' p-2 rounded-md bg-gray-dark text-white hover:text-blue'>Modify Appointment</button></Link>
                            <span className='text-xl'> </span>
                            <button onClick={(e)=>{deleteAppointment(appointment._id)}} className= ' p-2 rounded-md bg-gray-dark text-white hover:text-orange'>Cancel Appointment</button>
                        </div>
                    </div> 
                )})
            }
            </div> 
        </div>
    )
}
export default UserAppointments;

