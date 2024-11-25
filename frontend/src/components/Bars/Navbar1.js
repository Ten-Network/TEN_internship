import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaBarsStaggered } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../../componentsCss/Bars/navbar1.css"; // External CSS file

const Navbar = ({ isSidebarOpen, handleToggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);  // Track logged-in user
  const navigate = useNavigate();

  const toggleMenu = () => {
    if (isSidebarOpen) {
      handleToggleSidebar(); 
    }
    setIsOpen(!isOpen);
  };

  // Check for logged-in user on initial render
  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    if (token) {
      // Mock user data for now
      setLoggedInUser({ name: "John Doe", userType: "user" });
    } else {
      setLoggedInUser(null);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("auth-token"); // Clear token
    setLoggedInUser(null); // Update state to reflect logged-out status
    toast.success("Logged Out!", { position: toast.POSITION.TOP_CENTER });
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Left section - Logo */}
          <div className="navbar-left">
            <div className="navbar-logo">
              <Link to="/" className="navbar-brand">
                <span className="text-white">Ten</span><span className="text-blue-500">Internships</span>
              </Link>
            </div>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="mobile-menu-icon" onClick={toggleMenu}>
            {isOpen ? <IoMdClose size={24} /> : <FaBarsStaggered size={24} />}
          </div>

          {/* Desktop Navbar Links */}
          <div className={`navbar-right ${isOpen ? 'open' : ''}`}>
            <Link to="/jobs" className="navbar-link">Find Internships</Link>
            <Link to="/contactus" className="navbar-link">Contact Us</Link>

            {loggedInUser ? (
              <>
                <Link to="/user/profile" className="navbar-link">My Profile</Link>
                {loggedInUser.userType !== "admin" && (
                  <Link to="/user/applications" className="navbar-link">My Applications</Link>
                )}
                <div onClick={handleLogout} className="navbar-link logout">
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </div>
              </>
            ) : (
              <>
                <Link to="/user/login" className="navbar-link">Login</Link>
                <Link to="/user/register" className="navbar-link">Sign-Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
