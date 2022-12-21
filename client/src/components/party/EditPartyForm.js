import React, { useEffect, useState } from "react";
import ChoosePartyDropdown from "../party/ChoosePartyDropdown";
import swal from "sweetalert";

function EditPartyForm({ parties, onChooseParty, onEditParty, onDeleteParty, chosenParty }) {
    useEffect(() => {
        setEditPartyFormData({
            name: chosenParty.name,
            start_time: chosenParty.start_time,
            end_time: chosenParty.end_time
        })
    }, [chosenParty]);

    const [editPartyFormData, setEditPartyFormData] = useState({
        name: chosenParty.name,
        start_time: chosenParty.start_time,
        end_time: chosenParty.end_time
    });

    const handleEditPartyChange = (e) => {
        setEditPartyFormData({...editPartyFormData, [e.target.name]: e.target.value})
    };

    const handleEdit = (e) => {
        e.preventDefault();

        const id = chosenParty.id;

        fetch(`/parties/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ "name": editPartyFormData["name"], "start_time": editPartyFormData["start_time"], "end_time": editPartyFormData["end_time"] }),
        })
        .then((response) => response.json())
        .then((editedParty) => {
            onEditParty(editedParty);
            swal("Party edited!");
        });
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const id = chosenParty.id;

        fetch(`/parties/${id}`, {
            method: "DELETE",
        })
        .then((response) => {
            if (response.ok) {
                onDeleteParty(chosenParty);
                swal("Party deleted!");
            }
        })
    }

    return (
        <div>
            <ChoosePartyDropdown parties={parties} onChooseParty={onChooseParty} />
            <h2>Edit Party</h2>
            <form>
                <label htmlFor="name">Name of Party:</label>
                <br />
                <input onChange={handleEditPartyChange} type="text" id="name" name="name" value={editPartyFormData.name}/>
                <br />
                <label htmlFor="start_time">Start Time of Party:</label>
                <br />
                <input onChange={handleEditPartyChange}  type="text" id="start_time" name="start_time" value={editPartyFormData.start_time}/>
                <br />
                <label htmlFor="end_time">End Time of Party:</label>
                <br />
                <input onChange={handleEditPartyChange} type="text" id="end_time" name="end_time" value={editPartyFormData.end_time}/>
                <br />
                <br />
                <input onClick={handleEdit} type="submit" value="Edit" />
                <br />
                <input onClick={handleDelete} type="submit" value="Delete" />
            </form>
        </div>
    )
}

export default EditPartyForm;