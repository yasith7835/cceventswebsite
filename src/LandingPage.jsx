import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from './userSlice'; // Assuming this is your Redux action
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SelectUser from './SelectUser.jsx'; // Assuming this is where you select user type
import TicketPurchasing from './TicketPurchasing.jsx'; // Assuming this is your ticket purchasing component

function LandingPage() {
  const login = useSelector((state) => state.user.login);
  const dispatch = useDispatch();

  const handleBuyNowClick = () => {
    if (!login) {
      // Redirect to SelectUser component if not logged in
      dispatch(setCurrentPage('selectUser'));
    } else {
      // Redirect to TicketPurchasing component if logged in
      dispatch(setCurrentPage('ticketPurchasing'));
    }
  };

  return (
    <>
      <Header />
      <button onClick={handleBuyNowClick}>Buy Now</button>
      <button>More Info</button>
      <img src="" alt="LandingImg" />
      <Footer />
    </>
  );
}

export default LandingPage;
