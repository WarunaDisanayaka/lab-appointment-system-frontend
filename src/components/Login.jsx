import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import './style.css';
import backgroundImage from './background.jpg';

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [, setCookie] = useCookies(); // Import useCookies hook

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      username: usernameOrEmail,
      password,
    };

    try {
      const response = await fetch('http://localhost:8080/patients/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();

        // Save patientId in cookies
        setCookie('patientId', data.patientId, { path: '/' });

        // Redirect to the dashboard
        window.location.replace('/dashboard');
      } else {
        console.error('Error submitting login request:', response.statusText);
        setMessage('Invalid username or password. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting login request:', error);
      setMessage('Error submitting login request. Please try again.');
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})`, justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <h2 style={{ color: '#00264d', textAlign: 'center', marginTop: '10%' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="usernameOrEmail" style={{ color: '#00264d', display: 'block', marginBottom: '8px', textAlign: 'left' }}>Username or Email:</label>
            <input
              type="text"
              className="form-control"
              id="usernameOrEmail"
              placeholder="Enter your username or email"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" style={{ color: '#00264d', display: 'block', marginBottom: '8px', textAlign: 'left' }}>Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        {message && <div className="alert alert-danger mt-3">{message}</div>}
      </div>
    </div>
  );
}

export default Login;
