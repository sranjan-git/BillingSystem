import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideNavBar.scss';

const SideNavBar = ({ setCurrentPage }) => {
  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        My App
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="active" onClick={() => handleNavClick('Home')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" activeClassName="active" onClick={() => handleNavClick('Dashboard')}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/payment" activeClassName="active" onClick={() => handleNavClick('Payment')}>
              Payment
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" activeClassName="active" onClick={() => handleNavClick('Settings')}>
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/invoice" activeClassName="active" onClick={() => handleNavClick('Invoice')}>
              Invoice
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNavBar;
