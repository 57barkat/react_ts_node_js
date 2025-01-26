import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import HomePage from './pages/homePage/homePage';
import AuthPage from './pages/auth/auth';
import AdminDashboard from './components/adminDashboard/adminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer /> {/* Add ToastContainer */}
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
