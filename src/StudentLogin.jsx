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

                <input type="submit" value="Login" />
            </form>

            <label>Don't have an account yet?</label>
            <button onClick={handleCreateAccountClick}>Create One</button>

            <Footer />
        </>
    );
}

export default Login;
