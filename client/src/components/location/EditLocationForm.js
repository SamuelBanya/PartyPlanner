import React, { useState } from "react";

function EditLocationForm(parties, onChooseParty, onEditLocation, onDeleteLocation, chosenParty ) {
    useEffect(() => {
        setEditLocationFormData({
            name: chosenParty.location.name
        })
    }, [chosenParty]);

    const [editLocationFormData, setEditLocationFormData] = useState({
        name: chosenParty.location.name
    });

    const handleEditLocationChange = (e) => {
        setEditLocationFormData({...editLocationFormData, [e.target.name]: e.target.value})
    };

    const handleEdit = (e) => {
        e.preventDefault();

        const id = chosenParty.id;

        fetch(`/parties/${id}/location`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ "name": editLocationFormData["name"], "party_id": id }),
        })
        .then((response) => response.json())
        .then((editedLocation) => onEditLocation(editedLocation));
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const id = chosenParty.id;

        fetch(`/parties/${id}/location`, {
            method: "DELETE",
        })
        .then((response) => {
            if (response.ok) {
                onDeleteLocation(chosenLocation);
            }
        })
    }

    return (
        <div>
            <ChoosePartyDropdown parties={parties} onChooseParty={onChooseParty} />
            <h2>Edit Location</h2>
            <form>
                <label htmlFor="name">Name of Location:</label>
                <br />
                <input onChange={handleEditLocationChange} type="text" id="name" name="name" value={editLocationFormData.name}/>
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