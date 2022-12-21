import React, { useState, useEffect } from "react";
import ChoosePartyDropdown from "../party/ChoosePartyDropdown";

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
        .then((editedItem) => onEditItem(editedItem))
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
            }
        })
    }

    return (
        <div>
            <ChoosePartyDropdown parties={parties} onChooseParty={onChooseParty} />
            <h2>Edit Item</h2>
            <form>
                <label htmlFor="item_select">Choose an Item:</label>
                <br />
                <select name="item_select" id="item_select" onChange={handleChooseItem}>
                    <option disabled selected value> -- Select an item -- </option>
                    { itemOptions }
                </select>
                <br />
                <br />
                <label htmlFor="name">Name of Item:</label>
                <br />
                <input onChange={handleEditItemChange} type="text" id="name" name="item_name" value={editItemFormData.item_name}/>
                <br />
                <br />
                <input onClick={handleEdit} type="submit" value="Edit" />
                <br />
                <input onClick={handleDelete} type="submit" value="Delete" />
            </form>
        </div>
    )
}

export default EditItemForm;