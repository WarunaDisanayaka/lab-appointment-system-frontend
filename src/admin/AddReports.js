import React, { useState, useEffect } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { Table, Form, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router';

function AddReports() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null); // To store selected files
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
    // Reset selected patient and hide the modal
    setSelectedPatient(null);
    setShowModal(false);
  };

  const handleFileChange = (event) => {
    // Set selected files when input value changes
    setSelectedFiles(event.target.files);
  };

  const handleFileUpload = async () => {
    // Check if any file is selected
    if (!selectedFiles || selectedFiles.length === 0) {
      console.error('No file selected for upload.');
      return;
    }
  
    try {
      const formData = new FormData();
      // Append selected files to form data
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('file', selectedFiles[i]);
      }
      // Append patient ID to form data
      formData.append('patientId', selectedPatient.patientId);
  
      // Make POST request to upload files with patient ID
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log(response.data); // Log response from server
  
      // Close the modal after successful upload
      handleCloseModal();
    } catch (error) {
      console.error('Error uploading file:', error);
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
          <h2>Add reports</h2>
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
                    <button onClick={() => handleAction(patient)}>Action</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Upload files for {selectedPatient && selectedPatient.username}</p>
          <Form.Group controlId="fileUpload">
            <Form.Label>Select File(s)</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} multiple />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFileUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddReports;
