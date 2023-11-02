// Home.jsx
import React, { useState, useEffect } from 'react';
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
    width: '300px',
    height: '90px',
  };
  


const Home = () => {

    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Function to update the window height when the window is resized
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    return (
      <div style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', height: windowHeight  }}>
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
