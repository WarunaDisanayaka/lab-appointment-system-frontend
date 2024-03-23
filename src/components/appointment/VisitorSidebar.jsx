import React from "react";
import './visitorstyle.css';

const Sidebar = () => {
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '250px' }}>
      {/* Sidebar */}
      <ul
        className="navbar-nav2 sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            MPS Motors 
          </div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item">
          <a className="nav-link" href="index.html">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Homepage</span>
          </a>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading"></div>

        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="fas fa-fw fa-cog"></i>
            <span>My appointments</span>
          </a>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading"></div>

        <li className="nav-item">
          <a className="nav-link" href="charts.html">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Visitor Profile</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="tables.html">
            <i className="fas fa-fw fa-table"></i>
            <span>Logout</span>
          </a>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />

      </ul>
    </div>
  );
};

export default Sidebar;
