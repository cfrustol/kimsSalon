import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
    return(
        <div className="flex justify-evenly items-center h-32 bg-blue text-white text-xl">
            <h1 className="text-5xl">Kim's Salon</h1>
            <Link to="/bookAppointment" className=" hover:text-gray-dark">Book Appointment</Link>
            <Link to="/myAppointments" className=" hover:text-gray-dark">My Appointments</Link>
            {/* <Link to="/" className=" hover:text-gray-dark">Write a Review</Link> */}
            <div>
                <h3>Hours</h3>
                <p>Sunday: Closed</p>
                <p>Mon-Sat: 9a - 7p</p>
            </div>
            <Link to="/" className=" hover:text-orange hover:bg-gray-dark hover:rounded-md">Logout</Link>
        </div>
    )

}

export default NavBar;