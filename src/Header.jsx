import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin, setCurrentPage } from './userSlice'; // Assuming these are your Redux actions

function Header() {
  const login = useSelector((state) => state.user.login);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_KEY;

        const response = await fetch(`${API_URL}/checkSession`, {
          method: 'POST',
          credentials: 'include', 
        });

        if (response.ok) {
          dispatch(setLogin(true));
        } else {
          dispatch(setLogin(false));
        }
      } catch (error) {
        console.error('Error checking session:', error);
        dispatch(setLogin(false));
      }
    };

    checkSession();
  }, []);

  const handleLoginClick = async (e) => {
    e.preventDefault();
    if (login) {
      try {
        const API_URL = import.meta.env.VITE_API_KEY;
        const response = await fetch(`${API_URL}/logout`, {
          method: 'POST',
          credentials: 'include',
        });
        if (response.ok) {
          alert("Logged out.");
          dispatch(setLogin(false));
        } else {
          throw new Error("Error logging out");
        }
      } catch (error) {
        alert("Error: " + error.message);
      }
    } else {
      dispatch(setLogin(true));
      dispatch(setCurrentPage('selectUser'));
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
