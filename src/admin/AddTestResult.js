import React, { useState, useEffect } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { Table, Form, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router';

function AddTestResult() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [testName, setTestName] = useState('');
  const [result, setResult] = useState('');
  const location = useLocation();
  const roleid = location.state;

  useEffect(() => {
    // Fetch patients from the API
    axios.get('http://localhost:8080/patients/all')
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  const filteredPatients = patients.filter(patient =>
    patient.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.contactNumber.includes(searchTerm)
  );

  const handleAction = (patient) => {
    // Set the selected patient and show the modal
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Reset selected patient, testName, result, and hide the modal
    setSelectedPatient(null);
    setTestName('');
    setResult('');
    setShowModal(false);
  };

  const handleFileUpload = async () => {
    try {
      // Make POST request to save test result
      const response = await axios.post(`http://localhost:8080/api/test-results/patients/${selectedPatient.patientId}`, {
        testName: testName,
        result: result
      });

      console.log(response.data); // Log response from server

      // Close the modal after successful upload
      handleCloseModal();
    } catch (error) {
      console.error('Error saving test result:', error);
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
          <h2>Add Test Results</h2>
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Search patients"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Contact Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(patient => (
                <tr key={patient.patientId}>
                  <td>{patient.username}</td>
                  <td>{patient.firstName}</td>
                  <td>{patient.lastName}</td>
                  <td>{patient.contactNumber}</td>
                  <td>
                    <button onClick={() => handleAction(patient)}>Add Results</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Test Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Add test result for {selectedPatient && selectedPatient.username}</p>
          <Form.Group controlId="testName">
            <Form.Label>Test Name</Form.Label>
            <Form.Control type="text" value={testName} onChange={(e) => setTestName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="result">
            <Form.Label>Result</Form.Label>
            <Form.Control type="text" value={result} onChange={(e) => setResult(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFileUpload}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddTestResult;
