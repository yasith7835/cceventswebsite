import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from './userSlice'; // Assuming this is your Redux action

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { PageBgImage } from './elems.jsx';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import './css/LandingPage.css';

function buyNow() {
  window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
}

function openWhatsapp() {
  window.location.href = "https://Wa.me/+94710819950";
}

function openTikTok() {
  window.location.href = "https://www.tiktok.com/@manifest.curtin";;
}

function openInsta() {
  window.location.href = "https://www.instagram.com/manifest.curtin";
}


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

      {/* The background image that covers the entire page. */}
      { Header('profile', 'loginout') }
      { PageBgImage('/src/img/bg3.jpg') }

      { heroSection(handleBuyNowClick) }
      { eventInfo() }
      { artistsLineup() }
      { venueSection() }
      { contactSection() }

      <br/>
      {/* <Footer/> */}
    </>
  );
}

// -----------------------------------------------------------------------------
// Simaller components.
// -----------------------------------------------------------------------------


function moreInfoClicked() {
  const windowHeight = window.innerHeight;
  window.scrollTo(0, windowHeight); // TODO: Debug this.
}


function heroSection(handleBuyNowClick) {

  return (
    <div className="landing-main-section">

      <img className="landing-img-manifest" src='/src/img/manifest24.png'/>

      <p className="landing-subtitle">
        Embark on a journey of discovery! Explore the dynamic events
        curated by the Curtin Colombo Events Team
      </p>

      <div className="landing-button-container">
        {/* <button className="landing-button" onClick={handleBuyNowClick}>Buy Now</button> */}
        <button className="landing-button" onClick={buyNow}>Buy Now</button>
        <button className="landing-button second" onClick={moreInfoClicked}>More Info</button>
      </div>

    </div>
  );

}


function eventInfo() {
  return (
    <div className="section-container section-padding center-container" >

      <div className="max-width-container">

        <h2 className="section-heading">Event Info</h2>

        <div className="ticket-event-info-container">

        <div className="center-container">
            <div className="tickets-container">
              <img className="ticket-img" src="/src/img/ticket.png"/>
              <img className="ticket-img" src="/src/img/ticket.png"/>
              <img className="ticket-img" src="/src/img/ticket.png"/>
            </div>
        </div>


        <div className="info-card">

          <div className="event-info-container">
            <div className="center-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
              </svg>
            </div>
            <p> 5th October 2024 </p>
          </div>


          <div className="event-info-container">
            <div className="center-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
              </svg>
            </div>
            <p> The Taprobane </p>
          </div>

          <div className="event-info-container">
            <div className="center-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
              </svg>
            </div>
            <p> 5:30 PM Onwards </p>
          </div>

        </div> {/* Info card */}
        </div>

    {/*

        <div className="info-card" style={{
          overflow: "hidden",
          backgroundColor: "rgba(0, 0, 0, .6)",
        }}>

          <img src="/src/img/bg4.webp" className="info-card-bg"  />

          <p style={{ marginBottom: '2.6rem', paddingTop: "50%" }}>
            Lorem Ipsum is simply dummy text of the printing and type setting industry.
          </p>

          <div className="event-info-container">
            <div className="center-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
              </svg>
            </div>
            <p> 5th October 2024 </p>
          </div>


          <div className="event-info-container">
            <div className="center-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
              </svg>
            </div>
            <p> The Taprobane </p>
          </div>

          <div className="event-info-container">
            <div className="center-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
              </svg>
            </div>
            <p> 5:30 PM Onwards </p>
          </div>
        </div>

      */}


      </div> {/* max-width-container */}
    </div>
  );
}


function artistsLineup() {

   // FIXME: This is hardcoded here temproarly.
   const artists = [
     {
       image : "/src/img/xsinger-4.jpg",
       name  : "Randhir Witana",
       detail : "Randhir Witana is a versatile Sri Lankan singer, composer, and lyricist with dynamic performances.",
     },
     {
       image : "/src/img/xsinger-2.jpg",
       name  : "Umara Sinhawansa",
       detail : "Umara Sinhawansa is a celebrated Sri Lankan singer, producer, and performer across diverse genres.",
     },
     {
       image : "/src/img/xsinger-1.jpg",
       name  : "Lahiru Perera",
       detail : "Lahiru Perera, known as \"La Signore,\" is a popular Sri Lankan singer known for energetic performances.",
     },
     {
       image : "/src/img/xsinger-3.jpg",
       name  : "Channuka",
       detail : "Channuka is a Sri Lankan pop sensation known for hits like \"Eka Wassak\" and \"Ohuge Ruwa.\"",
     },
  ];


  return (
    <div className="section-container section-margin-top">

      <div className="center-container">
        <div className="max-width-container">
          <h2 className="section-heading section-padding"> Artists Lineup </h2>
        </div>
      </div>

      <Swiper
      spaceBetween={10}
      centeredSlides={true}
      slidesPerView={1.4}
      breakpoints={{
        475: { slidesPerView: 2, },
        768: { slidesPerView: 2.3, },
        1024: { slidesPerView: 3, },
        1048: { slidesPerView: 3.4, },
      }}

      >
        {
          artists.map((artist) => (
            <>
            <SwiperSlide>
              <div className="artist-card">

                <img src={artist.image} className="artist-card-bg" />
                <br/>
                <div className="artist-card-info">
                  <h2> {artist.name} </h2>
                  <br/>
                  <p> {artist.detail} </p>
                </div>

              </div>
            </SwiperSlide>

            </>
          ))
        }
      </Swiper>

    </div>
  );
}


