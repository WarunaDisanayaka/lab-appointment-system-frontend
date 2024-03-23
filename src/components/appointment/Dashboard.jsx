import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useCookies } from 'react-cookie';
import './dashboard.css';

const UserDashboard = () => {
  const [, , removeCookie] = useCookies(['patientId']);
  const handleLogout = () => {
    // Remove the 'patientId' cookie
    removeCookie('patientId', { path: '/' });
    // Redirect the user to the login page
    window.location.replace('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h1>Welcome</h1>
        <div className="sidebar-links">
          <Link to="/my-appointments" className="sidebar-link">My Appointments</Link>
          <Link to="/my-reports" className="sidebar-link">Lab Reports</Link>
          <Link to="/my-test-result" className="sidebar-link">Test Results</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
      
    </div>
  );
};

export default UserDashboard;
