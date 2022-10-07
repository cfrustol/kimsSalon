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
        <div>
            <h1>My Appointments</h1>
            <h3>Upcoming Appointments</h3>
        
            <table>
            {
                appointments.map((appointment, index)=>{
                return (
                <div key={index}>
                    <thead>
                        <tr>
                            <td>Service</td>
                            <td>Day</td>
                            <td>Time</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                                <td>{appointment.service}</td>
                                <td>{appointment.day}</td>
                                <td>{appointment.time}</td>
                                <td>
                                    <Link to={"/appointments/edit/" + appointment._id}><button>Modify Appointment</button></Link>
                                    <span> | </span>
                                    <button onClick={(e)=>{deleteAppointment(appointment._id)}}>Cancel Appointment</button>
                                </td>
                        </tr>
                    </tbody>
                </div> 
                    )})
                }
            </table>
        </div>
    )
}
export default UserAppointments;

