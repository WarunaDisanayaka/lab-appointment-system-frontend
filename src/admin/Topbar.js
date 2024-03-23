import React from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

const Topbar = ({ roleid }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    console.log('Logout button clicked');
    Cookies.remove('adminToken');
    navigate("/admin-login");
  };

  const handleRoleClick = (role) => {
    console.log(`Clicked on role: ${role}`);
    // You can navigate to a specific route based on the role if needed
    // Example: navigate(`/role/${role}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white topbar static-top shadow">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <button
              className="btn btn-link mb-1"
              onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Topbar;
