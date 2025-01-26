import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/homePage/homePage';
import AuthPage from './pages/auth/auth';
import AdminDashboard from './components/adminDashboard/adminDashboard';
import NavBar from './components/navbar/navBar';
import Footer from './components/footer/footer';
import NotFoundPage from './components/notFoundPage/notFoundPage';
import Mens from "./pages/Products/Mens";
import Women from "./pages/Products/Women";
import Kids from "./pages/Products/Kids";
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

  const isAdmin = localStorage.getItem("role") === "admin";

  return (
    <div className="App">
      <ToastContainer />
      <NavBar toggleDrawer={toggleDrawer} />
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        {isAdmin && <Route path="/admin" element={<AdminDashboard />} />}
        <Route path="/" element={<HomePage />} />
        <Route path="/products/mens" element={<Mens />} />
        <Route path="/products/women" element={<Women />} />
        <Route path="/products/kids" element={<Kids />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
