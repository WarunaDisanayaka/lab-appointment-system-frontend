import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router';

function MyReports() {
  const [filePaths, setFilePaths] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const location = useLocation();
  const userId = Cookies.get('patientId');

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8080/files/${userId}`)
        .then(response => {
          console.log(response.data); // Log the response data
          setFilePaths(response.data.filePaths); // Set file paths
          setFileNames(response.data.fileNames); // Set file names
        })
        .catch(error => {
          console.error('Error fetching reports:', error);
        });
    }
  }, [userId]); // Fetch reports whenever userId changes

  return (
    <div className="p-4 mt-5">
      <h2>My Reports</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Download Link</th>
          </tr>
        </thead>
        <tbody>
          {filePaths.length > 0 ? (
            filePaths.map((filePath, index) => (
              <tr key={index}>
                <td>{fileNames[index]}</td>
                <td>
                  <a href={`http://localhost:8080/${filePath}`} download>
                    Download
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No reports available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default MyReports;
