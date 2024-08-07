import React from 'react';
import { useSelector } from 'react-redux';
import LandingPage from './LandingPage.jsx';
import StudentLogin from './StudentLogin.jsx';
import GuestLogin from './GuestLogin.jsx';
import StudentSignup from './StudentSignup.jsx';
import GuestSignup from './GuestSignup.jsx';
import TicketPurchasing from './TicketPurchasing.jsx';
import SelectUser from './SelectUser.jsx';
import QrPage from './QrPage.jsx'; 
import ProfilePage from './ProfilePage.jsx';

function App() {
  const currentPage = useSelector((state) => state.user.currentPage);

  // Render the component based on currentPage
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'studentLogin':
        return <StudentLogin />;
      case 'guestLogin':
        return <GuestLogin />;
      case 'studentSignup':
        return <StudentSignup />;
      case 'guestSignup':
        return <GuestSignup />;
      case 'ticketPurchasing':
        return <TicketPurchasing />;
      case 'selectUser':
        return <SelectUser />;
      case 'qrpage':
        return <QrPage />;
      case 'profilePage':
        return <ProfilePage />
      default:
        return <LandingPage />;
    }
  };

  return (
    <>
      {renderPage()}
     

    </>
  );
}

export default App;
