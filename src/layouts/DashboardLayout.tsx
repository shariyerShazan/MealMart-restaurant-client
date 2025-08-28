// DashboardLayout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import DashboardNav from '../components/shared/Admin/DashboardNav';
import Footer from '../components/shared/Footer';
import { FaCross } from 'react-icons/fa';
import { IoMdClose, IoMdMenu } from 'react-icons/io';

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Mobile overlay close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMobileOpen && !target.closest('#sidebar') && !target.closest('#mobile-menu-btn')) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileOpen]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <DashboardNav isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-100 md:ml-64">
        {/* Mobile toggle button */}
        <button
          id="mobile-menu-btn"
          className="md:hidden fixed top-5 left-5 z-50 bg-orange-500 p-3 rounded-full text-white shadow-lg"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>

        <div className="p-6">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
