import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin, setCurrentPage } from './userSlice';
import Footer from './Footer.jsx';

function GuestLogin() {
    const [guestId, setGuestId] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Logging in...'); 
        try{
            const API_URL = import.meta.env.VITE_API_KEY;
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                  user_id: guestId,
                  password: password
                }),
              });
            const loginData = await response.json();
            alert(loginData.message);
            if(response.ok){            
                dispatch(setLogin(true)); 
                dispatch(setCurrentPage('landing'));
            }
        }catch(error){
            console.error(error);
            alert("Error: " + error.message);
        }
    };

    const handleCreateAccountClick = () => {
        dispatch(setCurrentPage('guestSignup'));
    };

    return (
        <>
            <button>Back</button>
            <form onSubmit={handleSubmit}>
                <h3>Guest Login</h3>
                <label htmlFor="guestId">NIC:</label>
                <input
                    type="text"
                    id="guestId"
                    name="guestId"
                    required
                    value={guestId}
                    onChange={(e) => setGuestId(e.target.value)}
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

export default GuestLogin;
