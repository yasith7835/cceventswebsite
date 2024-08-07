import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from './userSlice'; // Assuming this is your Redux action
import Header from './Header.jsx';
import Footer from './Footer.jsx';

function LandingPage() {
  const login = useSelector((state) => state.user.login);
  const dispatch = useDispatch();

  const handleBuyNowClick = () => {
    if (!login) {
      dispatch(setCurrentPage('selectUser'));
    } else {
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
