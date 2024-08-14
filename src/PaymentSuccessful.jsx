import React, { useRef, useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
const API_URL = import.meta.env.VITE_API_KEY;
import { useDispatch } from 'react-redux';
import { setCurrentPage } from './userSlice';

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

  return (
    <div>
      <h1>Your payment was successful!</h1>
      {codes.regular_code && (
        <div>
          <p>You can view this QR code in your Profile.</p>
          <div ref={regularQrRef}>
            <QRCode value={codes.regular_code} />
          </div>
          <button onClick={() => downloadQR(codes.regular_code, regularQrRef)}>Download Regular QR Code</button>
          <button onClick={handleDoneButton}>Done!</button>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccessful;
