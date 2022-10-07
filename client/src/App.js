import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './views/Main';
import BookAppointment from './components/BookAppointment';
import MyAppointments from './views/MyAppointments';
import Update from './components/Update';

function App() {
  return (
    <div>
    	<BrowserRouter>
        <Routes>
	        <Route element={<Main/>} path="/" default />
          <Route element={<BookAppointment/>} path="/bookAppointment" />
          <Route element={<MyAppointments/>} path="/myAppointments" />
          <Route element={<Update/>} path="/appointments/edit/:id"/>
        </Routes>
    	</BrowserRouter>
    </div>
  );
}
export default App;

