import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin, setCurrentPage } from './userSlice'; // Assuming these are your Redux actions


function Header(left=null, right=null, back_location='') {

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

  const handleProfileClick = () => {
    dispatch(setCurrentPage('profilePage'));
  };


  let fn = {
    login: login,
    handleLoginClick: handleLoginClick,
    handleProfileClick: handleProfileClick,
    dispatch: dispatch,
    setCurrentPage: setCurrentPage,
  };

  return (
    <div className="header">

      {getElement(left, fn, back_location)}
      <img src="/src/img/logo-header.png"/>
      {getElement(right, fn, back_location)}

    </div>
  );
}


function getElement(name, fn, back_location) {
  const handleBackButton = () => { fn.dispatch(fn.setCurrentPage(back_location)); };

  if (name == 'profile') return profile(fn.login, fn.handleLoginClick, fn.handleProfileClick);
  if (name == 'loginout') return loginout(fn.login, fn.handleLoginClick);
  if (name == 'back') return back(handleBackButton, fn.dispatch, fn.setCurrentPage);
  return empty();
}


function empty() {
  return (
    <div>
    </div>
  );
}

function back(handleBackButton) {
  return (
    <div className="icon-svg" onClick={handleBackButton}>
<svg viewBox="0 0 1024 1024" fill="#fff" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#fff" stroke-width="45.056"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z" fill=""></path></g></svg>
    </div>
  );
}


function profile(login, handleLoginClick, handleProfileClick) {
  return (
    <>
      {/* TODO: Currently using the same logo for login and logout, need to handle this properly. */}
      <div className="center-container" onClick={
          login ? handleProfileClick : handleLoginClick
      }>
        <div class="icon-svg">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
            <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </>
  );
}


function loginout(login, handleLoginClick) {
  return (
    <>
      <div className="center-container" onClick={handleLoginClick}>

        {login ? (
          <div class="icon-svg">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        ) : (
          <div class="icon-svg">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.00098 11.999L16.001 11.999M16.001 11.999L12.501 8.99902M16.001 11.999L12.501 14.999" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
        )}

      </div>
    </>
  );
}

export default Header;
