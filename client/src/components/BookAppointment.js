import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
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
        <div className='flex flex-col items-center justify-evenly w-full mt-5'>
            <h1 className=' text-4xl p-4'>Book Appointment</h1>
            <form onSubmit={onSubmitHandler} className="space-y-6">
                    <div className='grid grid-cols-3 items-center gap-2'>
                        <label>Service:</label>
                        <select className='px-4 py-2 rounded-lg' name="service" id="service" onChange = {(e)=>setService(e.target.value)}>
                            <option value="">Select</option>
                            <option value="manicure">Manicure</option>
                            <option value="pedicure">Pedicure</option>
                            <option value="gel">Gel</option>
                        </select>
                        {errors.service ? <p className=' text-orange'>{errors.service.message}</p> : null}
                    </div>
                    <div className='grid grid-cols-3 items-center gap-4'>
                        <label>Day:</label>
                        <select className='px-4 py-2 rounded-lg' name="day" id="day" onChange = {(e)=>setDay(e.target.value)}>
                            <option value="">Select</option>
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                        </select>
                        {errors.day ? <p className=' text-orange'>{errors.day.message}</p> : null}
                    </div>
                    <div className='grid grid-cols-3 items-center gap-4'>
                        <label>Time:</label>
                        <select className='px-4 py-2 rounded-lg' name="time" id="time" onChange = {(e)=>setTime(e.target.value)}>
                            <option value="">Select</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                        {errors.time ? <p className=' text-orange'>{errors.time.message}</p> : null}
                    </div>
                <input className=' form-input px-4 py-2 rounded-lg hover:bg-blue hover:text-white' value={"Book"} type="submit"/>
            </form>
        </div>
    </div>
    )
}
export default BookAppointment;
