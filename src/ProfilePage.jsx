import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from './userSlice';
import QRCode from 'qrcode.react';
import Footer from './Footer.jsx';
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
      <button onClick={handleBackButton}>Back</button>
      {profile ? (
        <div>
          <h2>Hello {profile.first_name} {profile.last_name}!</h2>
          <p><strong>User ID:</strong> {profile.user_id}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          {codes.regular_code ? (
            <div>
              <p>You currently have <strong>{profile.n_tickets_bought}</strong> regular tickets.</p>
              <div ref={regularQrRef}>
                <QRCode value={codes.regular_code} />
              </div>
              <button onClick={() => downloadQR(codes.regular_code, regularQrRef)}>Download QR Code</button>
            </div>
          ) : (
            <p>You have no purchased tickets.</p>
          )}
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
      <Footer />
    </>
  );
}

export default ProfilePage;
