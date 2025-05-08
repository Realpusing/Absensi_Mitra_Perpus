import React, { useEffect, useState } from "react";
import { AiOutlineCalendar, AiOutlineDown } from "react-icons/ai";
import { FaMoneyBillAlt, FaUserCircle } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import "../style/HomePage_style.css";

const HomePage = ({onUserSelect}) => {
    const [data, setData] = useState([]);
    const [showDropdown,setShowDropdown]= useState(false);
    const [selectedUser, setSelectedUser]= useState(null)
  
    useEffect(() => {
      fetch('http://localhost:8081/MItra')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, []);

    const toggleDropdown =()=>{
      setShowDropdown(!showDropdown);
    };
    const selectUser=(user)=>{
      setSelectedUser(user);
      setShowDropdown(false);
      if (onUserSelect){
        onUserSelect(user.Nim)
      }
    };
  return (
    <div className="sidebar">
      {/* User Info */}
      <div className="user-info">
        <FaUserCircle className="user-icon" size={60} />

        <div className="user-details">
          <h3>{selectedUser ? selectedUser.Nama :"Unknow User"}</h3>
          <p>{selectedUser ? selectedUser.Nim :"Unknow"}</p>
          <div className="dropdown-container">
          <button className="dropdown-btn" onClick={toggleDropdown}>
            Ganti User <AiOutlineDown size={14} />
          </button>
          {
            showDropdown &&(
              <ul className="dropdown-menu">

                {data.map((user,index)=>(
                  <li
                  key={index}
                  className="dropdown-item"
                  onClick={()=>selectUser(user)}
                  >
                    {user.Nama}({user.Nim})
                  </li>
                )
                )}
              </ul>
            )
          }
          </div>
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


