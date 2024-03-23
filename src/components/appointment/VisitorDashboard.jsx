import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useCookies } from 'react-cookie';
import './dashboard.css';

const VisitorDashboard = () => {
  const [, , removeCookie] = useCookies(['patientId']);
  const handleLogout = () => {
    // Remove the 'patientId' cookie
    removeCookie('patientId', { path: '/' });
    // Redirect the user to the login page
    window.location.replace('/login');
  };


  return (
    <div className="dashboard-container" style={{backgroundImage: 'url("")'}}>

      <div className="content-container">
        <h1>Welcome</h1>
        <div className="dashboard-cards">
          <div className="card">
            <h3>My Appointments</h3>
            <p>View and manage your appointments here.</p>
            {/* Use Link to navigate to the Appointments component */}
            <Link to="/my-appointments" className="btn btn-primary">View Appointments</Link>
          </div>
          <div className="card">
            <h3>Lab Reports</h3>
            <p>View and update your profile information.</p>
            {/* Add routing logic for the "View Profile" button */}
            <Link to="/my-reports" className="btn btn-primary">View Reports</Link>
          </div>
          <div className="card">
            <h3>Test Results</h3>
            <p>View your test results</p>
            {/* Add routing logic for the "Logout" button */}
            <Link to="/my-test-result" className="btn btn-primary">Test Result</Link>
          </div>
          <div className="card">
      <h3>Logout</h3>
      <p>Logout from your account.</p>
      {/* Call the handleLogout function when the button is clicked */}
      <button onClick={handleLogout} className="btn btn-primary">Logout</button>
    </div>
         
        </div>
      </div>
    </div>
  );
};

export default VisitorDashboard;
