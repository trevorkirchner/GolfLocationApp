import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Home from'./comps/Home'
import PeninsulaGolf from'./comps/PeninsulaGolf'
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';


Amplify.configure(awsExports);



function App({ signOut, user }) { 
  

  return (
    <div
      style={{
        height: '100vh', // 100% of the viewport height
        width: '100vw',  // 100% of the viewport width
        backgroundColor: 'black'
      }}
    >
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/golfing_the_peninsula" element={<PeninsulaGolf />} />
        </Routes>
    </Router>
    </div>
  );
}

export default withAuthenticator(App);

