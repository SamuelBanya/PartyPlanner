import React, { useState } from "react";
import ChoosePartyDropdown from "../party/ChoosePartyDropdown";
import swal from "sweetalert";
// Material UI components for form buttons:
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function AddLocationForm({ parties, onChooseParty, onAddLocation, chosenParty}) {
  const [createLocationFormData, setCreateLocationFormData] = useState({
    name: "",
  });

  const handleCreateLocationChange = (e) => {
    setCreateLocationFormData({...createLocationFormData, [e.target.name]: e.target.value})
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const id = chosenParty.id;
    fetch(`/parties/${id}/location`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ "name": createLocationFormData["location_name"], "party_id": id}),
    })
      .then((response) => response.json())
      .then((newLocation) => {
        onAddLocation(newLocation);
        swal("Location added! : \n\n" + createLocationFormData['location_name']);
      });
  }

  return (
    <div>
      <br />
      <ChoosePartyDropdown parties={parties} onChooseParty={onChooseParty} />
      <h2>Add Location</h2>
      <form onSubmit={handleCreate}>
        <Grid container alignItems="center" justify="center" direction="column" spacing={5}>
          <Grid item>
            <TextField
            id="name"
            name="location_name"
            label='Address of Location'
            type="text"
            onChange={handleCreateLocationChange}
            />
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
