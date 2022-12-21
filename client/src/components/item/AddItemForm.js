import React, { useState } from "react";
import ChoosePartyDropdown from "../party/ChoosePartyDropdown";
import swal from "sweetalert";

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
            swal("New item added!");
        });
    }

    return (
        <div>
            <ChoosePartyDropdown parties={parties} onChooseParty={onChooseParty} />
            <h2>Add New Item</h2>
            <form>
                <label htmlFor="name">Name of Item:</label>
                <br />
                <input onChange={handleCreateItemChange} type="text" id="name" name="item_name"/>
                <br />
                <input onClick={handleCreate} type="submit"/>
            </form>
        </div>
    )

}

export default AddItemForm;