import React, { useState } from "react";
import ChoosePartyDropdown from "../party/ChoosePartyDropdown";
import swal from "sweetalert";
// Material UI components for form buttons:
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function AddItemForm({ onAddItem, parties, onChooseParty, chosenParty }) {
  const [createItemFormData, setCreateItemFormData] = useState({
    name: "",
  });

  const handleCreateItemChange = (e) => {
    setCreateItemFormData({...createItemFormData, [e.target.name]: e.target.value})
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const id = chosenParty.id;
    fetch(`/parties/${id}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ "name": createItemFormData["item_name"], "party_id": id}),
    })
      .then((response) => response.json())
      .then((newItem) => {
        onAddItem(newItem)
        swal("New item added! : \n\n" + createItemFormData['item_name']);
      });
  }

  return (
    <div>
      <br />
      <ChoosePartyDropdown parties={parties} onChooseParty={onChooseParty} />
      <h2>Add New Item</h2>
      <form onSubmit={handleCreate}>
        <Grid container alignItems="center" justify="center" direction="column" spacing={5}>
          <Grid item>
            <TextField
            id="name"
            name="item_name"
            label='Name of Item'
            type="text"
            onChange={handleCreateItemChange}
            />
          </Grid>
          <Grid item xs={8}>
          </Grid>
          <Button variant="contained" color="primary" type="submit">Add Item</Button>
        </Grid>
      </form>
    </div>
  )

}

export default AddItemForm;
