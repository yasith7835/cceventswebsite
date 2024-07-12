import React, { useState } from 'react';
import Footer from './Footer.jsx';

function TicketPurchasing() {
  const [seatType, setSeatType] = useState("");
  const [numTickets, setNumTickets] = useState(0);
  const [total, setTotal] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Checkout', { seatType, numTickets, total });
  };

  return (
    <>
      <h3>Tickets</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="seatType">Seat Type:</label>
        <input type="text" id="seatType" name="seatType" required
          onChange={(e) => setSeatType(e.target.value)}
        />

        <label htmlFor="numTickets">Number of Tickets:</label>
        <input type="number" id="numTickets" name="numTickets" required min="1"
          onChange={(e) => setNumTickets(e.target.value)}
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
