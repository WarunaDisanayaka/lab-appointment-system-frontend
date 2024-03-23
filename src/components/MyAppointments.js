import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router';
import Cookies from 'js-cookie'; 
import Sidebar from './appointment/Dashboard';

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [clickedAppointment, setClickedAppointment] = useState(null); // Fix here
  const location = useLocation();
  const roleid = location.state;

  useEffect(() => {
    // Fetch patientId from cookies
    const patientId = Cookies.get('patientId'); // Adjust the cookie name if needed

    console.log(patientId)

    if (patientId) {
      // Fetch appointments for the specific patient from the API
      axios.get(`http://localhost:8080/appointments/byPatient/${patientId}`)
        .then(response => {
          setAppointments(response.data);
        })
        .catch(error => {
          console.error('Error fetching appointments:', error);
        });
    }
  }, []);

  const handleStatusChange = async (appointmentId, newStatus) => {
    console.log(newStatus)
    try {
      // Make the API request using axios to update the appointment status
      await axios.put(`http://localhost:8080/appointments/${appointmentId}`, { status: newStatus });
  
      // Update the local state to reflect the status change
      setAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment.appointmentId === appointmentId
            ? { ...appointment, status: newStatus } // Directly update status property
            : appointment
        )
      );
  
      // Set the clicked button to highlight it
      setClickedAppointment(appointmentId);
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };
  

  return (
    <div className="d-flex">
      {/* Include Sidebar component */}
      <Sidebar />
      <div className="flex-grow-1">
        <div className="p-4 mt-5">
          <h2>Appointments</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Appointment Number</th>
                <th>Appointment Time</th>
                <th>Test</th>
                <th>Status</th>
                
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment.appointmentId}>
                  <td>{appointment.appointmentNumber}</td>
                  <td>{new Date(appointment.appointmentTime).toLocaleString()}</td>
                  <td>{appointment.test}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default MyAppointments;
