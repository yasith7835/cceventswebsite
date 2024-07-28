import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin, setCurrentPage } from './userSlice';
import Footer from './Footer.jsx';
import "./css/Modal.css";

function StudentLogin() {
    const [studentId, setStudentId] = useState("");
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
                    user_id: studentId,
                    password: password
                }),
            });
            const loginData = await response.json();
            alert(loginData.message);
            if (response.ok) {
                dispatch(setLogin(true));
                dispatch(setCurrentPage('landing'));
            }
        } catch (error) {
            console.error(error);
            alert("Error: " + error.message);
        }
    };

    const handleCreateAccountClick = () => {
        dispatch(setCurrentPage('studentSignup'));
    };

    const handleBackButton = () => {
        dispatch(setCurrentPage('selectUser'));
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
            <button onClick={handleBackButton}>Back</button>
            <h3>Student Login</h3>
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
            <button onClick={toggleModal} className="btn-modal">Forgot Password?</button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>Reset Password</h2>
                        {!otpSent ? (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span>Curtin ID</span>
                                    <input
                                        type="text"
                                        id="curtinId"
                                        name="curtinId"
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

export default StudentLogin;
