import React, { useState, useEffect } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [clickedAppointment, setClickedAppointment] = useState(null); // Fix here
  const location = useLocation();
  const roleid = location.state;

  useEffect(() => {
    // Fetch appointments from the API
    axios.get('http://localhost:8080/appointments/all')
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
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
      <div>
        <Sidebar />
      </div>
      <div className="flex-grow-1">
        <Topbar roleid={roleid} />
        <div className="p-4 mt-5">
          <h2>Appointments</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Appointment Number</th>
                <th>Appointment Time</th>
                <th>Test</th>
                <th>Status</th>
                <th>Patient Name</th>
                <th>Contact Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment.appointmentId}>
                  <td>{appointment.appointmentNumber}</td>
                  <td>{new Date(appointment.appointmentTime).toLocaleString()}</td>
                  <td>{appointment.test}</td>
                  <td>{appointment.status}</td>
                  <td>{`${appointment.patient.firstName} ${appointment.patient.lastName}`}</td>
                  <td>{appointment.patient.contactNumber}</td>
                  <td>
                    {/* Action text for changing status */}
                    <span
                      className={clickedAppointment === appointment.appointmentId ? 'text-success' : 'text-success'}
                      onClick={() => handleStatusChange(appointment.appointmentId, 'Confirmed')}
                      style={{ cursor: 'pointer' }}
                    >
                      Confirm
                    </span>
                    |
                    <span
                      className="text-danger"
                      onClick={() => handleStatusChange(appointment.appointmentId, 'Cancelled')}
                      style={{ cursor: 'pointer' }}
                    >
                      Cancel
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
