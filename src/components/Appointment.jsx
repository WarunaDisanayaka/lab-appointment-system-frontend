import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import './style.css';
import backgroundImage from './background.jpg';

function Appointment() {
  const [appointmentTime, setAppointmentTime] = useState('');
  const [test, setTest] = useState('');
  const [message, setMessage] = useState('');
  const [cookies] = useCookies(['patientId']); // Retrieve patientId from cookies
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // Check if the patientId cookie is present
    if (!cookies.patientId) {
      // Redirect to login page
      setRedirect(true);
    }
  }, [cookies.patientId]);

  // Sample test options
  const sampleTestOptions = [
    { testId: 1, testName: 'Blood Test' },
    { testId: 2, testName: 'X-Ray' },
    { testId: 3, testName: 'MRI Scan' },
    // Add more test options as needed
  ];

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      appointmentTime,
      test,
      patient: {
        patientId: cookies.patientId,
      },
    };

    try {
      // Assuming a successful submission without actual API call for sample purposes
      // Replace this part with your actual API call
      // Simulate a delay to mimic API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form fields
      setAppointmentTime('');
      setTest('');
      setMessage('Appointment request submitted successfully!');
    } catch (error) {
      console.error('Error submitting appointment request:', error);
      setMessage('Error submitting appointment request. Please try again.');
    }
  };

  // Redirect to login if the patientId cookie is not present
  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, justifyContent: 'center', alignItems: 'center' }}>
      <h2 style={{ color: '#00264d', textAlign: 'center', marginTop: '10%' }}>Make an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="appointmentTime" style={{ color: '#00264d', display: 'block', marginBottom: '8px', textAlign: 'left' }}>Appointment Time:</label>
          <input
            type="datetime-local"
            className="form-control"
            id="appointmentTime"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="test" style={{ color: '#00264d', display: 'block', marginBottom: '8px', textAlign: 'left' }}>Test:</label>
          <select
            className="form-control"
            id="test"
            value={test}
            onChange={(e) => setTest(e.target.value)}
            required
          >
            <option value="" disabled>Select a test</option>
            {sampleTestOptions.map((option) => (
              <option key={option.testId} value={option.testName}>
                {option.testName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {message && <div className="alert alert-success mt-3">{message}</div>}
    </div>
  );
}

export default Appointment;
