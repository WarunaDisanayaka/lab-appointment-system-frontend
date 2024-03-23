import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Assets/vendor/fontawesome-free/css/all.min.css";
import "../Assets/css/sb-admin-2.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2'; 



const Sidebar = () => {
    const navigate = useNavigate(); 

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogout = () => {
        console.log('Logout button clicked');
        Cookies.remove('userToken');
        console.log('User token removed'); 
        navigate("/"); 
        console.log('Navigate to root');
    };

    useEffect(() => {
      // Check if the user is logged in
      const userToken = Cookies.get('adminToken');
      if (!userToken) {
          // Redirect to login page if not logged in
          navigate("/admin-login");
      }
      console.log(userToken)
  }, []);

    const handleCreateRole = async () => {
        try {
          // Retrieve the JWT token from Cookies
          const userToken = Cookies.get('userToken');
    
          if (!userToken) {
            // Handle the case when the token is not available
            console.error('JWT Token is not available');
            return;
          }
    
          // Include the token in the request headers
          const headers = {
            Authorization: `Bearer ${userToken}`,
          };
    
          setLoading(true);
    
          // Make the API request using axios to create a role
          await axios.get('/role/create/current_role/ADMIN', { headers });

          navigate('/role-creation'); 
          Swal.fire({
            icon: 'success',
            title: 'Role Created!',
            text: 'The role has been created successfully.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });

        } catch (error) {
          console.error('Error creating role:', error);
        } finally {
          setLoading(false);
        }
    };

    const handleCreateAdministration = async () => {
        try {
          // Retrieve the JWT token from Cookies
          const userToken = Cookies.get('userToken');
    
          if (!userToken) {
            // Handle the case when the token is not available
            console.error('JWT Token is not available');
            return;
          }
    
          // Include the token in the request headers
          const headers = {
            Authorization: `Bearer ${userToken}`,
          };
    
          setLoading(true);
    
          // Make the API request using axios to create a role
          await axios.get('/administration/create/current_role/ADMIN', { headers });

          navigate('/crate-administration'); 
          Swal.fire({
            icon: 'success',
            title: 'Administration Created!',
            text: 'The Administration has been created successfully.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });

        } catch (error) {
          console.error('Error creating role:', error);
        } finally {
          setLoading(false);
        }
    };
    

    return ( 
        
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/admin_dashboard">
            
                <div className="sidebar-brand-text mx-3"></div>
            </a>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item">
                <a className="nav-link" href="/admin-dashboard">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </a>
            </li>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">Actions</div>
            <li className="nav-item">
                <a className="nav-link collapsed d-flex align-items-center justify-content-between" href="#collapseTwo"
                    data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true"
                    aria-controls="collapseTwo">
                    <span>
                        <i className="fas fa-th-list"></i>
                        Appointments
                    </span>
                    <i className="fas fa-angle-right"></i>
                </a>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <a className="collapse-item" href="/appointments"><i className="fas fa-plus-circle"></i> View</a>
                        {/* <a className="collapse-item" href="/organization-details-update"><i class="far fa-edit"></i>Update</a>
                        <a className="collapse-item" href="/organization-delete"><i class="fas fa-trash"></i> Delete</a> */}

                    </div>
                </div>
            </li>

              <li className="nav-item">
                <a className="nav-link collapsed d-flex align-items-center justify-content-between" href="#collapseUtilities"
                    data-bs-toggle="collapse" data-bs-target="#collapseUtilities" aria-expanded="true"
                    aria-controls="collapseUtilities">
                    <span>
                    <i class="fas fa-print"></i>
                        Reports
                    </span>
                    <i className="fas fa-angle-right"></i>
                </a>
                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">                        
                        <a className="collapse-item" href="/add-reports"><i class="fas fa-plus-circle"></i> View</a>

                    </div>
                </div>
              </li>

              <li className="nav-item">
                <a className="nav-link collapsed d-flex align-items-center justify-content-between" href="#collapseTestResult"
                    data-bs-toggle="collapse" data-bs-target="#collapseTestResult" aria-expanded="true"
                    aria-controls="collapseTestResult">
                    <span>
                        <i className="fas fa-solid fa-hotel"></i>
                        Test Result
                    </span>
                    <i className="fas fa-angle-right"></i>
                </a>
                <div id="collapseTestResult" className="collapse" aria-labelledby="collapseTestResult"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">                     
                        <a className="collapse-item" href="/add-test-result"><i class="fas fa-plus-circle"></i> Add</a>
                        <a className="collapse-item" href="/all-test-result"><i class="fas fa-border-all"></i> View</a>

                    </div>
                </div>
              </li>
            
            <hr className="sidebar-divider" />
            <div className="text-center d-none d-md-inline">
            <div className="text-center d-none d-md-inline">
            {/* <button onClick={handleLogout} className="btn btn-link" style={{ cursor: 'pointer' }}>
                <i className="fas fa-fw fa-sign-out-alt"></i>
                <span>Logout</span>
            </button> */}
        </div>
      </div>
      {successMessage && (
        <div className="alert alert-success mt-3 text-center" role="alert" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          {successMessage}
        </div>
      )}
        </ul>
        
        
    );
};

export default Sidebar;
