// Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bg from './pen_bg.jpg'





const buttonStyle = {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '10px',
    padding: '16px 32px',
    fontSize: '34px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '400px',
    height: '100px',
  };
  


const Home = () => {


    return (
      <div style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Link to="/golfing_the_peninsula">
        <button
          style={buttonStyle}
          onClick={() => {
            // Handle button click behavior
          }}
        >
          Play Golf
        </button>
      </Link>
      <div style={{ padding: '20px' }}></div>
      <Link to="/weather">
        <button
          style={buttonStyle}
          onClick={() => {
            // Handle button click behavior
          }}
        >
          Weather
        </button>
      </Link>
        </div>
      </div>
    );
  };
  

export default Home;
