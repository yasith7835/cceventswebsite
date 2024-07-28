import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from './userSlice'; 

function SelectUser() {
  const dispatch = useDispatch();

  const handleStudentLogin = () => {
    dispatch(setCurrentPage('studentLogin')); 
  };

  const handleGuestLogin = () => {
    dispatch(setCurrentPage('guestLogin')); 
  };

  const handleBackButton = () => {
    dispatch(setCurrentPage('landing'));
  };

  return (
    <div>
      <button onClick={handleBackButton}>Back</button>
      <button onClick={handleStudentLogin}>Student Login</button>
      <button onClick={handleGuestLogin}>Guest Login</button>
    </div>
  );
}

export default SelectUser;
