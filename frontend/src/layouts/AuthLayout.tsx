import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-sidebar">
          {/* Branding or Image */}
          <h2>Aloka</h2>
          <p>Make a difference through donations</p>
        </div>
        <div className="auth-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
