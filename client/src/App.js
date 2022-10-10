import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import BookAppointment from './components/BookAppointment';
import MyAppointments from './views/MyAppointments';
import Update from './components/Update';
import RegisterLogin from './components/RegisterLogin';

function App() {
  return (
    <div>
    	<BrowserRouter>
        <Routes>
	        <Route element={<RegisterLogin/>} path="/" default />
          <Route element={<BookAppointment/>} path="/bookAppointment" />
          <Route element={<MyAppointments/>} path="/myAppointments" />
          <Route element={<Update/>} path="/appointments/edit/:id"/>
        </Routes>
    	</BrowserRouter>
    </div>
  );
}
export default App;

