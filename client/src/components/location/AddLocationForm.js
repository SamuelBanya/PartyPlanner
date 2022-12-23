import React, { useState } from "react";
import ChoosePartyDropdown from "../party/ChoosePartyDropdown";
import swal from "sweetalert";

function AddLocationForm({ parties, onChooseParty, onAddLocation, chosenParty}) {
    console.log("parties within AddLocationForm child component: ", parties);

    const [createLocationFormData, setCreateLocationFormData] = useState({
        name: "",
    });

    const handleCreateLocationChange = (e) => {
        setCreateLocationFormData({...createLocationFormData, [e.target.name]: e.target.value})
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const id = chosenParty.id;
        console.log("id in handleCreate function in AddLocationForm child component: ", id);
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
            swal("Location added!");
        });
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