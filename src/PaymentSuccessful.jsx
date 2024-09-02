import React, { useRef, useEffect, useState } from 'react';
import QRCode from 'qrcode.react';


import { useDispatch } from 'react-redux';
import { setCurrentPage } from './userSlice';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { PageBgImage } from './elems.jsx';

import confetti from 'canvas-confetti';


// FIXME: The environment variable name is mis leading (rename it).
const API_URL = import.meta.env.VITE_API_KEY;

const PaymentSuccessful = () => {
  const regularQrRef = useRef();
  const [codes, setCodes] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCodes();

    // Comment out the line below to use hardcoded codes
    /*setHardcodedCodes();*/
  }, []);

  // Method to set hardcoded codes for testing
  const setHardcodedCodes = () => {
    setCodes({
      regular_code: 'REG67890' // Hardcoded regular code
    });
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

  const handleDoneButton = () => {
    dispatch(setCurrentPage('landing')); // Navigate back to the landing page
  };

  const handleProfileButtonClick = () => {
    dispatch(setCurrentPage('profilePage')); // Navigate to the profile page
  };

var end = Date.now() + (15 * 1000);

// go Buckeyes!
var colors = ['#cc9900', '#ffffff'];


var count = 200;
var defaults = {
  origin: { y: 0.7 }
};

function fire(particleRatio, opts) {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio)
  });
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});
fire(0.2, {
  spread: 60,
});
fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8
});
fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2
});
fire(0.1, {
  spread: 120,
  startVelocity: 45,
});




  return (
    <div style={{ minHeight: "100vh" }}>
      { Header('back', null, 'landing') }
      <div className="header-height"/>
      { PageBgImage() }

      <h1>Your payment was successful!</h1>
      {codes.regular_code && (
        <div>
          <p>You can view this QR code in your Profile.</p>
          <div ref={regularQrRef}>
            <QRCode value={codes.regular_code} />
          </div>
          <button onClick={() => downloadQR(codes.regular_code, regularQrRef)}>Download Regular QR Code</button>
          <button onClick={handleProfileButtonClick}>Go to My Profile</button>
          <button onClick={handleDoneButton}>Done!</button>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccessful;
