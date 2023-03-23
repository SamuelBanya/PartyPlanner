import React, { useState, useEffect } from "react";
import ChoosePartyDropdown from "../party/ChoosePartyDropdown";
import swal from "sweetalert";
// From MaterialUI:
import Box from '@mui/material/Box';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function EditItemForm({ itemOptions, setItemOptions, itemId, setItemId, onChangeItemInfo, onEditItem, onDeleteItem, parties, onChooseParty, chosenParty }) {
  const [editItemFormData, setEditItemFormData] = useState({
    item_name: ""
  });

  function handleChooseItem(e) {
    let mapMatch = itemOptions.find(item => {
      return item.props.value === e.target.value
    });

    let itemMatch = mapMatch.props.value;

    setEditItemFormData({"item_name": itemMatch});

    let chosenPartyItemsMatch = chosenParty.items.find(item => item.name === itemMatch);

    let chosenItemIndex = chosenParty.items.map(item => item.name).indexOf(itemMatch);

    let chosenItemId = chosenPartyItemsMatch.id;
    onChangeItemInfo(chosenItemId, chosenItemIndex);
  }

  const handleEditItemChange = (e) => {
    setEditItemFormData({...editItemFormData, [e.target.name]: e.target.value})
  }

  const handleEdit = (e) => {
    e.preventDefault();

    const partyId = chosenParty.id;

    fetch(`/parties/${partyId}/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({"name": editItemFormData["item_name"], "party_id": partyId}),
    })
      .then((response) => response.json())
      .then((editedItem) => {
        onEditItem(editedItem);
        swal("Item edited!");
      })
  }

  const handleDelete = (e) => {
    e.preventDefault();
    const partyId = chosenParty.id;

    fetch(`/parties/${partyId}/items/${itemId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          onDeleteItem(response, itemId);
          swal("Item deleted!");
        }
      })
  }

  return (
    <div>
      <br />
      <ChoosePartyDropdown parties={parties} onChooseParty={onChooseParty} />
      <h2>Edit Item</h2>
      <FormControl style={{minWidth: 200}}>
        <InputLabel id="demo-simple-select-label">Choose an Item:</InputLabel>
        <br />
        <Select
        labelId="demo-simple-select-label"
        id="item_select"
        label="Choose Item"
        onChange={handleChooseItem}
        >
          { itemOptions }
        </Select>
      </FormControl>
      <form>
        <Grid container alignItems="center" justify="center" direction="column" spacing={5}>
          <Grid item xs={8}>
          </Grid>
          <Grid item>
            <TextField
            InputLabelProps={{ shrink: true }}
            id="name"
            name="item_name"
            label='Name of Item'
            type="text"
            value={editItemFormData.item_name}
            onChange={handleEditItemChange}
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

export default EditItemForm;
