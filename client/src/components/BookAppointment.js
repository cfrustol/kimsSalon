import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import NavBar from './NavBar';

const BookAppointment = () => {
    const {state} = useContext(AuthContext)
    const [service, setService] = useState(""); 
    const [day, setDay] = useState(""); 
    const [time, setTime] = useState("");  
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    useEffect(()=>{
    console.log("on book appointment add")
    !state.user && navigate('/bookAppointment')
    
  },[])
    
    const handleDateChange = (e) => {
        e.preventDefault();
        let dayPicked = new Date();
        const weekday = dayPicked.getUTCDay();
        if(weekday === 0){
            dayPicked = '';
        }
        setDay(dayPicked)
        console.log(day)
        return dayPicked
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/appointments/', {
            service,
            day,
            time,
            }, {withCredentials:true})
            .then(res=>{
                console.log(res);
                console.log(res.data);
                navigate("/myAppointments");
            })
            .catch((error) => {
                console.log(error.response.data.errors);
                setErrors(error.response.data.errors);
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
                            <option value="Manicure">Manicure</option>
                            <option value="Pedicure">Pedicure</option>
                            <option value="gel">Gel</option>
                        </select>
                        {errors.service ? <p className=' text-orange'>{errors.service.message}</p> : null}
                    </div>
                    <div className='grid grid-cols-3 items-center gap-4'>
                        <label>Day:</label>
                        <select className='px-4 py-2 rounded-lg' name="day" id="day" onChange = {(e)=>setDay(e.target.value)}>
                            <option value="">Select</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                        </select>
                        {/* <input type="date"   onChange={(e)=>setDay(e.target.value)}></input> */}
                        {errors.day ? <p className=' text-orange'>{errors.day.message}</p> : null}
                    </div>
                    <div className='grid grid-cols-3 items-center gap-4'>
                        <label>Time:</label>
                        <select className='px-4 py-2 rounded-lg' name="time" id="time" onChange = {(e)=>setTime(e.target.value)}>
                            <option value="">Select</option>
                            <option value="9a">9a</option>
                            <option value="10a">10a</option>
                            <option value="11a">11a</option>
                            <option value="12p">12p</option>
                            <option value="1p">1p</option>
                            <option value="2p">2p</option>
                            <option value="3p">3p</option>
                            <option value="4p">4p</option>
                            <option value="5p">5p</option>
                            <option value="6p">6p</option>
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
