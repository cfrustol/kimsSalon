import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link, useNavigate, useParams} from "react-router-dom";


const Update = (props) => {
    const {id} = useParams(); 
    const [service, setService] = useState();
    const [day, setDay] = useState(); 
    const [time, setTime] = useState(); 
    const [errors, setErrors] = useState({});
    const [appointmentNotFoundError, setAppointmentNotFoundError] = useState("");
    const navigate = useNavigate();
    console.log(id);
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/appointments/' + id)
            .then(res => {
                setService(res.data.service);
                setDay(res.data.day);
                setTime(res.data.time);
            })
            .catch((err) => {
                console.log(err.response);
                setAppointmentNotFoundError(`Appointment not found using that ID`);
            })
    }, [id])
    const updateAppointment = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/appointments/' + id, {
            service,
            day,
            time,
        })
            .then(res => {
                console.log(res);
                navigate("/myAppointments");
            })
            .catch((err) => {
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors);
            });
    }
    return (
       <div>
            <h1>Modify Appointment</h1>
            <form onSubmit={updateAppointment}>
                {appointmentNotFoundError ? (
                    <h2>
                    {appointmentNotFoundError} <Link to="/bookAppointment">Click here to book a new appointment</Link>
                    </h2>
                ) : null}
                
                <div>
                    <div>
                        <label>Service:</label>
                        <select name="service" id="service" value={service} onChange = {(e)=>setService(e.target.value)}>
                            <option value="manicure">Manicure</option>
                            <option value="pedicure">Pedicure</option>
                            <option value="gel">Gel</option>
                        </select>
                        {errors.service ? <p>{errors.service.message}</p> : null}
                    </div>
                    <div>
                        <label>Day:</label>
                        <select name="day" id="day" value={day} onChange = {(e)=>setDay(e.target.value)}>
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                        </select>
                        {errors.day ? <p>{errors.day.message}</p> : null}
                    </div>
                    <div>
                        <label>Time</label>
                        <select name="time" id="time" value={time} onChange = {(e)=>setTime(e.target.value)}>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                        {errors.time ? <p>{errors.time.message}</p> : null}
                    </div>
                </div>
                <input value={"Book"} type="submit"/>
            </form>
        </div>
    )
}
export default Update;
