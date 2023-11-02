import React, { useEffect, useState } from 'react';
import holeLocations from './data/PeninsulaHoleLocations';
import { Flex, Button, Text} from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import Map from './map';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaHome, FaCompressArrowsAlt } from "react-icons/fa";
import '@aws-amplify/ui-react/styles.css';



const EARTH_RADIUS_IN_YARDS = 6967420.13; // Earth's radius in yards

function calculateDistanceForCurrentHole(currentLocation, currentHole, holeLocations) {
  const hole = holeLocations.find((hole) => hole.hole_number === currentHole);

  if (!hole) {
    return null; // Handle the case where the currentHole is not found
  }

  const { latitude: holeLat, longitude: holeLon } = hole.hole_location;

    // Convert latitude and longitude from degrees to radians
  const lat1 = currentLocation.latitude * (Math.PI / 180);
  const lon1 = currentLocation.longitude * (Math.PI / 180);
  const lat2 = holeLat * (Math.PI / 180);
  const lon2 = holeLon * (Math.PI / 180);

  // Haversine formula
  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceInYards = EARTH_RADIUS_IN_YARDS * c;

  return {
    ...hole,
    distance: Math.round(distanceInYards)
  };
}

function PeninsulaGolf() {
  const [currentHole, setCurrentHole] = useState(1);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null); // Store the distance for the current hole

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setCurrentLocation(location);
        console.log(currentLocation)

        // Calculate the distance for the current hole when the current location is set
        const calculatedDistance = calculateDistanceForCurrentHole(location, currentHole, holeLocations);
        setDistance(calculatedDistance);
      }, (error) => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation is not supported in this browser.');
    }
  }

  useEffect(() => {
    // Call handleGetLocation whenever currentHole changes
    handleGetLocation();
  }, [currentHole]);



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
    <div style={{ backgroundColor: 'black', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
  <div>
    <Flex padding='10px' backgroundColor='#076652' direction='row' justifyContent='space-between'>
      <FaArrowAltCircleLeft
      fontSize='11vw'
      color={currentHole === 1 ? 'gray' : 'white'}
      onClick={() => {
        if (currentHole !== 1) {
          setCurrentHole(currentHole - 1);
        }
      }}
    />
    <Flex direction='row' alignItems='center' justifyContent='center'>
      <Text color='white' fontSize='5vw' fontWeight='bold'>Hole </Text>
      <Text color='white' fontSize='7vw' fontWeight='bold'>{currentHole}</Text>
      </Flex>
      <FaArrowAltCircleRight
        fontSize='11vw'
        color={currentHole === 18 ? 'gray' : 'white'}
        onClick={() => {
          if (currentHole !== 18) {
            setCurrentHole(currentHole + 1);
          }
        }}
      />
      </Flex>
    </div>

    <Flex direction='column' alignItems='center' justifyContent='center'>
      {distance && (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text color='white' fontSize='5vw' fontWeight='bold'>
            Front 
          </Text>
          <Text color='white' fontSize='15vw' fontWeight='bold'>
            {distance.distance - 5}
          </Text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text color='white' fontSize='8vw' fontWeight='bold'>
            Center
          </Text>
          <Text color='white' fontSize='20vw' fontWeight='bold'>
            {distance.distance}
          </Text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text color='white' fontSize='5vw' fontWeight='bold'>
            Back 
          </Text>
          <Text color='white' fontSize='15vw' fontWeight='bold'>
            {distance.distance + 5}
          </Text>
          </div>
          </>
      )}
    </Flex>


  <Flex direction='row' justifyContent='space-between' padding='20px'>
      <Link to="/"> {/* Use Link to navigate to the Home page */}
        <FaHome fontSize='11vw' color='white'/>
        </Link>
        <FaCompressArrowsAlt onClick={() => handleGetLocation()} fontSize='11vw' color='white'/>
    </Flex>
</div>

  );
}

export default PeninsulaGolf;