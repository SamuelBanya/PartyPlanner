import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import ChoosePartyDropdown from "../party/ChoosePartyDropdown";

function EditLocationForm({ locationOptions, setLocationOptions, locationId, setLocationId, onChangeLocationInfo, onEditLocation, onDeleteLocation, parties, onChooseParty, chosenParty }) {
    const [editLocationFormData, setEditLocationFormData] = useState({
        location_name: ""
    });

    // TODO:
    // Actually take this whole process out since there is only one location for each party anyway:
    // Aka just base it off the 'chosenParty' and dump the value into the corresponding form
    function handleChooseLocation(e) {
        console.log("handleChooseLocation function called within EditLocationForm child component");
        console.log("locationOptions: ", locationOptions);

        console.log("locationOptions.props.value: ", locationOptions.props.value);
        let locationMatch = locationOptions.props.value;

        setEditLocationFormData({"location_name": locationMatch});

        console.log("parties: ", parties);
        console.log("chosenParty: ", chosenParty);
        console.log("chosenParty.location: ", chosenParty.location);

        let chosenPartyLocationMatch = chosenParty.location;

        onChangeLocationInfo(chosenPartyLocationMatch);
    }

    const handleEditLocationChange = (e) => {
        setEditLocationFormData({...editLocationFormData, [e.target.name]: e.target.value})
    }

    const handleEdit = (e) => {
        e.preventDefault();

        const partyId = chosenParty.id;

        fetch(`/parties/${partyId}/location/${locationId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({"name": editLocationFormData["location_name"], "party_id": partyId}),
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

        fetch(`/parties/${partyId}/location/${locationId}`, {
            method: "DELETE",
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
            <ChoosePartyDropdown parties={parties} onChooseParty={onChooseParty} />
            <h2>Edit Location</h2>
            <form>
                <label htmlFor="location_select">Choose the Location:</label>
                <br />
                <select name="location_select" id="location_select" onChange={handleChooseLocation}>
                    <option disabled selected value> -- Select a location -- </option>
                    { locationOptions }
                </select>
                <br />
                <br />
                <label htmlFor="name">Name of Location:</label>
                <br />
                <input onChange={handleEditLocationChange} type="text" id="name" name="location_name" value={editLocationFormData.location_name}/>
                <br />
                <br />
                <input onClick={handleEdit} type="submit" value="Edit" />
                <br />
                <input onClick={handleDelete} type="submit" value="Delete" />
            </form>
        </div>
    )
}

export default EditLocationForm;