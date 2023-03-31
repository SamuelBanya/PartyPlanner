import React, { useEffect, useState } from "react";
import ChoosePartyDropdown from "../party/ChoosePartyDropdown";
import swal from "sweetalert";
// Material UI components for form buttons:
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// Dependencies from Material UI based 'Date Picker' Docs page example:
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// Variables to allow for validation for 'startTime' and 'endTime' MaterialUI based 'DateTimePicker' fields:
const today = dayjs();
const yesterday = dayjs().subtract(1, 'day');

function EditPartyForm({ parties, onChooseParty, onEditParty, onDeleteParty, chosenParty }) {
  useEffect(() => {
    setEditPartyFormData({
      name: chosenParty.name
    });

    setStartTime(dayjs(chosenParty.start_time));
    setEndTime(dayjs(chosenParty.end_time));

  }, [chosenParty]);

  // NOTE:
  // I had to separate 'start_time' and 'end_time' into their own components because of how
  // different the 'event' is for MaterialUI components like the 'DateTimePicker'

  const [editPartyFormData, setEditPartyFormData] = useState({
    name: chosenParty.name
  });

  // const [startTime, setStartTime] = useState(dayjs());
  // const [endTime, setEndTime] = useState(dayjs());
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());

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
      body: JSON.stringify({ "name": editPartyFormData["name"], "start_time": dayjs(startTime["$d"]), "end_time": dayjs(endTime["$d"]) }),
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
              label="Start Time of Party"
              id="start_time"
              name="start_time"
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              minDate={yesterday}
              />
            </LocalizationProvider>
          </Grid>
          <br />
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
              label="End Time of Party"
              id="end_time"
              name="end_time"
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
              minDate={yesterday}
              />
            </LocalizationProvider>
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
