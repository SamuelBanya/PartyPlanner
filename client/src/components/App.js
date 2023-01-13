import React, { useEffect, useState, createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import About from "./About";
import Party from "./party/Party";
import Item from "./item/Item";
import Location from "./location/Location";
import Summary from "./party/Summary";
import Geocode from "react-geocode";
import { HelloProvider } from "./context/HelloContext";
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [parties, setParties] = useState([]);
  const [chosenParty, setChosenParty] = useState({});
  const [partyIndex, setPartyIndex] = useState("");
  const [itemOptions, setItemOptions] = useState([]);
  const [itemId, setItemId] = useState("");
  const [itemIndex, setItemIndex] = useState("");
  const [location, setLocation] = useState([]);
  const [locationId, setLocationId] = useState("");
  const UserContext = createContext();

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => {
          setUser(user);
        })
    }
  });
  }, []);

  useEffect(() => {
    if (chosenParty) {
      if (chosenParty.items) {
        let itemOptions = chosenParty.items.map((item) => {
            return (
                <option key={item.id} value={item.name}>{item.name}</option>
            )
        });

        setItemOptions(itemOptions);
      }
    }
  }, [chosenParty]);

  if (!user) return <Login onLogin={setUser} />;

  function handleFetchParties(fetchedParties) {
    setParties(fetchedParties)
  }

  // NOTE: This function is necessary to obtain the 'lat' (latitude) and 'lng' (longitude) to later display the proper
  // marker positions for the map on the 'Summary' page:
  async function get_coordinates(name) {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
    Geocode.setLanguage("en");
    Geocode.setLocationType("ROOFTOP");
    return await Geocode.fromAddress(name).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        let position = { lat: lat, lng: lng }
        // Related Stackoverflow post:
        // https://stackoverflow.com/questions/38884522/why-is-my-asynchronous-function-returning-promise-pending-instead-of-a-val
        return position
      },
      (error) => {
        console.error(error);
      }
  ).then((response) => {
    return response;
  })}

  async function handleFetchSummaryParties(fetchedParties) {
    // Loop through each party and check to see if it has a location
    // If it has a location, then run the 'get_coordinates' function to its actual 'lat' and 'lng' values accordingly so that we can 
    // later use them for the map on the summary page:
    const promises = fetchedParties.map(async (party) => {
      if (party.location) {
        let position = await get_coordinates(party.location.name);
        
        return {...party, location: {...party.location, position: position}};
      } 
      else {
        return party;
      }
    });

    const modifiedParties = await Promise.all( promises );

    setParties(modifiedParties);
  }

  function handleAddParty(newParty) {
    const updatedPartiesArray = [...parties, newParty];
    setParties(updatedPartiesArray);
  }

  function handleEditParty(editedParty) {
    setParties((parties) => 
      parties.map((party) => {
        return party.id === editedParty.id ? editedParty : party;
      })
    );
  }

  function handleDeleteParty(deletedParty) {
    setParties((parties) =>
      parties.filter((party) => party.id !== deletedParty.id)
    );
  }

  function handleChooseParty(e) {
    const match = parties.find(item => item.name == e.target.value);

    setChosenParty(match);

    let index = parties.map(party => party.name).indexOf(e.target.value)

    setPartyIndex(index);
   
    // NOTE:
    // Adding use case scenario of when a location exists for the match, then update the location accordingly so I don't have to write two functions 
    // to do the same thing:
    if (match.location) {
      let location = match.location.name;
      let locationId = match.location.id;
      setLocation(location);
      setLocationId(locationId);
    }
    else {
      setLocation("");
    }
  }

  function handleAddItem(newItem) {
    parties.map((party) => {
      if (party.id == chosenParty.id) {
        const updatedItemsArray = [...party.items, newItem];

        let itemOptions = updatedItemsArray.map((item) => {
            return (
                <option key={item.id} value={item.name}>{item.name}</option>
            )
        });

        setItemOptions(itemOptions);
        let tempArray = [...parties];
        tempArray[partyIndex].items.push(newItem);
        setParties(tempArray) ;
      } 
      else {
        console.log("Match not found within 'handleAddNewItem!");
      }});
  }

  function handleChangeItemInfo(chosenItemId, chosenItemIndex) {
    setItemId(chosenItemId);
    setItemIndex(chosenItemIndex);
  }

  function handleEditItem(editedItem) {
    let tempArray = [...parties];
    tempArray[partyIndex].items[itemIndex] = editedItem;
    setParties(tempArray);

    let itemOptions = chosenParty.items.map((item) => {
      return (
          <option key={item.id} value={item.name}>{item.name}</option>
      )
    });

    setItemOptions(itemOptions);
  }

  function handleDeleteItem(response, deletedItemId) {
    let tempArray = [...parties];
    tempArray[partyIndex].items.splice(itemIndex, 1)
    setParties(tempArray);

    let filteredItemOptions = chosenParty.items.map((item) => {
        return (
            <option key={item.id} value={item.name}>{item.name}</option>
        )
    });

    setItemOptions(filteredItemOptions);
  }

  function handleAddLocation(newLocation) {
    parties.map((party) => {
      if (party.id == chosenParty.id) {
        let tempArray = [...parties];
        tempArray[partyIndex].location = newLocation;
        setParties(tempArray) ;
      }
      else {
        console.log("Match not found within 'handleAddNewLocation!");
      }});
    
    console.log("parties after setParties() called for tempArray: ", parties);
  }

  function handleEditLocation(editedLocation, locationId) {
    let tempArray = [...parties];
    tempArray[partyIndex].location = editedLocation;
    setParties(tempArray);
    setLocation(editedLocation);
  }

  function handleDeleteLocation(response, locationId) {
    let tempArray = [...parties];
    tempArray[partyIndex].location = null
    setParties(tempArray);
    setLocation("");
  }

  // Two resources used for 'Navigate' for '/' route for '/about' component:
  // https://www.pluralsight.com/guides/how-to-set-react-router-default-route-redirect-to-home
  // https://stackoverflow.com/questions/63690695/react-redirect-is-not-exported-from-react-router-dom

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route 
          path="/" 
          // NOTE: Adding 'useContext' here as per project's requirement:
          // Taken from this example:
          // https://www.w3schools.com/react/react_usecontext.asp
          element={
            <HelloProvider>
              <About user={user}/>
            </HelloProvider>
            // <About />
          } 
        />
        <Route 
          path="/parties" 
          element={<Party 
            parties={parties} onFetchParties={handleFetchParties} onChooseParty={handleChooseParty} chosenParty={chosenParty}
            onAddParty={handleAddParty} onEditParty={handleEditParty} onDeleteParty={handleDeleteParty} 
          />}
        />
        <Route 
          path="/items" 
          element={<Item 
            parties={parties} onChooseParty={handleChooseParty} chosenParty={chosenParty} onFetchParties={handleFetchParties}
            onAddItem={handleAddItem} itemOptions={itemOptions} setItemOptions={setItemOptions} itemId={itemId} setItemId={setItemId} onChangeItemInfo={handleChangeItemInfo}
            onEditItem={handleEditItem} onDeleteItem={handleDeleteItem} 
          />}
        />
        <Route
          path="/location"
          element={<Location 
            parties={parties} onFetchParties={handleFetchParties} onChooseParty={handleChooseParty} chosenParty={chosenParty}
            onAddLocation={handleAddLocation} onEditLocation={handleEditLocation} onDeleteLocation={handleDeleteLocation} location={location} locationId={locationId}
          />}
        />
        <Route 
          path="/summary" 
          element={<Summary parties={parties} onFetchSummaryParties={handleFetchSummaryParties} />}
        />
      </Routes>
    </div>
  );
}

export default App;