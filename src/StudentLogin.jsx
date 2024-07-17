import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin, setCurrentPage } from './userSlice'; // Assuming these are your Redux actions
import Footer from './Footer.jsx';

function Login() {
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Logging in...');

        dispatch(setLogin(true)); 

        try{
            const API_URL = import.meta.env.VITE_API_KEY;
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  user_id: studentId,
                  password: password
                }),
              });
            const loginData = await response.json();
            alert(loginData.message);
        }catch(error){
            alert("Error: " + error.message)
        }

        dispatch(setCurrentPage('landing')); 
    };

    const handleCreateAccountClick = () => {
        
        console.log('Navigate to create account page...');
        
    };

    return (
        <>
            <button>Back</button>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="studentId">StudentId:</label>
                <input
                    type="text"
                    id="studentId"
                    name="studentID"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" value="Login">Login</button>
            </form>

            <label>Don't have an account yet?</label>
            <button onClick={handleCreateAccountClick}>Create One</button>

            <Footer />
        </>
    );
}

export default Login;
