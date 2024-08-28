import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_KEY;

import Header from './Header.jsx';
import Footer from './Footer.jsx';

import { useDispatch } from 'react-redux';
import { setCurrentPage } from './userSlice';

import "./css/Modal.css";
import './css/TicketPurchasing.css';

function TicketPurchasing() {
  const [ntickets, setNTickets] = useState(0);
  const [ticketType, setTicketType] = useState('');
  const [total, setTotal] = useState(0);
  const [modal, setModal] = useState(true);// Modal is visible as default
  const dispatch = useDispatch();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      console.log('PayHere script loaded successfully.');
    };

    script.onerror = () => {
      console.error('Failed to load PayHere script.');
    };

    return () => {
      document.body.removeChild(script);
    };

    
  }, []);

  const fetchPaymentData = async () => {
    try {
      const response = await fetch(`${API_URL}/payhere`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ntickets}),
      });

      if (response.ok) {
        const data = await response.json();
        setPaymentData(data);
        console.log(data);
        return data;
      } else {
        console.error('Error: Payment data retrieval failed');
        alert('Failed to retrieve payment data');
      }
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  };
   
  const handlePayment = (paymentData) => {
    const payment = {
      sandbox: true,
      merchant_id: paymentData.merchant_id,
      return_url: `${API_URL}/`,
      cancel_url: `${API_URL}/`,
      notify_url: `${API_URL}/notify`,
      order_id: paymentData.order_id,
      items: paymentData.items,
      amount: paymentData.amount,
      currency: "LKR",
      hash: paymentData.hash,
      first_name: paymentData.first_name,
      last_name: paymentData.last_name,
      email: paymentData.email,
      phone: paymentData.phone,
      address: " ",
      city: " ",
      country: " ",
    };

    payhere.startPayment(payment);

    payhere.onCompleted = function onCompleted(orderId) {
      console.log("Payment completed. OrderID:" + orderId);
      dispatch(setCurrentPage('paymentSuccessful'));
      
  };

    // Payment window closed
payhere.onDismissed = function onDismissed() {
    // Note: Prompt user to pay again or show an error page
    console.log("Payment dismissed");
};

// Error occurred
payhere.onError = function onError(error) {
    // Note: show an error page
    console.log("Error:"  + error);
};
  };

  

  const calculateTotalPrice = (ntickets, ticketType) => {
    const pricePerTicket = {
      vip: 100,
      regular: 2000,
    };
    const totalPrice = parseInt(ntickets, 10) * pricePerTicket[ticketType];
    setTotal(totalPrice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Avoid page reload
    const data = await fetchPaymentData();
    if (data) {
       handlePayment(data); 
      
    }
    
  };

  
  



  const toggleModal = () => {
    setModal(!modal)
  };

  if (modal) {
      document.body.classList.add('active-modal')
  } else {
      document.body.classList.remove('active-modal')
  }

  return (
    <>
    { Header('back', null, 'landing') }

    <div className="bg-image" />
    <div className="bg-overlay"/>
    {/* FIXME: */}
    <br /><br /><br /><br />

    <div className='section-container section-padding'>
      <h2 className="title-user-name">Tickets</h2>

      <div className="info-card">
      <form onSubmit={handleSubmit}>
      <p className='profile-info-title'>Seat Type:</p>
        <select
          className='profile-info-detail'
          id="seatType"
          name="seatType"
          required
          onChange={(e) => {
            setTicketType(e.target.value);
            calculateTotalPrice(ntickets, e.target.value);
          }}
        >
          <option value="">Select ticket type</option>
          <option value="vip">VIP</option>
          <option value="regular">Regular</option>
        </select>
      <br /><br />

        {ticketType === "vip" ? (
          <div>
            <p className='profile-info-title'>Contact Event Organizers</p>
            <p className='profile-info-detail'>
              Name: Lishan Hettipathirana<br/>
              Phone: +94 76 325 7943<br/>
              <br />
              Name: Jaden Christy<br/>
              Phone: +94 71 081 9950<br/>
              <br />
              <p>curtincolombo.eventsteam@gmail.com</p>
            </p>


          </div>
        ) : (
          <>
            <p className='profile-info-title'>Number of Tickets:</p>
            <input
              className='profile-info-detail'
              type="number"
              id="numTickets"
              name="numTickets"
              required
              min="1"
              max="10"
              onChange={(e) => {
                setNTickets(e.target.value);
                calculateTotalPrice(e.target.value, ticketType);
              }}
            />
            <br />
            <br />
            <p className='profile-info-title'>Total: Rs. {total || 0}</p>
            <br />
            <div className="center-container">
            <input className='landing-button' type="submit" value="Checkout" />
            </div>
          </>
        )}
      </form>
      </div>

    </div>



      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Ticketing Policy</h2>
            <h3>Please Note</h3>
            <ul>
              <li>Tickets once bought cannot be refunded.</li>
              <li>Each person is limited to a total of 10 tickets.</li>
              <li>The number of tickets can only be changed before the payment has been processed.</li>
              <li>Tickets cannot be resold at any given time.</li>
            </ul>
            <p>For more details, please read the Conditions and Privacy Policy mentioned below.</p>

            <div className="close-modal" onClick={toggleModal}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default TicketPurchasing;

