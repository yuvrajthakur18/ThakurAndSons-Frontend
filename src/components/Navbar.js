import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
      const response = await fetch('http://localhost:8080/api/auth/logout', {
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
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <nav className="navbar bg-info con">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-light">Event Management</Link>
        <form className="d-flex" role="search">
          {username ? (
            <>
              <span className="navbar-text text-light me-2">Hello, {username}</span>
              <button className="btn btn-outline-light" type="button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
              <Link to="/register" className="btn btn-outline-light">Register</Link>
            </>
          )}
        </form>
      </div>
    </nav>
  );
};


// import { Link } from "react-router-dom"

// export const Navbar = () => {
    
//     return <nav class="navbar bg-info con">
//         <div class="container-fluid">
//             <Link to={"/"} class="navbar-brand text-light">Event Management</Link>
//             <form class="d-flex" role="search">
//                 <Link to={"/login"} class="btn btn-outline-light me-2" type="submit">Login</Link>
//                 <Link to={"/register"} class="btn btn-outline-light" type="submit">Register</Link>
//             </form>
//         </div>
//   </nav>
// }