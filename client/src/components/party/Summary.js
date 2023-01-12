import React, { useEffect, useRef, useState, Component } from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
import { InfoWindow } from '@react-google-maps/api';
import Geocode from "react-geocode";

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

// Advice Notes:
// If you haven't seen it already, Rails has a built-in secrets store that you can also use: https://guides.rubyonrails.org/security.html#custom-credentials
// With a Google Maps API key, you should be fine to use it cleartext AFAIK, presuming you're using it to display Google Maps embeds. 
// The web browser needs to include the API key in its requests to Google, so you can't keep it secret. 



function Summary({ parties, onFetchParties }) {
    // ------------------------------------GOOGLE MAPS EXAMPLE------------------------------------
    const containerStyle = {
    width: '400px',
    height: '400px'
    };

    const centers = [{
        // Lebanon, Kansas: The geographic center of the U.S.:
        lat: 39.8097,
        lng: -98.5556
    }]

    const position = { lat: 39.8097, lng: -98.5556 }

    // GOOGLE MAPS EXAMPLE //
    // Adapted from this example:
    // https://codesandbox.io/s/react-google-mapsapi-multiple-markers-infowindow-h6vlq?file=/src/Map.js:1109-1484

    // TODO:
    // Make markers from each of the user provided locations:
    // Then, grab the 'lat' and 'lng' for each of them
    // Then, display them on the map

    // NOTE: 
    // Commented out since its working for the actual example, but I need it working for my actual locations:
    // const markers = [
    // {
    //     id: 1,
    //     name: "Chicago, Illinois",
    //     position: { lat: 41.881832, lng: -87.623177 }
    // },
    // {
    //     id: 2,
    //     name: "Denver, Colorado",
    //     position: { lat: 39.739235, lng: -104.99025 }
    // },
    // {
    //     id: 3,
    //     name: "Los Angeles, California",
    //     position: { lat: 34.052235, lng: -118.243683 }
    // },
    // {
    //     id: 4,
    //     name: "New York, New York",
    //     position: { lat: 40.712776, lng: -74.005974 }
    // }
    // ];

    let markers = []

    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
        return;
        }
        setActiveMarker(marker);
    };
    // ------------------------------------GOOGLE MAPS EXAMPLE------------------------------------

    // ----------------------------'react-geocode' EXAMPLE----------------------------'

    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
    Geocode.setLanguage("en");
    Geocode.setLocationType("ROOFTOP");
    Geocode.fromAddress("Eiffel Tower").then(
    (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
    },
    (error) => {
        console.error(error);
    }
    );
    // ----------------------------'react-geocode' EXAMPLE----------------------------'

    // Mapping through each of the 'markers' to obtain the corresponding 'lat' and 'lng' values for later use on the map itself:
    markers.map((marker) => {
        console.log("TESTING GEOCODER RESULTS TO OBTAIN LAT AND LNG FOR MAP: ");
        console.log("marker: ", marker);
        Geocode.fromAddress(marker.name)
        .then((response) => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log("Longitude and Latitude of " + marker.name + ": ");
            console.log(lat, lng);
        },
        (error) => {
            console.error(error);
        }
        );
    });

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
            onFetchParties(data);
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
                // TODO:
                // Create new 'marker' object for the map here
                // Provide the 'party.location.id' as the 'id' value
                // Provide the 'party.location.name' for the 'name' value
                // Use the 'Geocoder' fetch call to obtain the correct longitude and latitude results for each of the locations --> This might be tricky since they might not be received in time
                // PREVIOUS LINE
                // let newMarker = { id: party.location.id, name: party.location.name, position: Geocode.fromAddress("Eiffel Tower").then(
                // SECOND PREVIOUS LINES
                // let newMarker = { id: party.location.id, name: party.location.name, position: Geocode.fromAddress(party.location.name).then(
                //     (response) => {
                //         const { lat, lng } = response.results[0].geometry.location;
                //         console.log("Within the 'newMarker section of the code: ");
                //         console.log("lat: ", lat);
                //         console.log("lng: ", lng);
                //         console.log(lat, lng);
                //         return { lat: lat, lng: lng }
                //     },
                //     (error) => {
                //     console.error(error);
                //     }
                // )};


                // Obtaining Geocoder results via 'async' function attempt:
                async function get_coordinates (name) {
                    return await Geocode.fromAddress(party.location.name).then(
                        (response) => {
                            // PREVIOUS LINE:
                            const { lat, lng } = response.results[0].geometry.location;
                            console.log("Within the 'newMarker section of the code: ");
                            console.log("lat: ", lat);
                            console.log("lng: ", lng);
                            // console.log(lat, lng);
                            // return { "lat": lat, "lng": lng}
                            return { lat: lat, lng: lng }
                        },
                        (error) => {
                        console.error(error);
                        }
                )}

                let newMarker = { id: party.location.id, name: party.location.name, position: get_coordinates(party.location.name) };

                // Then, add the 'marker' object to the 'markers' array with '.push'
                markers.push(newMarker);
                console.log("----------TESTING TRYING TO CREATE NEW MARKERS:----------");
                console.log("After .push:");
                console.log("markers: ", markers);
                console.log("newMarker: ", newMarker);


                // Previous working code for working example:
                // const markers = [
                // {
                //     id: 1,
                //     name: "Chicago, Illinois",
                //     position: { lat: 41.881832, lng: -87.623177 }
                // },
                // {
                //     id: 2,
                //     name: "Denver, Colorado",
                //     position: { lat: 39.739235, lng: -104.99025 }
                // },
                // {
                //     id: 3,
                //     name: "Los Angeles, California",
                //     position: { lat: 34.052235, lng: -118.243683 }
                // },
                // {
                //     id: 4,
                //     name: "New York, New York",
                //     position: { lat: 40.712776, lng: -74.005974 }
                // }
                // ];
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

        return (
            <>
                <ul>
                    <li>{party.name}</li>
                    <ul>
                        <li>Location</li>
                        <ul>
                            {partyLocation}
                        </ul>
                        <li>Start Time</li>
                        <ul>
                            {party.start_time}
                        </ul>
                        <li>End Time: </li>
                        <ul>
                            {party.end_time}
                        </ul>
                        <li>Items: </li>
                        <ul>
                            {partyItems}
                        </ul>
                        <li>Users: </li>
                        <ul>
                            {partyUsers}
                        </ul>
                    </ul>
                </ul>
            </>
        )
    });

    return (
        <>
            <h1>Summary</h1>
            { partyResults }
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={centers[0]}
                    zoom={10}
                >
                    {markers.map(({ id, name, position }) => (
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
                    ))}
                </GoogleMap>
            </LoadScript>
        </>
    )

}

export default Summary;