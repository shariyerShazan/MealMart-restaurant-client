import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { FaHome } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineRestaurant } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";

const DashboardNav = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Orders", path: "/dashboard", icon: <RxDashboard /> },
    { name: "Restaurant", path: "/dashboard/restaurant", icon: <MdOutlineRestaurant /> },
    { name: "Menu", path: "/dashboard/add-menu", icon: <IoIosAddCircleOutline  size={20}/> },
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
          <h2 className="text-3xl font-bold">
            Meal<span className="text-myColor">Mart</span>
          </h2>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
                    location.pathname === item.path
                      ? "bg-myColor text-white"
                      : "text-gray-700 hover:bg-myColor hover:text-white"
                  }`}
                >
                  {item.icon} {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
                    location.pathname === item.path
                      ? "bg-myColor text-white"
                      : "text-gray-700 hover:bg-myColor hover:text-white"
                  }`}
                >
                  {item.icon} {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default DashboardNav;
