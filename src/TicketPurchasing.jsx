import React, { useState } from 'react';
import Footer from './Footer.jsx';
const API_URL = import.meta.env.VITE_API_KEY;
import { useDispatch } from 'react-redux';
import { setCurrentPage } from './userSlice';
import "./css/Modal.css";

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

  const handleBackButton = () => {
    dispatch(setCurrentPage('landing')); // Navigate back to the landing page
  };

  return (
    <>
      <button onClick={handleBackButton}>Back</button>
      <h3>Tickets</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="seatType">Seat Type:</label>
        <select
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

        {ticketType === "vip" ? (
          <div>
            <h4>Contact Event Organizers</h4>
            <p>Achira Senanayake</p>
            <p>Phone: +94 77 670 5646</p>
            <p>Email: something@example.com</p>
          </div>
        ) : (
          <>
            <label htmlFor="numTickets">Number of Tickets:</label>
            <input
              type="number"
              id="numTickets"
              name="numTickets"
              required
              min="1"
              onChange={(e) => {
                setNTickets(e.target.value);
                calculateTotalPrice(e.target.value, ticketType);
              }}
            />
            <label>Total: Rs.{total}</label>
            <input type="submit" value="Checkout" />
          </>
        )}
      </form>

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
            <button className="close-modal" onClick={toggleModal}>CLOSE</button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default TicketPurchasing;

