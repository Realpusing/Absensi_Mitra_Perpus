import React from "react";
import { AiOutlineCalendar, AiOutlineDown } from "react-icons/ai";
import { FaMoneyBillAlt, FaUserCircle } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import "../style/HomePage_style.css";

const HomePage = () => {
  return (
    <div className="sidebar">
      {/* User Info */}
      <div className="user-info">
        <FaUserCircle className="user-icon" size={60} />

        <div className="user-details">
          <h3>Anisetus Masdian Rayadi</h3>
          <p>215314088</p>
          <button className="dropdown-btn">
            Ganti User <AiOutlineDown size={14} />
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="menu">
        <a href="#" className="menu-item">
          <AiOutlineCalendar size={24} />
          <span>Upload Jadwal</span>
        </a>

        <a href="#" className="menu-item">
          <FaMoneyBillAlt size={24} />
          <span>Cek Honor</span>
        </a>

        <a href="#" className="menu-item">
          <FiSettings size={24} />
          <span>Setting</span>
        </a>
      </div>
      
    </div>
    
  );
};

export default HomePage;


