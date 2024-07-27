import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin, setCurrentPage } from './userSlice';
import Footer from './Footer.jsx';
import "./css/Modal.css";

function Login() {
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [modal, setModal] = useState(false);
    const [recoveryId, setRecoveryId] = useState("");

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
                  user_id: studentId,
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
        dispatch(setCurrentPage('studentSignup'));
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

        }catch(error) {
            console.error(error);
            alert("Error: " + error.message);
        }
    };

    const toggleModal = () => {
        setModal(!modal);
      };

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    
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
            <button onClick={toggleModal} className="btn-modal">Forgot Password?</button>
            
            {modal && (
                <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    <h2>Reset Password</h2>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>Curtin ID</span>
                    <input type="text" id="curtinId" name="curtinId" required
                        onChange={(e) => setRecoveryId(e.target.value)}
                        style={{ marginLeft: '5px' }}
                    />
                    </div>
                    <button onClick={handleGetOtpClick}>Get OTP to my email</button>
                    <button className="close-modal" onClick={toggleModal}>CLOSE</button>
                </div>
                </div>
            )}
            <Footer />
        </>
    );
}

export default Login;
