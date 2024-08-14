import React, { useState, useEffect } from 'react';
import Footer from './Footer.jsx';
const API_URL = import.meta.env.VITE_API_KEY;
import { useDispatch } from 'react-redux';
import { setCurrentPage } from './userSlice';

function TicketPurchasing() {
  const [ntickets, setNTickets] = useState(0);
  const [ticketType, setTicketType] = useState('');
  const [total, setTotal] = useState(0);
  const [paymentData, setPaymentData] = useState(null);
  const dispatch = useDispatch();

  const calculateTotalPrice = (ntickets, ticketType) => {
    const pricePerTicket = {
      vip: 100,
      regular: 50,
    };

    const totalPrice = parseInt(ntickets, 10) * pricePerTicket[ticketType];
    setTotal(totalPrice);
  };

  // Load the PayHere script
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

  // Fetch payment data from the backend
  const fetchPaymentData = async () => {
    try {
      const response = await fetch(`${API_URL}/payhere`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ntickets, ticketType }),
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

  // Handle payment initiation
  const handlePayment = (paymentData) => {
    const payment = {
      sandbox: true,
      merchant_id: paymentData.merchant_id,
      return_url: "http://localhost:3000/return",
      cancel_url: "http://localhost:3000/cancel",
      notify_url: "http://localhost:3000/notify",
      order_id: paymentData.order_id,
      items: paymentData.items,
      amount: paymentData.amount,
      currency: "LKR",
      hash: paymentData.hash,
      first_name: "Saman",
      last_name: "Perera",
      email: "himeshdevelopment@gmail.com",
      phone: "0771234567",
      address: "No.1, Galle Road",
      city: "Colombo",
      country: "Sri Lanka",
    };

    payhere.startPayment(payment);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Avoid page reload
    const data = await fetchPaymentData(); // Fetch payment data after form submission
    if (data) {
      handlePayment(data); // Initiate payment process if data is fetched successfully
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
