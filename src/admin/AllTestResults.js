import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

function AllTestResults() {
  const [testResults, setTestResults] = useState([]);
  const [selectedTestResult, setSelectedTestResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedTestName, setUpdatedTestName] = useState('');
  const [updatedResult, setUpdatedResult] = useState('');

  useEffect(() => {
    // Fetch test results
    axios.get('http://localhost:8080/api/test-results/all')
      .then(response => {
        console.log(response.data);
        setTestResults(response.data);
      })
      .catch(error => {
        console.error('Error fetching test results:', error);
      });
  }, []);

  const handleUpdateClick = (testResult) => {
    setSelectedTestResult(testResult);
    setUpdatedTestName(testResult.testName);
    setUpdatedResult(testResult.result);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTestResult(null);
    setUpdatedTestName('');
    setUpdatedResult('');
    setShowModal(false);
  };

  const handleSaveUpdate = async () => {
    try {
      // Make API call to update test result
      await axios.put(`http://localhost:8080/api/test-results/${selectedTestResult.testResultId}`, {
        testName: updatedTestName,
        result: updatedResult
      });
      // Refresh test results after update
      const updatedResults = await axios.get('http://localhost:8080/api/test-results/all');
      setTestResults(updatedResults.data);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating test result:', error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4 mt-5">
          <h2>Test Results</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Result</th>
                <th>Patient Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testResults.length > 0 ? (
                testResults.map(testResult => (
                  <tr key={testResult.testResultId}>
                    <td>{testResult.testName}</td>
                    <td>{testResult.result}</td>
                    <td>
                      <p>{testResult.patient.firstName} {testResult.patient.lastName}</p>
                      <p>{testResult.patient.contactNumber}</p>
                    </td>
                    <td>
                      <Button onClick={() => handleUpdateClick(testResult)}>Update</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No test results available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
      {/* Update Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Test Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="testName">
            <Form.Label>Test Name</Form.Label>
            <Form.Control type="text" value={updatedTestName} onChange={(e) => setUpdatedTestName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="result">
            <Form.Label>Result</Form.Label>
            <Form.Control type="text" value={updatedResult} onChange={(e) => setUpdatedResult(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AllTestResults;
