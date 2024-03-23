import React, { useState, useEffect } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router';

function Dashboard() {
  const [appointmentCounts, setAppointmentCounts] = useState({ Confirmed: 0, Cancelled: 0 });
  const [patientCount, setPatientCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointmentCounts();
    fetchPatientCount();
  }, []);

  const fetchAppointmentCounts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/appointments/countByStatus');
      setAppointmentCounts(response.data);
    } catch (error) {
      console.error('Error fetching appointment counts:', error);
    }
  };

  const fetchPatientCount = async () => {
    try {
      const response = await axios.get('http://localhost:8080/patients/count');
      setPatientCount(response.data);
    } catch (error) {
      console.error('Error fetching patient count:', error);
    } finally {
      setLoading(false);
    }
  };

  const { Confirmed, Cancelled } = appointmentCounts;

  return (
    <div className="d-flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4 mt-5">
          <Row>
            <Col>
              <Card bg="success" text="white">
                <Card.Body>
                  <Card.Title>Confirmed Appointments</Card.Title>
                  <Card.Text>{loading ? 'Loading...' : Confirmed}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card bg="danger" text="white">
                <Card.Body>
                  <Card.Title>Cancelled Appointments</Card.Title>
                  <Card.Text>{loading ? 'Loading...' : Cancelled}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card bg="primary" text="white">
                <Card.Body>
                  <Card.Title>Total Patients</Card.Title>
                  <Card.Text>{loading ? 'Loading...' : patientCount}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
