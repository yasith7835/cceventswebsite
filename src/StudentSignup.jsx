import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from './userSlice';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { PageBgImage } from './elems.jsx';

function StudentSignUp() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [user_id, setStudentId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordTyped, setIsPasswordTyped] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Avoid page reload
    const user_type = "student";

    // Validate Curtin ID length
    if (user_id.length != 8) {
      alert("Curtin ID must be exactly 8 characters long.");
      return;
    }

    // Validate phone length
    if (phone.length != 9) {
      alert("Phone number must be exactly 9 digits long.");
      return;
    }

    // Validate email format
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email address.");
      return;
    }

    // Validate password length
    if (password.length < 8) {
      alert("Password must be a minimum of 8 characters long.");
      return;
    }

    // Validate confirmed password
    if (password !== confirmPassword) {
      alert("Confirmed password does not match entered Password.");
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_KEY;
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id, password, first_name, last_name, phone: `0${phone}`, email, user_type })
      });

      const errorData = await response.json();
      if (response.ok) {
        console.log("Signup successful");
        dispatch(setCurrentPage('studentLogin'));
      } else {
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error: Signup Procedure', error);
      alert('An error occurred during signup. Please try again later.');
    }
  }

  const handleBackButton = () => {
    dispatch(setCurrentPage('studentLogin'));
  };

  return (
    <div style={{ minHeight: "100vh" }}>

      {Header('back', null, 'selectUser')}
      <div className="header-height" />
      {PageBgImage('/src/img/download.avif', 'center')}

      <br />
      <div className='section-container section-padding center-container'>
        <div className="max-width-container">
          <div className="info-card">

            <h2 className="info-card-title"> Sign up </h2>
            <form onSubmit={handleSubmit}>
              <p className='info-card-label'>First Name:</p>
              <input className="info-card-item" type="text" id="first_name" name="first_name" required
                onChange={(e) => setFirstName(e.target.value)}
              />
              <br /> <br />

              <p className='info-card-label'>Last Name:</p>
              <input className="info-card-item" type="text" id="last_name" name="last_name" required
                onChange={(e) => setLastName(e.target.value)}
              />
              <br /> <br />

              <p className='info-card-label'>Curtin ID:</p>
              <input className="info-card-item" type="text" id="curtinId" name="curtinId" required
                onChange={(e) => setStudentId(e.target.value)}
              />
              <br /> <br />

              <p className='info-card-label'>Phone:</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>+94</span>
                <input className="info-card-item" type="tel" id="phone" name="phone" required
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ marginLeft: '5px' }}
                />
              </div>
              <br />

              <p className='info-card-label'>Email:</p>
              <input className="info-card-item" type="email" id="email" name="email" required
                onChange={(e) => setEmail(e.target.value)}
              />
              <br /> <br />

              <p className='info-card-label'>Password:</p>
              <input className="info-card-item" type="password" id="password" name="password" required
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsPasswordTyped(e.target.value.length > 0); // Update the state
                }}
              />
              <br /> <br />

              <p className='info-card-label'>Confirm Password:</p>
              <input className="info-card-item" type="password" id="confirmPassword" name="confirmPassword" required
                disabled={!isPasswordTyped} // Disable if password is not typed
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <br /> <br />

              <button
                className="landing-button"
                style={{ width: "100%" }}
                type="submit"
                value="Login"
              >
                Sign Up
              </button>

            </form>
            <br />
            <label>Already have an account?</label>

            <p className='hyper-link-button'>Login</p>

          </div>
        </div>
      </div>

      <div style={{ height: "var(--footer-height)" }} />
      <Footer />
    </div>
  );
};

export default StudentSignUp;