function venueSection() {
  return (
      <div className="section-container section-padding center-container section-margin-top">
        <div className="max-width-container">

          <h2 className="section-heading"> Venue </h2>
          <div className="center-container">
            <div className="map-container">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11202.804342755479!2d79.87192980184139!3d6.9157571785264995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25908c037ae7f%3A0x6ab4f0389d6258aa!2sThe%20Taprobane%20Entertainment!5e0!3m2!1sen!2slk!4v1725255979870!5m2!1sen!2slk" width="100%" height="100%" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>

        </div>
      </div>
      
  );
}


function contactSection() {
  return (
      <div className="section-container section-padding center-container section-margin-top">
        <div className="max-width-container">
          <h2 className="section-heading"> Contact </h2>

          <p>Tel: +94 710819950</p>
          <p>Email: curtincolombo.eventsteam@gmail.com</p>
          <br/>

          <div>
            <div className="social-media-container">
              <div className="social-media-icon cursor-pointer" onClick={openWhatsapp}>
                <svg fill="#ffffff" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.42 9.49c-.19-.09-1.1-.54-1.27-.61s-.29-.09-.42.1-.48.6-.59.73-.21.14-.4 0a5.13 5.13 0 0 1-1.49-.92 5.25 5.25 0 0 1-1-1.29c-.11-.18 0-.28.08-.38s.18-.21.28-.32a1.39 1.39 0 0 0 .18-.31.38.38 0 0 0 0-.33c0-.09-.42-1-.58-1.37s-.3-.32-.41-.32h-.4a.72.72 0 0 0-.5.23 2.1 2.1 0 0 0-.65 1.55A3.59 3.59 0 0 0 5 8.2 8.32 8.32 0 0 0 8.19 11c.44.19.78.3 1.05.39a2.53 2.53 0 0 0 1.17.07 1.93 1.93 0 0 0 1.26-.88 1.67 1.67 0 0 0 .11-.88c-.05-.07-.17-.12-.36-.21z"></path><path d="M13.29 2.68A7.36 7.36 0 0 0 8 .5a7.44 7.44 0 0 0-6.41 11.15l-1 3.85 3.94-1a7.4 7.4 0 0 0 3.55.9H8a7.44 7.44 0 0 0 5.29-12.72zM8 14.12a6.12 6.12 0 0 1-3.15-.87l-.22-.13-2.34.61.62-2.28-.14-.23a6.18 6.18 0 0 1 9.6-7.65 6.12 6.12 0 0 1 1.81 4.37A6.19 6.19 0 0 1 8 14.12z"></path></g></svg>
              </div>


              <div className="social-media-icon cursor-pointer" onClick={openTikTok}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"> <path d="M48,8H16c-4.418,0-8,3.582-8,8v32c0,4.418,3.582,8,8,8h32c4.418,0,8-3.582,8-8V16C56,11.582,52.418,8,48,8z M50,27 c-3.964,0-6.885-1.09-9-2.695V38.5C41,44.841,35.841,50,29.5,50S18,44.841,18,38.5S23.159,27,29.5,27h2v5h-2 c-3.584,0-6.5,2.916-6.5,6.5s2.916,6.5,6.5,6.5s6.5-2.916,6.5-6.5V14h5c0.018,1.323,0.533,8,9,8V27z" fill="#fff"></path> </svg>
              </div>

              <div className="social-media-icon cursor-pointer" onClick={openInsta}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12ZM17.5 8C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5C16 7.32843 16.6716 8 17.5 8Z" fill="#fff"></path> </g></svg>
              </div>
            </div>
          </div>
        </div>

      </div>
  );

}

export default LandingPage;
