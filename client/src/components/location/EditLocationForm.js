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

  useEffect(() => {
    if (location.length === 0) {
      setEditLocationFormData({location_name: ""});
    }
    else {
      setEditLocationFormData({location_name: location});
    }
  }, [chosenParty]);

  const handleEditLocationChange = (e) => {
    setEditLocationFormData({...editLocationFormData, [e.target.name]: e.target.value})
  }

  const handleEdit = (e) => {
    e.preventDefault();

    const partyId = chosenParty.id;

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
