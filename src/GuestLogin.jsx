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
        dispatch(setLogin(true));
        dispatch(setCurrentPage('landing'));
    };

    const handleCreateAccountClick = () => {
        console.log('Navigate to create account page...');
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
