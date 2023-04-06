import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import ChoosePartyDropdown from "../party/ChoosePartyDropdown";
// Material UI components for form buttons:
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// Importing 'GoogleMaps' component that is from MaterialUI docs page that was provided from here under 'Google Maps place':
// https://mui.com/material-ui/react-autocomplete/
import GoogleMaps from "./GoogleMaps.js";

function EditLocationForm({ location, locationId, onEditLocation, onDeleteLocation, parties, onChooseParty, chosenParty }) {
  // NOTE:
  // This is used for the '<GoogleMaps />' component:
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (location.length === 0) {
      setValue("")
    }
    else {
      setValue(location)
    }
  }, [chosenParty]);

  const handleEdit = (e) => {
    e.preventDefault();

    const partyId = chosenParty.id;

    if (value["description"] === undefined) {
    } else {
      console.log('value["description"] in EditLocationForm component after Edit button clicked: ', value["description"]);
      fetch(`/parties/${partyId}/location`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
        body: JSON.stringify({"name": value["description"], "party_id": partyId, "locationId": locationId}),
      })
        .then((response) => response.json())
        .then((editedLocation) => {
          onEditLocation(editedLocation);
          swal("Location edited!");
        })
    }
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
      body: JSON.stringify({"name": value["description"], "party_id": partyId, "locationId": locationId}),
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
            <GoogleMaps value={value} setValue={setValue} />
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
