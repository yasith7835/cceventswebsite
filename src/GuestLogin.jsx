import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin, setCurrentPage } from './userSlice';

import './css/GuestLogin.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

import "./css/Modal.css";

function GuestLogin() {
    const [guestId, setGuestId] = useState("");
    const [password, setPassword] = useState("");
    const [modal, setModal] = useState(false);
    const [recoveryId, setRecoveryId] = useState("");
    const [otpSent, setOtpSent] = useState(false); // State to track OTP request status
    const [otp, setOtp] = useState(""); // State to track the entered OTP
    const [otpConfirmed, setOtpConfirmed] = useState(false); // State to track OTP confirmation status
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [isPasswordTyped, setIsPasswordTyped] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Logging in...');
        try {
            const API_URL = import.meta.env.VITE_API_KEY;
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    user_id: guestId,
                    password: password,
                    user_type: "guest"
                }),
            });
            const loginData = await response.json();
            if (response.ok) {
                dispatch(setLogin(true));
                dispatch(setCurrentPage('landing'));
            }
            else {
                alert(loginData.message);
            }
        } catch (error) {
            console.error(error);
            alert("Error: " + error.message);
        }
    };

    const handleCreateAccountClick = () => {
        dispatch(setCurrentPage('guestSignup'));
    };

    const handleGetOtpClick = async (e) => {
        e.preventDefault();
        try {
            const API_URL = import.meta.env.VITE_API_KEY;
            const response = await fetch(`${API_URL}/forgotPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    user_id: recoveryId,
                }),
            });
            const recoveryStatus = await response.json();
            alert(recoveryStatus.message);
            console.log(recoveryStatus.message);
            if (response.status == 200) {
                setOtpSent(true);
            }

        } catch (error) {
            console.error(error);
            alert("Error: " + error.message);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            const API_URL = import.meta.env.VITE_API_KEY;
            const response = await fetch(`${API_URL}/confirmOtp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    user_id: recoveryId,
                    otp: otp,
                }),
            });
            const otpConfirmation = await response.json();
            alert(otpConfirmation.message);
            if (response.status == 200) {
                setOtpConfirmed(true);
            }
        } catch (error) {
            console.error(error);
            alert("Error: " + error.message);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        // Validate new password length
        if (newPassword.length < 8) {
            alert("Password must be a minimum of 8 characters long.");
            return;
        }

        // Validate confirmed password
        if (newPassword !== confirmNewPassword) {
            alert("Confirmed password does not match entered Password.");
            return;
        }
        try {
            const API_URL = import.meta.env.VITE_API_KEY;
            const response = await fetch(`${API_URL}/resetPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    user_id: recoveryId,
                    password: newPassword,
                    otp: otp,
                }),
            });
            const resetStatus = await response.json();
            alert(resetStatus.message);
            if (response.status == 200) {
                setModal(false);
            }
        } catch (error) {
            console.error(error);
            alert("Error: " + error.message);
        }
    };

    const toggleModal = () => {
        setModal(!modal);
        if (!modal) {
            setOtpSent(false); // Reset OTP status when closing the modal
            setOtpConfirmed(false); // Reset OTP confirmation status when closing the modal
            setRecoveryId(""); // Reset recoveryId when closing the modal
            setOtp(""); // Reset OTP when closing the modal
            setNewPassword(""); // Reset new password when closing the modal
            setConfirmNewPassword(""); // Reset confirm new password when closing the modal
        }
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
            {Header('back', null, 'selectUser')}
            <div className="bg-image-guest-login" />
            <div className="bg-overlay" />
            <br /><br /><br /><br /> {/* FIXME: */}

            <div className='section-container section-padding'>
                <h2 className="title-user-name">Guest Login</h2>
                <div className="info-card">

                    <form onSubmit={handleSubmit}>
                        <p className="profile-info-title">NIC:</p>
                        <input
                            className='profile-info-detail'
                            type="text"
                            id="guestId"
                            name="guestId"
                            required
                            value={guestId}
                            onChange={(e) => setGuestId(e.target.value)}
                        />
                        <br />
                        <br />

                        <p className="profile-info-title">Password:</p>
                        <input
                            className='profile-info-detail'
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br /><br />

                        <input
                            className='landing-button'
                            style={{ width: "100%" }}
                            type="submit" value="Login" />
                    </form>

                    <br />
                    <p className='fade-text'>Don't have an account yet?</p>
                    <div className='fade-text hyper-link-button-container'>
                        <p className='hyper-link-button' onClick={handleCreateAccountClick}>Create One</p>
                        <p className='hyper-link-button btn-modal' onClick={toggleModal}>Forgot Password?</p>
                    </div>

                </div>

            </div>


            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>Reset Password</h2>
                        {!otpSent ? (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span>NIC</span>
                                    <input
                                        type="text"
                                        id="nic"
                                        name="nic"
                                        required
                                        onChange={(e) => setRecoveryId(e.target.value)}
                                        style={{ marginLeft: '5px' }}
                                    />
                                </div>
                                <button onClick={handleGetOtpClick}>Get OTP to my email</button>
                            </>
                        ) : otpConfirmed ? (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span>New Password</span>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        required
                                        onChange={(e) => {
                                            setNewPassword(e.target.value);
                                            setIsPasswordTyped(e.target.value.length > 0);
                                        }}
                                        style={{ marginLeft: '5px' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span>Confirm New Password</span>
                                    <input
                                        type="password"
                                        id="confirmNewPassword"
                                        name="confirmNewPassword"
                                        required
                                        disabled={!isPasswordTyped} // Disable if password is not typed
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        style={{ marginLeft: '5px' }}
                                    />
                                </div>
                                <button onClick={handlePasswordReset}>Reset Password</button>
                            </>
                        ) : (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span>Enter OTP</span>
                                    <input
                                        type="text"
                                        id="otp"
                                        name="otp"
                                        required
                                        onChange={(e) => setOtp(e.target.value)}
                                        style={{ marginLeft: '5px' }}
                                    />
                                </div>
                                <button onClick={handleOtpSubmit}>Confirm OTP</button>
                            </>
                        )}
                        <button className="close-modal" onClick={toggleModal}>CLOSE</button>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}

export default GuestLogin;
