import React from 'react';
import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import BookAppointment from './components/BookAppointment';
import MyAppointments from './views/MyAppointments';
import Update from './components/Update';
import RegisterLogin from './views/RegisterLogin';


function App() {
  const [loggedIn,setLoggedIn] = useState(false)
  

  return (
    <div>
    	<BrowserRouter>
        <Routes>
	        <Route element={<RegisterLogin setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>} path="/" default />
          <Route element={<BookAppointment/>} path="/bookAppointment" />
          <Route element={<MyAppointments/>} path="/myAppointments" />
          <Route element={<Update/>} path="/appointments/edit/:id"/>
        </Routes>
    	</BrowserRouter>
    </div>
  );
}
export default App;

