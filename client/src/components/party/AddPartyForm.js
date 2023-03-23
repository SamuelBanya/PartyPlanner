import React, { useState } from "react";
import swal from "sweetalert";
// Material UI components for form buttons:
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function AddPartyForm({ onAddParty }) {
  const [createPartyFormData, setCreatePartyFormData] = useState({
    name: "",
    start_time: "",
    end_time: ""
  });

  const handleCreatePartyChange = (e) => {
    setCreatePartyFormData({...createPartyFormData, [e.target.name]: e.target.value})
  };

  const handleCreatePartyFormSubmit = (e) => {
    e.preventDefault();
    fetch("/parties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ "name": createPartyFormData["name"], "start_time": createPartyFormData["start_time"], "end_time": createPartyFormData["end_time"] }),
    })
      .then((response) => response.json())
      .then((newParty) => {
        onAddParty(newParty);
        swal("New party created! : \n" + createPartyFormData['name']);
      });
  }

  return (
    <div>
      <h2>Add New Party</h2>
      <form onSubmit={handleCreatePartyFormSubmit}>
        <Grid container alignItems="center" justify="center" direction="column">
          <Grid item>
            <TextField
            id="name"
            name="name"
            label='Name of Party'
            type="text"
            value={createPartyFormData.name}
            onChange={handleCreatePartyChange}
            />
          </Grid>
          <br />
          <Grid item>
            <TextField
            id="start_time"
            name="start_time"
            label='Start Time of Party'
            type="text"
            value={createPartyFormData.start_time}
            onChange={handleCreatePartyChange}
            />
          </Grid>
          <br />
          <Grid item>
            <TextField
            id="end_time"
            name="end_time"
            label='End Time of Party'
            type="text"
            value={createPartyFormData.end_time}
            onChange={handleCreatePartyChange}
            />
          </Grid>
          <br />
          <Button variant="contained" color="primary" type="submit">Add Party</Button>
        </Grid>
      </form>
    </div>
  )

}

export default AddPartyForm;
