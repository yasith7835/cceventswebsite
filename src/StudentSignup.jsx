import React, { useState } from 'react';
import Footer from './Footer.jsx';

function StudentSignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [curtinId, setCurtinId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Handle Submit');
  }

  return (
    <>
      <button>Back</button>
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" required
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" required
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="curtinId">Curtin ID:</label>
        <input type="text" id="curtinId" name="curtinId" required
          onChange={(e) => setCurtinId(e.target.value)}
        />

        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" required
          onChange={(e) => setPhone(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required
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
