import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import ChoosePartyDropdown from "../party/ChoosePartyDropdown";
// Material UI components for form buttons:
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function EditLocationForm({ location, locationId, onEditLocation, onDeleteLocation, parties, onChooseParty, chosenParty }) {

  const [editLocationFormData, setEditLocationFormData] = useState({
    location_name: ""
  });

  console.log("location within EditLocationForm child component: ", location);

  // TODO:
  // Use a 'useEffect' block that pulls in the form data each time the 'chosenParty' within the 'party/ChoosePartyDropdown' menu is changed:
  useEffect(() => {
    console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
    console.log("chosenParty changed, reacting to this change with a useEffect block in EditLocationForm");
    if (location.length === 0) {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log("if block reached");
      console.log("location's length is less than 0");
      console.log("location: ", location);
      console.log("location.length: ", location.length);
      console.log("location: ", location);
      console.log("Party doesn't have a location, setting location to a blank string");
      setEditLocationFormData({location_name: ""});
      console.log("editLocationFormData after useEffect: ", editLocationFormData);
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    }
    else {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log("else block reached");
      console.log("location's length is greater than 0");
      console.log("location: ", location);
      console.log("location.length: ", location.length);
      console.log("Party has a location, setting location to the actual location");
      setEditLocationFormData({location_name: location});
      console.log("editLocationFormData after useEffect: ", editLocationFormData);
      console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    }
    //
  }, [chosenParty]);

  console.log("editLocationFormData outside useEffect: ", editLocationFormData);

  const handleEditLocationChange = (e) => {
    setEditLocationFormData({...editLocationFormData, [e.target.name]: e.target.value})
  }

  const handleEdit = (e) => {
    e.preventDefault();

    const partyId = chosenParty.id;

    console.log("handleEdit function called in EditLocationForm child component");
    console.log("e.target.value: ", e.target.value);
    console.log("partyId: ", partyId);
    console.log("editLocationFormData: ", editLocationFormData);
    console.log("locationId: ", locationId);

    // TODO:
    // Figure out how to specify the specific route for a party's location for editing purposes:
    fetch(`/parties/${partyId}/location`, {
      // fetch(`/parties/${partyId}/location/${locationId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({"name": editLocationFormData["location_name"], "party_id": partyId, "locationId": locationId}),
    })
      .then((response) => response.json())
      .then((editedLocation) => {
        onEditLocation(editedLocation);
        swal("Location edited!");
      })
  }

  const handleDelete = (e) => {
    e.preventDefault();
    const partyId = chosenParty.id;

    fetch(`/parties/${partyId}/location`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({"name": editLocationFormData["location_name"], "party_id": partyId, "locationId": locationId}),
    })
      .then((response) => {
        if (response.ok) {
          onDeleteLocation(response, locationId);
          swal("Location deleted!");
        }
      })
  }

  return (
    <div>
      <br />
      <ChoosePartyDropdown parties={parties} onChooseParty={onChooseParty} />
      <h2>Edit Location</h2>
      <form>
        <Grid container alignItems="center" justify="center" direction="column" spacing={5}>
          <Grid item>
            <TextField
            InputLabelProps={{ shrink: true }}
            id="name"
            name="location_name"
            label='Name of Location'
            type="text"
            value={editLocationFormData.location_name}
            onChange={handleEditLocationChange}
            />
          </Grid>
          <Grid item xs={8}>
          </Grid>
          <Button onClick={handleEdit} variant="contained" color="primary" type="submit">Edit</Button>
          <Grid item xs={8}>
          </Grid>
          <Button onClick={handleDelete} variant="contained" color="primary" type="submit">Delete</Button>
        </Grid>
      </form>
    </div>
  )
}

export default EditLocationForm;
