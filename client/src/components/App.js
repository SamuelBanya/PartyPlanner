import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import About from "./About";
import Party from "./party/Party";
import Item from "./item/Item";
import Location from "./location/Location";
import Summary from "./party/Summary";

function App() {
  // TODO:
  // Adding 'useContext' for 'NavBar' component:
  // 'useContext' Docs Page:
  // https://beta.reactjs.org/apis/react/useContext
  // Example to possibly use to change themes of the 'NavBar' component:
  // https://codesandbox.io/s/react-usecontext-rydy5?file=/src/App.js
  const context = React.createContext(null);
  const myContextVal = useContext(context);
  const [contextState, setContextState] = useState(null);

  // Rest of variables:
  const [user, setUser] = useState(null);
  const [parties, setParties] = useState([]);
  const [chosenParty, setChosenParty] = useState({});
  const [partyIndex, setPartyIndex] = useState("");
  const [itemOptions, setItemOptions] = useState([]);
  const [itemId, setItemId] = useState("");
  const [itemIndex, setItemIndex] = useState("");
  const [location, setLocation] = useState([]);
  const [locationId, setLocationId] = useState("");

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
    console.log("handleFetchParties function called in parent App component");
    console.log("fetchedParties: ", fetchedParties);
    setParties(fetchedParties)
    console.log("parties within handleFetchParties function in parent App component: ", parties);
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
    console.log("handleChooseParty function called");
    const match = parties.find(item => item.name == e.target.value);

    setChosenParty(match);

    let index = parties.map(party => party.name).indexOf(e.target.value)

    setPartyIndex(index);
   
    // NOTE:
    // Adding use case scenario of when a location exists for the match, then update the location accordingly so I don't have to write two functions 
    // to do the same thing:
    if (match.location) {
      console.log("match: ", match);
      console.log("index: ", index);
      console.log("match.location: ", match.location);
      console.log("match.location.name: ", match.location.name);
      let location = match.location.name;
      let locationId = match.location.id;
      // NOTE: 
      // Set the location for it's 'name'
      setLocation(location);
      // Then, set the 'locationId' for its specific 'id' value to later use a PATCH request for editing, and a 'DELETE' request for deleting
      setLocationId(locationId);
      console.log("location: ", location);
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

  // TODO:
  // Check why a new location isn't being updated automatically in the dropdown list fo "Edit Location" child component:
  // NEW TO CHECK:
  function handleAddLocation(newLocation) {
    console.log("---------------------------------------------------------");
    console.log("handleAddLocation function called in parent App component");
    console.log("---------------------------------------------------------");
    console.log("/////////////////////////////////////////////////////////");
    console.log("newLocation: ", newLocation);
    console.log("parties: ", parties);
    console.log("chosenParty: ", chosenParty);
    console.log("partyIndex: ", partyIndex);
    console.log("/////////////////////////////////////////////////////////");
    // TODO:
    // Make this actually work:

    parties.map((party) => {
      if (party.id == chosenParty.id) {
        console.log("/////////////////////////////////////////////////////////");
        console.log("party.id matches with chosenParty.id!");
        console.log("party.id: ", party.id);
        console.log("chosenParty.id: ", chosenParty.id);
        console.log("party.location: ", party.location);
        console.log("/////////////////////////////////////////////////////////");
        // NOTE
        // Commented this out because this was causing issues when creating a new location 
        // and the related form would already be filled in --> Aka only do this when someone has chosen a party
        // aka only change the location when the 'ChoosePartyDropdown' menu is selected
        // setLocation(newLocation);
        let tempArray = [...parties];
        console.log("tempArray: ", tempArray);
        console.log("tempArray[partyIndex]: ", tempArray[partyIndex]);
        console.log("tempArray[partyIndex].location: ", tempArray[partyIndex].location);
        tempArray[partyIndex].location = newLocation;
        setParties(tempArray) ;
      }
      else {
        console.log("Match not found within 'handleAddNewLocation!");
      }});
    
    console.log("parties after setParties() called for tempArray: ", parties);
    // console.log("locationOptions after entire handleAddLocation function in parent App component: ", locationOptions);
  }

  // NOTE:
  // I took this function out as there is only one location anyway, so this isn't needed:
  // function handleChangeLocationInfo(chosenLocationId, chosenLocationIndex) {
  // function handleChangeLocationInfo(chosenPartyLocationMatch) {
  //   console.log("---------------------------------------------------------");
  //   console.log("handleChangeLocation function called in parent App component");
  //   console.log("---------------------------------------------------------");
  //   console.log("chosenPartyLocationMatch: ", chosenPartyLocationMatch);
    // setLocationId(chosenLocationId);
    // setLocationIndex(chosenLocationIndex);
  // }

  function handleEditLocation(editedLocation, locationId) {
    console.log("---------------------------------------------------------");
    console.log("handleEditLocation function called in parent App component");
    console.log("---------------------------------------------------------");
    console.log("editedLocation: ", editedLocation);
    console.log("locationId: ", locationId);
    console.log("parties: ", parties);
    console.log("chosenParty: ", chosenParty);
    let tempArray = [...parties];
    console.log("tempArray[partyIndex]: ", tempArray[partyIndex]);
    console.log("tempArray[partyIndex].location: ", tempArray[partyIndex].location);
    tempArray[partyIndex].location = editedLocation;
    setParties(tempArray);
    // MAYBE
    setLocation(editedLocation);
  }

  // function handleDeleteLocation(response, deletedLocationId) {
  function handleDeleteLocation(response, locationId) {
    console.log("---------------------------------------------------------");
    console.log("handleDeleteLocation function called in parent App component");
    console.log("---------------------------------------------------------");
    console.log("parties: ", parties);
    console.log("response: ", response);
    // console.log("deletedLocationId: ", deletedLocationid);
    console.log("locationId: ", locationId);
    let tempArray = [...parties];
    console.log("tempArray: ", tempArray);
    console.log("tempArray[partyIndex].location: ", tempArray[partyIndex].location);
    // tempArray[partyIndex].location.splice(locationIndex, 1)
    // setParties(tempArray);

    // let filteredLocationOptions = chosenParty.location.map((location) => {
    //     return (
    //         <option key={location.id} value={location.name}>{location.name}</option>
    //     )
    // });

    // setLocationOptions(filteredLocationOptions);
  }

  // Two resources used for 'Navigate' for '/' route for '/about' component:
  // https://www.pluralsight.com/guides/how-to-set-react-router-default-route-redirect-to-home
  // https://stackoverflow.com/questions/63690695/react-redirect-is-not-exported-from-react-router-dom

  // Previous attempt to use 'useContext':
      // <context.provider value={{ contextState, setContextState} }>
      //   <NavBar user={user} setUser={setUser} />
      // </context.provider>
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route 
          path="/" 
          element={<About user={user}/>} 
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
          element={<Summary parties={parties} onFetchParties={handleFetchParties} />}
        />
      </Routes>
    </>
  );
}

export default App;
