import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router';

function MyTestResults() {
  const [testResults, setTestResults] = useState([]);
  const location = useLocation();
  const userId = Cookies.get('patientId');

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8080/api/test-results/patients/${userId}`)
        .then(response => {
          console.log(response.data); // Log the response data
          setTestResults(response.data); // Set test results
        })
        .catch(error => {
          console.error('Error fetching test results:', error);
        });
    }
  }, [userId]); // Fetch test results whenever userId changes

  return (
    <div className="p-4 mt-5">
      <h2>My Test Results</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {testResults.length > 0 ? (
            testResults.map(testResult => (
              <tr key={testResult.testResultId}>
                <td>{testResult.testName}</td>
                <td>{testResult.result}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No test results available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default MyTestResults;
