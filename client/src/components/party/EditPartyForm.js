import React, { useEffect, useState } from "react";
import ChoosePartyDropdown from "../party/ChoosePartyDropdown";
import swal from "sweetalert";
// Material UI components for form buttons:
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function EditPartyForm({ parties, onChooseParty, onEditParty, onDeleteParty, chosenParty }) {
  useEffect(() => {
    setEditPartyFormData({
      name: chosenParty.name,
      start_time: chosenParty.start_time,
      end_time: chosenParty.end_time
    })
  }, [chosenParty]);

  const [editPartyFormData, setEditPartyFormData] = useState({
    name: chosenParty.name,
    start_time: chosenParty.start_time,
    end_time: chosenParty.end_time
  });

  const handleEditPartyChange = (e) => {
    setEditPartyFormData({...editPartyFormData, [e.target.name]: e.target.value})
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const id = chosenParty.id;

    fetch(`/parties/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ "name": editPartyFormData["name"], "start_time": editPartyFormData["start_time"], "end_time": editPartyFormData["end_time"] }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response: ", response);
        if (!response.errors) {
          onEditParty(response);
          swal("Party edited!");
        }
        else {
          swal("Party could not be edited! You need to associate items and a location to a party before it can be edited!");
        }
      });
  }

  const handleDelete = (e) => {
    e.preventDefault();
    const id = chosenParty.id;

    fetch(`/parties/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          onDeleteParty(chosenParty);
          swal("Party deleted!");
        }
        else {
          swal("Party could not be deleted! You need to associate items to a party before it can be deleted!");
        }
      })
  }

  return (
    <div>
      <ChoosePartyDropdown parties={parties} onChooseParty={onChooseParty} />
      <h2>Edit Party</h2>
      <form>
        <Grid container alignItems="center" justify="center" direction="column" spacing={5}>
          <Grid item>
            <TextField
            InputLabelProps={{ shrink: true }}
            id="name"
            name="name"
            label='Name of Party'
            type="text"
            value={editPartyFormData.name}
            onChange={handleEditPartyChange}
            />
          </Grid>
          <br />
          <Grid item>
            <TextField
            InputLabelProps={{ shrink: true }}
            id="start_time"
            name="start_time"
            label='Start Time of Party'
            type="text"
            value={editPartyFormData.start_time}
            onChange={handleEditPartyChange}
            />
          </Grid>
          <br />
          <Grid item>
            <TextField
            InputLabelProps={{ shrink: true }}
            id="end_time"
            name="end_time"
            label='End Time of Party'
            type="text"
            value={editPartyFormData.end_time}
            onChange={handleEditPartyChange}
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

export default EditPartyForm;
