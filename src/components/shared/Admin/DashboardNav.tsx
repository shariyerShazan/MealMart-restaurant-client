import React from "react";
import { Link, useLocation } from "react-router";
import { FaHome, FaPlusCircle, FaStore, FaClipboardList } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineRestaurant } from "react-icons/md";

const DashboardNav = () => {
  const location = useLocation(); // active link detect করার জন্য

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Dashboard", path: "/dashboard", icon: <RxDashboard /> },
    { name: "Restaurant", path: "/dashboard/restaurant", icon: <MdOutlineRestaurant /> },
    // { name: "Manage Orders", path: "/manage-order", icon: <FaClipboardList /> },
  ];

  return (
    <div className="fixed top-0 sm:top-1/3 right-4 z-50 bg-white shadow-lg rounded-md  overflow-hidden">
      <ul className="flex flex-col">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center gap-2 px-4 py-3 w-48 hover:bg-myColor hover:text-white transition ${
                location.pathname === item.path ? "bg-myColor text-white" : "text-gray-700"
              }`}
            >
              {item.icon} {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardNav;
