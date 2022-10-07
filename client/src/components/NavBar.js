import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
    return(
        <div>
            <h1>Kim's Salon</h1>
            <Link to="/bookAppointment">Book Appointment</Link>
            <Link to="/myAppointments">My Appointments</Link>
            <Link to="/">Write a Review</Link>
            <div>
                <h3>Hours</h3>
                <p>Sunday: Closed</p>
                <p>Mon-Sat: 9a - 7p</p>
            </div>
            <Link to="/">Logout</Link>
        </div>
    )

}

export default NavBar;