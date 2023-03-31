import React, { useState } from "react";
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

function AddPartyForm({ onAddParty }) {
  const [createPartyFormData, setCreatePartyFormData] = useState({
    name: ""
  });

  // Adding 'start_time' and 'end_time' changes separately because MaterialUI does not utilize
  // 'e.target.value' in the same fashion:
  // const simplifiedISOString = toSimplifiedISOString(dayjs());
  // const [startTime, setStartTime] = useState(dayjs('2022-04-17T15:30'));
  // const [endTime, setEndTime] = useState(dayjs('2022-04-17T15:30'));
  // const [startTime, setStartTime] = useState(dayjs(simplifiedISOString));
  // const [endTime, setEndTime] = useState(dayjs(simplifiedISOString));
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());

  // Example for 'Date Picker' from MaterialUI:
  // https://mui.com/x/react-date-pickers/date-picker/

  // Related YouTube video:
  // React Material UI Tutorial - 40 - Date and Time Picker (https://www.youtube.com/watch?v=OpaT8jLB-hc)

  const handleCreatePartyChange = (e) => {
    setCreatePartyFormData({...createPartyFormData, [e.target.name]: e.target.value})
  };

  const handleCreatePartyFormSubmit = (e) => {
    e.preventDefault();
    // NOTE:
    // If I want to actually USE the date time stamps elsewhere, like the 'Edit Parties' component,
    // then, I will need to place the entire recorded '$d' key value in 'dayjs' to restore it
    // aka 'dayjs(endTime["$d"])'
    fetch("/parties", {
    method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ "name": createPartyFormData["name"], "start_time": dayjs(startTime["$d"]), "end_time": dayjs(endTime["$d"]) }),
    })
      .then((response) => response.json())
      .then((newParty) => {
        onAddParty(newParty);
        swal("New party created! : \n\n" + createPartyFormData['name']);
      });
  }

  return (
    <div>
      <h2>Add New Party</h2>
      <form onSubmit={handleCreatePartyFormSubmit}>
        <Grid container alignItems="center" justify="center" direction="column" spacing={5}>
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
          <Button variant="contained" color="primary" type="submit">Add Party</Button>
        </Grid>
      </form>
    </div>
  )

}

export default AddPartyForm;
