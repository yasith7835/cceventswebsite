
function Footer() {
  
  return (
    <>
      <div style={{
        height: "var(--footer-height)",
        // backgroundColor: 'green',
      }}
        />

      <div className="footer">

        <div className="center-container">

        <div className="max-width-container footer-content">
 
        <div className="center-container section-padding" style={{ height:"100%" }}>
          <img src="/src/img/logo-ccet.png" style={{ height: '3rem', marginRight: "1rem" }} />
          <br/>
          <p style={{fontSize: ".8rem"}}>
            Organized by <br />
            Events Club
          </p>
        </div>

        {/* <div className="center-container" style={{ fontSize: '.6rem', color: '#9c9c9c' }}> */}
        {/*   <p> © CCET • <u>TERMS OF USE</u> • <u>PRIVACY POLICY</u></p> */}
        {/* </div> */}


          <div className="center-container section-padding" style={{ height:"100%" }}>
            <img src="/src/img/pc-logo.png" style={{ height: '3rem', marginRight: "1rem" }} />
            <br/>
            <p style={{fontSize: ".8rem"}}>
              Developed by <br />
              Programming Club
            </p>
          </div>

        </div>

        </div>
      </div>
    </>
  )
}

export default Footer
