import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentDashboard from './components/student/StudentDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import MessMenu from './components/student/MessMenu';
import ComplaintForm from './components/student/ComplaintForm';
import ComplaintList from './components/student/ComplaintList';
import MenuManager from './components/admin/MenuManager';
import AllComplaints from './components/admin/AllComplaints';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './components/shared/Profile';
import RoomInfo from './components/shared/RoomInfo';
import FeeManagement from './components/shared/FeeManagement';
import Dashboard from './components/shared/Dashboard';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      setUserRole(decoded.role);
      
      if (decoded.role === 'admin') {
        setCurrentPage('admin-dashboard');
      } else {
        setCurrentPage('student-dashboard');
      }
    }
  }, []);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const handleLoginSuccess = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      setUserRole(decoded.role);
      
      if (decoded.role === 'admin') {
        setCurrentPage('admin-dashboard');
      } else {
        setCurrentPage('student-dashboard');
      }
    }
  };

  const renderPage = () => {
    if (!isLoggedIn) {
      if (currentPage === 'login') {
        return <Login onLoginSuccess={handleLoginSuccess} changePage={changePage} />;
      }
      if (currentPage === 'signup') {
        return <Signup changePage={changePage} />;
      }
      return <HomePage changePage={changePage} />;
    }

    switch (currentPage) {
      case 'student-dashboard':
        return <StudentDashboard changePage={changePage} />;
      case 'admin-dashboard':
        return <AdminDashboard changePage={changePage} />;
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <Profile />;
      case 'room-info':
        return <RoomInfo />;
      case 'fee-management':
        return <FeeManagement />;
      case 'menu':
        return <MessMenu />;
      case 'complaint-form':
        return <ComplaintForm />;
      case 'complaint-list':
        return <ComplaintList />;
      case 'menu-manager':
        return <MenuManager />;
      case 'all-complaints':
        return <AllComplaints />;
      default:
        return <HomePage changePage={changePage} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
