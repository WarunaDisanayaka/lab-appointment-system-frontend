
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './admin/Dashboard';
import Appointment from './components/Appointment';
import VisitorDashboard from './components/appointment/VisitorDashboard';
import Signup from './components/Signup';
import Home from './components/Home';
import Login from './components/Login';
import Appointments from './admin/Appointments';
import MyAppointments from './components/MyAppointments';
import AddAppointments from './admin/AddReports';
import AddReports from './admin/AddReports';
import MyReports from './components/MyReports';
import AddTestResult from './admin/AddTestResult';
import MyTestResults from './components/MyTestResults';
import AllTestResults from './admin/AllTestResults';
import AdminLogin from './admin/Login';
import { useCookies } from 'react-cookie';


function App() {
  const [cookies] = useCookies(['patientId']); // Get the 'patientId' cookie

  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<VisitorDashboard />} />
          <Route path="/registration" element={<Signup />} />

          
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/my-appointments" element={<MyAppointments />} />

              <Route path="/add-reports" element={<AddReports />} />
              <Route path="/my-reports" element={<MyReports />} />
              <Route path="/add-test-result" element={<AddTestResult />} />

              <Route path="/my-test-result" element={<MyTestResults />} />
              <Route path="/all-test-result" element={<AllTestResults /> }  />
            
        

        </Routes>
      </Router>
      

    </div>
  );
}

export default App;
