import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

import '../index.css'
import { Card } from './Card';

export const Navbar = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('https://thakur-and-sons-backend-production.up.railway.app/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        setUsername('');
        navigate('/login'); // Redirect to login page after logout
        // window.location.reload();
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container-fluid pt-4 pb-4 pe-4 d-flex align-items-center" style={{backgroundColor:'#e7f1f2', margin:'-10px 0 -10px 0'}}>
        <Link to="/" className="navbar-brand text-dark fw-bold">
          <div className='top position-relative ps-3' style={{marginTop:"-10px"}}>
            <h3 style={{ }} className='dancing-script-fonts text-center'>Thakur & Sons</h3>
            <small className='position-absolute start-50 translate-middle-x fw-normal' style={{fontSize: '13px', letterSpacing:"8px"}}>EVENTS</small>
          </div>
        </Link>
        <div className='about' style={{color:"gray", letterSpacing:"1.5px", cursor:'pointer'}}>
          <ScrollLink to="about" smooth={true} duration={300}>
            ABOUT
          </ScrollLink>
        </div>
        <div className='services' style={{color:"gray", letterSpacing:"1.5px", cursor:'pointer'}}>
          <ScrollLink to="services" smooth={true} duration={300}>
            SERVICES
          </ScrollLink>
        </div>
        <div className='events' style={{color:"gray", letterSpacing:"1.5px", cursor:'pointer'}}>
          <ScrollLink to='events' smooth={true} duration={300}>
            EVENTS
          </ScrollLink>
        </div>
        <div className='contact' style={{color:"gray", letterSpacing:"1.5px", cursor:'pointer'}}>
          <ScrollLink to="contact" smooth={true} duration={300}>
            CONTACT
          </ScrollLink>
        </div>
        <div className='as_seen_in' style={{color:"gray", letterSpacing:"1.5px", cursor:'pointer'}}>
          <ScrollLink to="as_seen_in" smooth={true} duration={300}>
            CLIENTS
          </ScrollLink>
        </div>


        <form className="d-flex" role="search">
          {username ? (
            <>
              {/* <span className="navbar-text text-light me-2">
              </span> */}
              <button className="btn btn-outline-light custom-button" style={{backgroundColor:"#1F316F"}} type="button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light custom-button me-2" style={{backgroundColor:"#1F316F"}}>Login</Link>
              <Link to="/register" className="btn btn-outline-light custom-button" style={{backgroundColor:"#1F316F"}}>Register</Link>
            </>
          )}
        </form>
      </div>
    </nav>
  );
};