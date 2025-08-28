// DashboardNav.tsx
import React from 'react';
import { Link, useLocation } from 'react-router';
import { FaHome } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineRestaurant } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";

interface Props {
  isMobileOpen: boolean;
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardNav: React.FC<Props> = ({ isMobileOpen, setIsMobileOpen }) => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Orders", path: "/dashboard", icon: <RxDashboard /> },
    { name: "Restaurant", path: "/dashboard/restaurant", icon: <MdOutlineRestaurant /> },
    { name: "Menu", path: "/dashboard/add-menu", icon: <IoIosAddCircleOutline size={20} /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        id="sidebar"
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-gray-200 shadow-lg flex flex-col justify-between z-40 transform transition-transform ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col items-start mt-6 px-4">
          <Link to="/" className="text-2xl md:text-3xl font-bold text-orange-500 mb-10">
            Meal<span className="text-white">Mart</span>
          </Link>

          <ul className="flex flex-col gap-4 w-full">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? "bg-orange-500 text-white"
                      : "hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span className="">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"></div>
      )}
    </>
  );
};

export default DashboardNav;
