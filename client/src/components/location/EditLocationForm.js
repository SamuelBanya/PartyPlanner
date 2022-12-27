import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import ChoosePartyDropdown from "../party/ChoosePartyDropdown";

function EditLocationForm({ location, locationId, onEditLocation, onDeleteLocation, parties, onChooseParty, chosenParty }) {

    const [editLocationFormData, setEditLocationFormData] = useState({
        location_name: ""
    });

    console.log("location within EditLocationForm child component: ", location);

    // TODO: 
    // Use a 'useEffect' block that pulls in the form data each time the 'chosenParty' within the 'party/ChoosePartyDropdown' menu is changed:
    useEffect(() => {
        // console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
        // console.log("chosenParty changed, reacting to this change with a useEffect block in EditLocationForm");
        // console.log("location: ", location);
        setEditLocationFormData({location_name: location});
        // console.log("editLocationFormData after useEffect: ", editLocationFormData);
        // console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
    }, [chosenParty]);
    
    console.log("editLocationFormData outside useEffect: ", editLocationFormData);

    const handleEditLocationChange = (e) => {
        setEditLocationFormData({...editLocationFormData, [e.target.name]: e.target.value})
    }

    const handleEdit = (e) => {
        e.preventDefault();

        const partyId = chosenParty.id;

        console.log("handleEdit function called in EditLocationForm child component");
        console.log("e.target.value: ", e.target.value);
        console.log("partyId: ", partyId);
        console.log("editLocationFormData: ", editLocationFormData);
        console.log("locationId: ", locationId);

        // TODO:
        // Figure out how to specify the specific route for a party's location for editing purposes:
        fetch(`/parties/${partyId}/location`, {
        // fetch(`/parties/${partyId}/location/${locationId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({"name": editLocationFormData["location_name"], "party_id": partyId, "locationId": locationId}),
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