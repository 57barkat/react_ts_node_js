import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/homePage/homePage';
import AuthPage from './pages/auth/auth';
import NavBar from './components/navbar/navBar';
import Footer from './components/footer/footer';
import AdminDashBoard from './pages/adminDashboard/adminDashboard';
import NotFoundPage from './components/notFoundPage/notFoundPage';
import UserManagement from './pages/adminDashboard/UserManagement/UserManagement';
import ProductManagement from './pages/adminDashboard/ProductManagement/ProductManagement';
import PaymentTransactions from './pages/adminDashboard/PaymentTransactions/PaymentTransactions';
import OrderManagement from './pages/adminDashboard/OrderManagement/OrderManagement';
import ReportingAnalytics from './pages/adminDashboard/ReportingAnalytics/ReportingAnalytics';
import MarketingPromotions from './pages/adminDashboard/MarketingPromotions/MarketingPromotions';
import './App.css';
import MenProducts from './pages/adminDashboard/ProductManagement/men/menProducts';
import WomenProducts from './pages/adminDashboard/ProductManagement/women/womenProducts';
import KidsProducts from './pages/adminDashboard/ProductManagement/kid/kidProducts';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

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
        {isAdmin && (
          <>
            <Route path="/admin" element={<AdminDashBoard />} />
            <Route path="/admin/user-management" element={<UserManagement />} />
            <Route path="/admin/product-management" element={<ProductManagement />} />
            <Route path="/admin/payment-transactions" element={<PaymentTransactions />} />
            <Route path="/admin/order-management" element={<OrderManagement />} />
            <Route path="/admin/reporting-analytics" element={<ReportingAnalytics />} />
            <Route path="/admin/marketing-promotions" element={<MarketingPromotions />} />
          </>
        )}
        <Route path="/" element={<HomePage />} />
        <Route path="/products/mens" element={<MenProducts />} />
        <Route path="/products/women" element={<WomenProducts />} />
        <Route path="/products/kids" element={<KidsProducts />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
