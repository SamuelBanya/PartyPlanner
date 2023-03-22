import React, { useEffect, useRef, useState, Component } from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
import { InfoWindow } from '@react-google-maps/api';
import Geocode from "react-geocode";
// NOTE:
// These are MaterialUI related dependencies for their 'Card' component:
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Links on how to protect the Google Maps API key:
// https://medium.com/@muesingb/a-simple-guide-to-hiding-api-keys-in-rails-and-react-using-environment-variables-abc6199f487e
// https://medium.com/@daniaherrera/how-to-use-dotenv-ruby-gem-to-secure-your-api-keys-92382aab888a
// https://medium.com/swlh/an-easy-way-to-manually-hide-an-api-key-in-a-simple-rails-app-317ca1f823a8

// Related Google Maps package from npm:
// https://www.npmjs.com/package/@react-google-maps/api

// Related links on how to setup Google Map API:
// https://developers.google.com/maps/documentation/embed/cloud-setup
// https://console.cloud.google.com/google/maps-apis/overview
// https://developers.google.com/maps/documentation/javascript/react-map#javascript

// Related links to use to reverse search for 'latitude' and 'longitude' given the city name:
// http://www.geonames.org/export/ws-overview.html
// https://www.geonames.org/maps/addresses.html#geoCodeAddress

// GOOGLE MAPS EXAMPLE //
// From this Docs page:
// https://react-google-maps-api-docs.netlify.app/
// Also this is an example to use Google Maps API + React:
// https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2

// Google Maps Example With Custom Colors For 'Markers' (aka 'pins' to an everyday person):
// https://stackoverflow.com/questions/27488643/google-maps-v3-default-marker-path-with-other-colors

// Example of how to add a flag icon to a map:
// https://developers.google.com/maps/documentation/javascript/examples/icon-simple

// Older vanilla JS example on how to add 'InfoWindow' objects to a Google Maps app:
// http://users.umiacs.umd.edu/~louiqa/2014/BMGT406/novel-project-tutorial/novel-google-maps-javascript.html

// Example from the 'InfoWindows' docs page on how to add an 'InfoWindow' to an existing 'Marker' through a click event:
// https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple

// Example of how to use Google Maps API with markers and infowindow together:
// https://codesandbox.io/s/react-google-mapsapi-multiple-markers-infowindow-h6vlq?file=/src/Map.js:1109-1484

// GEOCODING LINKS:
// 'search-geonames' package to search 'geonames' data:
// https://www.npmjs.com/package/search-geonames
// 'react-geocode' package to use Google's Geocoding service:
// https://www.npmjs.com/package/react-geocode
// Google docs pages on 'geocoding':
// https://developers.google.com/maps/documentation/javascript/geocoding
// https://developers.google.com/maps/documentation/geocoding/overview

function Summary({ parties, onFetchSummaryParties }) {
  // ------------------------------------GOOGLE MAPS EXAMPLE------------------------------------
  const containerStyle = {
    width: '400px',
    height: '400px',
  };

  const centers = [{
    // Lebanon, Kansas: The geographic center of the U.S.:
    lat: 39.8097,
    lng: -98.5556
  }]

  const position = { lat: 39.8097, lng: -98.5556 }

  let markers = []

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  // ------------------------------------GOOGLE MAPS EXAMPLE------------------------------------

  useEffect(() => {
    fetch("/parties", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        onFetchSummaryParties(data);
      });
  }, []);

  let partyResults = parties.map((party) => {
    let partyItems = party.items.map((item) => {
      return (
        <li key={item.id}>{item.name}</li>
      )
    })

    // NOTE: I used this StackOverflow post as a reference to utilize 'Object.keys().length' to determine the length of the object:
    // https://stackoverflow.com/questions/126100/how-to-efficiently-count-the-number-of-keys-properties-of-an-object-in-javascrip
    let partyLocation = (<li></li>)
    if (party.location) {
      if (Object.keys(party.location).length > 0) {
        partyLocation = (
          <li key={party.location.id}>{party.location.name}</li>
        )
        // Create new 'marker' object for the map here
        // Provide the 'party.location.id' as the 'id' value
        // Provide the 'party.location.name' for the 'name' value
        // Use the 'Geocoder' fetch call to obtain the correct longitude and latitude results for each of the locations --> This might be tricky since they might not be received in time
        let newMarker = { id: party.location.id, name: party.name + ": " + party.location.name, position: party.location.position }
        markers.push(newMarker);
      }
    }

    let usersArray = [];

    party.users.map((user) => {
      usersArray.push(user);
    })

    let uniqueUsers = [...new Set(usersArray.map((user) => user.username ))]  ;
    let partyUsers = uniqueUsers.map((user) => {
      return (
        <li key={uniqueUsers.indexOf(user)}>{user}</li>
      )
    })

    // NOTE:
    // This is a return statement for the 'partyResults' map variable above:
    return (
      <>
        <Card sx={{ minWidth: 275 }} style={{background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,172,9,1) 0%, rgba(255,0,191,1) 100%)'}}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {party.name}
            </Typography>
            <Typography variant="h5" component="div">
              Location:
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {partyLocation}
            </Typography>
            <Typography variant="h5" component="div">
              Start Time:
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {party.start_time}
            </Typography>
            <Typography variant="h5" component="div">
              End Time:
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {party.end_time}
            </Typography>
            <Typography variant="h5" component="div">
              Items:
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {partyItems}
            </Typography>
            <Typography variant="h5" component="div">
              Users:
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {partyUsers}
            </Typography>
          </CardContent>
        </Card>
        <br />
      </>
    )
  });

  // NOTE:
  // This is for the 'MaterialUI' card example:
  const bull = (
    <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  // NOTE:
  // This is the JSX return statement for the 'Summary' component:
  return (
    <div >
      <h1>Map</h1>
      <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
      >
        <div className="GoogleMapDiv">
          <GoogleMap
          mapContainerStyle={containerStyle}
          center={centers[0]}
          zoom={3}
          >
            {markers.map(({ id, name, position }) => {
              return (
                <Marker
                key={id}
                position={position}
                onClick={() => handleActiveMarker(id)}
                >
                  {activeMarker === id ? (
                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                      <div>{name}</div>
                    </InfoWindow>
                  ) : null}
                </Marker>
            )})}
          </GoogleMap>
        </div>
      </LoadScript>
      <h1>Summary</h1>
      <div className="SummaryPageListDiv">
        { partyResults }
      </div>
    </div>
  )

}

export default Summary;
