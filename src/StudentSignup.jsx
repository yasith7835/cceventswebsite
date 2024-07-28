import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from './userSlice';
import Footer from './Footer.jsx';

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

    try{
      const API_URL = import.meta.env.VITE_API_KEY;
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({user_id, password, first_name, last_name, phone: `0${phone}`, email, user_type})
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
    <>
      <button onClick={handleBackButton}>Back</button>
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name:</label>
        <input type="text" id="first_name" name="first_name" required
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="last_name">Last Name:</label>
        <input type="text" id="last_name" name="last_name" required
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="curtinId">Curtin ID:</label>
        <input type="text" id="curtinId" name="curtinId" required
          onChange={(e) => setStudentId(e.target.value)}
        />

        <label htmlFor="phone">Phone:</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>+94</span>
          <input type="tel" id="phone" name="phone" required
            onChange={(e) => setPhone(e.target.value)}
            style={{ marginLeft: '5px' }}
          />
        </div>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required
          onChange={(e) => {
            setPassword(e.target.value);
            setIsPasswordTyped(e.target.value.length > 0); // Update the state
          }}
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required
          disabled={!isPasswordTyped} // Disable if password is not typed
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <input type="submit" value="Sign Up" />
      </form>
      <label>Already have an account?</label>
      <a href='#'>Login</a>
      <Footer />
    </>
  );
};

export default StudentSignUp;
