import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './components/HomePage/homePage';
import AuthPage from './pages/auth/auth';
import AdminDashboard from './components/adminDashboard/adminDashboard';
import NavBar from './components/navbar/navBar';
import Footer from './components/footer/footer';
import NotFoundPage from './components/notFoundPage/notFoundPage';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDrawer = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <AppContent toggleDrawer={toggleDrawer} />
    </Router>
  );
}

const AppContent = ({ toggleDrawer }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="App">
      <ToastContainer />
      <NavBar toggleDrawer={toggleDrawer} />
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
