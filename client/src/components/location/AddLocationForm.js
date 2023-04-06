import React, { useState, useEffect, useMemo, useRef } from "react";
import ChoosePartyDropdown from "../party/ChoosePartyDropdown";
import swal from "sweetalert";
// Material UI components for form buttons:
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// Importing 'GoogleMaps' component that is from MaterialUI docs page that was provided from here under 'Google Maps place':
// https://mui.com/material-ui/react-autocomplete/
import GoogleMaps from "./GoogleMaps.js";

function AddLocationForm({ parties, onChooseParty, onAddLocation, chosenParty}) {
  // NOTE:
  // This is used for the '<GoogleMaps />' component:
  const [value, setValue] = useState(null);

  const [createLocationFormData, setCreateLocationFormData] = useState({
    name: "",
  });

  const handleCreateLocationChange = (e) => {
    setCreateLocationFormData({...createLocationFormData, [e.target.name]: e.target.value})
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const id = chosenParty.id;

    if (value["description"] === undefined) {
    } else {
    fetch(`/parties/${id}/location`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        // Using 'Google Maps' example from MaterialU docs page:
        body: JSON.stringify({ "name": value["description"], "party_id": id}),
      })
        .then((response) => response.json())
        .then((newLocation) => {
          onAddLocation(newLocation);
          swal("Location added! : \n\n" + value['description']);
        });
    }
  }

  return (
    <div>
      <br />
      <ChoosePartyDropdown parties={parties} onChooseParty={onChooseParty} />
      <h2>Add Location</h2>
      <form onSubmit={handleCreate}>
        <Grid container alignItems="center" justify="center" direction="column" spacing={5}>
          <Grid item>
            <GoogleMaps value={value} setValue={setValue} />
          </Grid>
          <Grid item xs={8}>
          </Grid>
          <Button variant="contained" color="primary" type="submit">Add Location</Button>
        </Grid>
      </form>

    </div>
  )

}

export default AddLocationForm;
