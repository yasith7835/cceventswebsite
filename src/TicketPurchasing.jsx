import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_KEY;

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { PageBgImage } from './elems.jsx';

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

    try {
      const response = await fetch(`${API_URL}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ntickets }),
      });

      if (response.status === 200) {
        const result = await response.json();
        console.log(result);
        dispatch(setCurrentPage('paymentSuccessful'));
      } 
      else if(response.status === 403) {
        const result = await response.json();
        console.error('Error:', result.error);
        alert(result.error);
      }
      else if(response.status === 400) {
        const result = await response.json();
        console.error('Error:', result.error);
        alert(result.error);
      }
    } catch (error) {
      console.error('Error: Payment unsuccessful', error);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
      document.body.classList.add('active-modal')
  } else {
      document.body.classList.remove('active-modal')
  }

  return (
    <>
    { Header('back', null, 'landing') }
    <div className="header-height"/>
    { PageBgImage('/src/img/download.avif', 'center') }

    <div className='section-container section-padding'>
      <h2 className="info-card-title">Tickets</h2>

      <div className="info-card">
      <form onSubmit={handleSubmit}>
      <p className="info-card-label">Seat Type:</p>
        <select
          className="info-card-item"
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

        { ticketType === "vip" ? (
          <div>
            <p className="info-card-label">Contact Event Organizers</p>
            <p className="info-card-item">
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
            <p className="info-card-label">Number of Tickets:</p>
            <input
              className="info-card-item"
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
            <p className="info-card-label">Total: Rs. {total || 0}</p>
            <br />
            <div className="center-container">
            <input className="landing-button" type="submit" value="Checkout" />
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

