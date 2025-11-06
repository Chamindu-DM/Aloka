import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      {/* Header/Navigation */}
      <header className="header">
        <nav>
          <div className="logo">Aloka</div>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/donations">Browse Donations</a>
            <a href="/about">About</a>
            <a href="/login">Login</a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Aloka. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
