import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import ChoosePartyDropdown from "../party/ChoosePartyDropdown";

function EditLocationForm({ onEditLocation, onDeleteLocation, parties, onChooseParty, chosenParty }) {

    const [editLocationFormData, setEditLocationFormData] = useState({
        location_name: ""
    });

    // TODO: 
    // Use a 'useEffect' block that pulls in the form data each time the 'chosenParty' within the 'party/ChoosePartyDropdown' menu is changed:
    useEffect(() => {
        console.log("chosenParty changed, reacting to this change with a useEffect block in EditLocationForm")
        console.log("chosenParty.location: ", chosenParty.location);
        setEditLocationFormData({location_name: chosenParty.location});
        // setEditLocationFormData({...editLocationFormData, [location_name]: chosenParty.location});
    }, [chosenParty]);

    const handleEditLocationChange = (e) => {
        setEditLocationFormData({...editLocationFormData, [e.target.name]: e.target.value})
    }

    const handleEdit = (e) => {
        e.preventDefault();

        const partyId = chosenParty.id;

        // fetch(`/parties/${partyId}/location/${locationId}`, {
        //     method: "PATCH",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "application/json"
        //     },
        //     body: JSON.stringify({"name": editLocationFormData["location_name"], "party_id": partyId}),
        // })
        // .then((response) => response.json())
        // .then((editedLocation) => {
        //     onEditLocation(editedLocation);
        //     swal("Location edited!");
        // })
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const partyId = chosenParty.id;

        // fetch(`/parties/${partyId}/location/${locationId}`, {
        //     method: "DELETE",
        // })
        // .then((response) => {
        //     if (response.ok) {
        //         onDeleteLocation(response, locationId);
        //         swal("Location deleted!");
        //     }
        // })
    }

    return (
        <div>
            <ChoosePartyDropdown parties={parties} onChooseParty={onChooseParty} />
            <h2>Edit Location</h2>
            <form>
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