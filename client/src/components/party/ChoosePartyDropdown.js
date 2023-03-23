// import React, { useState } from "react";
import React, { useState } from "react";
// From MaterialUI:
import Box from '@mui/material/Box';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function ChoosePartyForm({ parties, onChooseParty}) {

  const [partySelection, setPartySelection] = useState("");

  let partyOptionsArray = parties.map(party => {
    return (
      <MenuItem key="{party.name}"  value={party.name}>{party.name}</MenuItem>
    )
  });

  return (
    <FormControl style={{minWidth: 200}}>
    <InputLabel id="demo-simple-select-label">Choose a Party:</InputLabel>
    <br />
    <Select
    labelId="demo-simple-select-label"
    id="choose_party"
    label="Choose Party"
    onChange={onChooseParty}
    >
    { partyOptionsArray }
</Select>
      </FormControl>
  )
}

export default ChoosePartyForm;
