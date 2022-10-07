import React, { useState } from 'react'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import NavBar from './NavBar';

const BookAppointment = () => {
    const [service, setService] = useState(""); 
    const [day, setDay] = useState(""); 
    const [time, setTime] = useState("");  
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/appointments/', {
            service,
            day,
            time,
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
        <NavBar></NavBar>
        <h1>Book Appointment</h1>
        <Link to="/">back to home</Link>
        <form onSubmit={onSubmitHandler}>
            <div>
                <div>
                    <label>Service:</label>
                    <select name="service" id="service" onChange = {(e)=>setService(e.target.value)}>
                        <option value="manicure">Manicure</option>
                        <option value="pedicure">Pedicure</option>
                        <option value="gel">Gel</option>
                    </select>
                    {errors.service ? <p>{errors.service.message}</p> : null}
                </div>
                <div>
                    <label>Day:</label>
                    <select name="day" id="day" onChange = {(e)=>setDay(e.target.value)}>
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
                    <select name="time" id="time" onChange = {(e)=>setTime(e.target.value)}>
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
export default BookAppointment;
