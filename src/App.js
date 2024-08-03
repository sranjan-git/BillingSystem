import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SideNavBar from './components/SideNavBar/SideNavBar';
import DashBoard from './components/DashBoard/DashBoard';
import Payment from './components/Payment/Payment';
import Invoice from './components/Invoice/Invoice';
// import HomePage from './pages/HomePage';
// import ProfilePage from './pages/ProfilePage';
// import SettingsPage from './pages/SettingsPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');

  return (
    <Router>
      <div className="app">
        <SideNavBar setCurrentPage={setCurrentPage} />
        <NavBar currentPage={currentPage} />
        <div className="main-content" style={{ marginLeft: '250px', marginTop: '60px', padding: '20px' }}>
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/invoice" element={<Invoice />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
