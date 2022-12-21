import React, { useState } from "react";
import ChoosePartyDropdown from "../party/ChoosePartyDropdown";

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
        .then((newLocation) => onAddLocation(newLocation));
    }

    return (
        <div>
            <ChoosePartyDropdown parties={parties} onChooseParty={onChooseParty} />
            <h2>Add Location</h2>
            <form>
                <label htmlFor="name">Name of Location:</label>
                <br />
                <input onChange={handleCreateLocationChange} type="text" id="name" name="location_name"/>
                <br />
                <input onClick={handleCreate} type="submit"/>
            </form>
        </div>
    )


}

export default AddLocationForm;