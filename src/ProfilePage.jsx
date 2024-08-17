import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from './userSlice';
import QRCode from 'qrcode.react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

import './css/App.css';
import './css/ProfilePage.css';

const API_URL = import.meta.env.VITE_API_KEY;

function ProfilePage() {
  const regularQrRef = useRef();
  const [profile, setProfile] = useState(null); // State to store profile data
  const [codes, setCodes] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProfileData();
    fetchCodes();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const { response: data } = await response.json();
        setProfile(data); // Store the profile data in state
      } else if (response.status === 401) {
        alert("Unauthorized access. Please log in.");
        dispatch(setCurrentPage('login')); // Redirect to login if not authorized
      } else {
        alert("Error fetching profile data");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const fetchCodes = async () => {
    try {
      const response = await fetch(`${API_URL}/getGeneratedCodes`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch ticket codes');
      }

      const data = await response.json();
      setCodes(data);
    } catch (error) {
      console.error('Error fetching ticket codes:', error.message);
    }
  };

  const downloadQR = (code, ref) => {
    const canvas = ref.current.querySelector('canvas');
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${code}.png`;
    downloadLink.click();
  };

  const handleBackButton = () => {
    dispatch(setCurrentPage('landing')); // Navigate back to the landing page
  };

  return (
    <>
      <Header />
      <div className="profile-bg-image" />
      <div className="landing-bg-overlay"/>
      <br /><br /><br /> {/* FIXME: */}

      <button onClick={handleBackButton}>Back</button>
      <br /><br />

      {profile ? (
        <div className='section-container section-padding'>

          <h2 className="title-user-name">Hello {profile.first_name} {profile.last_name}!</h2>
          <div className="info-card">

            <p className='profile-info-title'>User ID:</p>
            <p className='profile-info-detail'>{profile.user_id}</p>
            <br />

            <p className='profile-info-title'>Phone:</p>
            <p className='profile-info-detail'>{profile.phone}</p>
            <br />

            <p className='profile-info-title'>Email:</p>
            <p className='profile-info-detail'>{profile.email}</p>
              
            <br />

            <p className='profile-info-title'>Tickets:</p>
            { codes.regular_code ? (
              <>
              <div className='profile-info-detail'>
              <br />
                <div className='center-container' ref={regularQrRef}>
                  <QRCode value={codes.regular_code} />
                </div>
                <br />
              <p style={{ textAlign: "center" }}>
                You currently have <strong>{profile.n_tickets_bought}</strong> regular tickets.
              </p>
              <br />
              <div className='center-container'>
                <button style={{
                  padding: "1rem",
                  borderRadius: "10px",
                  background: "rgba(0, 0, 0, 0)",
                  color: "var(--color-gold)",
                  border: "2px solid var(--color-gold)",
                  }}
                  onClick={() => downloadQR(codes.regular_code, regularQrRef)}>Download QR Code</button>
              </div>
              <br />
              </div>
              </>
            ) : (
              <p className='profile-info-detail'>You have no purchased tickets.</p>
            )}
          </div>
        </div>


      ) : (
        <p>Loading profile data...</p>
      )}
      <Footer />
    </>
  );
}

export default ProfilePage;
