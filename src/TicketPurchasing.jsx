import React, { useState } from 'react';
import Footer from './Footer.jsx';
const API_URL = import.meta.env.VITE_API_KEY;
import { useDispatch } from 'react-redux';
import { setCurrentPage } from './userSlice';


function TicketPurchasing() {
  const [ntickets, setNTickets] = useState(0);
  const [ticketType, setTicketType] = useState('');
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  const calculateTotalPrice = (ntickets, ticketType) => {
    const pricePerTicket = {
      vip: 100,
      regular: 50,
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

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        dispatch(setCurrentPage('qrpage'));

        
      } else {
        console.error('Error: Payment unsuccessful');
        alert('Payment Failed');
      }
    } catch (error) {
      console.error('Error: Payment unsuccessful', error);
    }
  };

  return (
    <>
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
      </form>

      <div>
        <h4>Ticket Policy</h4>
        <p>All sales are final. No refunds or exchanges.</p>
      </div>

      <Footer />
    </>
  );
}

export default TicketPurchasing;
