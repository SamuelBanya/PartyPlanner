import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import About from "./About";
import Party from "./party/Party";
import Item from "./item/Item";
import Summary from "./party/Summary";

function App() {
  const [user, setUser] = useState(null);
  const [parties, setParties] = useState([]);
  const [chosenParty, setChosenParty] = useState({});
  const [partyIndex, setPartyIndex] = useState("");
  const [itemOptions, setItemOptions] = useState([]);
  const [itemId, setItemId] = useState("");
  const [itemIndex, setItemIndex] = useState("");

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

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route 
          path="/about" 
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
          path="/summary" 
          element={<Summary parties={parties} onFetchParties={handleFetchParties} />}
        />
      </Routes>
    </>
  );
}

export default App;
