import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from './userSlice'; 

import { PageBgImage } from './elems.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

import './css/SelectUser.css';


function SelectUser() {
  const dispatch = useDispatch();

  const handleStudentLogin = () => {
    dispatch(setCurrentPage('studentLogin')); 
  };

  const handleGuestLogin = () => {
    dispatch(setCurrentPage('guestLogin')); 
  };

  return (
    <>
      { Header('back', null, 'landing') }
      { PageBgImage('/src/img/landing-bg-placeholder-3.jpg') }

    <div>

      {/* FIXME: */} 
      <br/> <br/> <br/>
      <br/> <br/> <br/>

      <div className="login-selection-container">

        <div className="user-login-btn" onClick={handleStudentLogin}>
          <div>
            <svg fill="#cc9900" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" viewBox="1052 796 200 200" enableBackground="new 1052 796 200 200" xml="preserve" stroke="#cc9900"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M1151.998,921.75c-4.129,0-8.17-0.771-12.01-2.292l-50.167-19.888c0,11.08,0,27.65,0,32.066 c0,15.562,27.836,28.174,62.178,28.174s62.181-12.612,62.181-28.174v-32.067l-50.172,19.889 C1160.168,920.979,1156.127,921.75,1151.998,921.75z"></path> <path d="M1248.592,867.082l-87.989-34.878c-5.526-2.19-11.681-2.19-17.208,0l-87.988,34.878c-2.057,0.815-3.407,2.804-3.407,5.016 c0,2.213,1.351,4.201,3.407,5.017l12.317,4.882v34.925c-2.736,1.865-4.533,5.007-4.533,8.568c0,3.262,1.508,6.171,3.863,8.071 l-3.751,18.007c-0.503,2.416,0.108,4.931,1.666,6.845c1.557,1.915,3.894,3.026,6.361,3.026h4.449c2.468,0,4.804-1.111,6.361-3.026 c1.557-1.914,2.168-4.429,1.666-6.845l-3.752-18.007c2.356-1.9,3.864-4.81,3.864-8.071c0-3.562-1.797-6.703-4.533-8.568v-30.303 l63.729,25.264c5.708,2.263,12.063,2.263,17.771,0l87.709-34.768c2.057-0.815,3.407-2.804,3.407-5.017 C1252,869.886,1250.649,867.897,1248.592,867.082z"></path> </g> </g></svg>
          </div>
          <p> Student Login </p>
        </div>

        <div className="user-login-btn" onClick={handleGuestLogin}>
          <div>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#cc9900"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clipRule="evenodd" d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z" fill="#cc9900"></path></g></svg>
          </div>
          <p> Guest Login </p>
        </div>
      <div>
      </div>

      </div>

    </div>

    <Footer/>
  </>
  );
}

export default SelectUser;
