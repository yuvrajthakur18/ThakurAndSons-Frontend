import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isRegistered = queryParams.get('registered') === 'true';

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await response.json() : null;

      if (response.ok) {
        if (data && data.jwt && data.userId) {
          // Store user data only after successful login and before the redirect
          localStorage.setItem('token', data.jwt);
          localStorage.setItem('username', formData.username);
          localStorage.setItem('userId', data.userId);

          toast.success('Login successful!');
          setTimeout(() => {
            window.location.href = '/events';
          }, 2000); // Delay to allow toast to display before redirecting
        } else {
          toast.error('Login successful, but no token received.');
          console.error('No token received:', data);
        }
      } else {
        const errorMessage = data ? data.message : 'Login failed!';
        toast.error('Invalid Credentials : ',errorMessage);
        console.error('Login failed:', data);
      }
    } catch (error) {
      toast.error('An error occurred while logging in.');
      console.error('An error occurred:', error);
    }
  };

  return (
    <section className="vh-100 pt-4" style={{backgroundColor:'white'}}>
      <ToastContainer />
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              src="/Logo.jpeg"
              className="img-fluid"
              alt="Sample image"
              width="550px"
              height="450px"
              style={{borderRadius:"25px 25px 250px 25px"} }
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            {isRegistered && (
              <div className="row d-flex justify-content-center">
                <div className="">
                  <div className="alert alert-success" role="alert" style={{backgroundColor:'transparent', color:'green', border:'none', marginLeft:'95px'}}>
                    Registration successful! Login here...
                  </div>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label" style={{color:'#1F316F'}} htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control form-control-lg"
                  placeholder="Enter Username..."
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="form-outline mb-3">
                <label className="form-label" style={{color:'#1F316F'}} htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password..."
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="rememberMe"
                    style={{color:'#1F316F'}}
                  />
                  <label className="form-check-label" style={{color:'#1F316F'}} htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text" style={{color:'#1F316F', textDecoration:'none'}}>
                  Forgot password?
                </a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-dark btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', backgroundColor:'#1F316F' }}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0" style={{color:'grey'}}>
                  Don't have an account?{' '}
                  <Link to="/register" className="link ms-2" style={{color:'#1F316F'}}>
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-info">
        <div className="text-white mb-3 mb-md-0">Copyright © 2024. All rights reserved.</div>
        <div>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-google"></i>
          </a>
          <a href="#!" className="text-white">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div> */}
    </section>
  );
};
