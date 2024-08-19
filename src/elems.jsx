/*
 * This file contains reusable elements.
 */


import './css/App.css';

export function PageBgImage(
  image_path=null,
  background_position='cover',
) {
  return (
    <>
      <div className="page-bg-image" style={{
        backgroundImage:  `url("${image_path}")`,
        backgroundPosition: `${background_position}`,
      }}/>
      <div className="page-bg-overlay"/>
    </>
  );
}

