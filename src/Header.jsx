import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin, setCurrentPage } from './userSlice'; // Assuming these are your Redux actions

function Header() {
  const login = useSelector((state) => state.user.login);
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    if (login) {
      dispatch(setLogin(false)); // Logout action
    } else {
      dispatch(setLogin(true)); // Login action
      dispatch(setCurrentPage('selectUser')); // Navigate to SelectUser page
    }
  };

  return (
    <div className="header">
      <p>Header</p>
      {login ? (
        <button onClick={handleLoginClick}>Logout</button>
      ) : (
        <button onClick={handleLoginClick}>Login</button>
      )}
    </div>
  );
}

export default Header;
