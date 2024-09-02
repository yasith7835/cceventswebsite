
function Footer() {
  
  return (
    <>
      <div style={{ height: "var(--footer-height)" }}/>
      <div className="footer">
        <div className="center-container section-padding" style={{ height: "70%" }}>
          <img src="/src/img/logo-header.png" style={{ height: '80%' }} />
        </div>

        {/* <div className="center-container section-padding" style={{ height:"100%", flexDirection: "column" }}>
          <p style={{fontSize: ".8rem"}}>Developed by Programming Club</p>
          <br/>
          <img src="/src/img/pc-logo.png" style={{ width: '3rem', marginRight: "1rem" }} />
        </div>
        <br/> */}


        <div className="center-container" style={{ fontSize: '.6rem', color: '#9c9c9c' }}>
          <p> © CCET • <u>TERMS OF USE</u> • <u>PRIVACY POLICY</u></p>
        </div>
        <br/>

      </div>
    </>
  )
}

export default Footer
