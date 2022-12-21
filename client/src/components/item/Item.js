import React, { useState, useEffect } from "react";
import AddItemForm from "./AddItemForm";
import EditItemForm from "./EditItemForm";

function Item({ onAddItem, itemOptions, setItemOptions, itemId, setItemId, onChangeItemInfo, onEditItem, onDeleteItem, parties, onChooseParty, chosenParty, onFetchParties }) {
    useEffect(() => {
        fetch("/parties", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        })
        .then((response) => response.json())
        .then((data) => {
            onFetchParties(data);
        });
    }, []);

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    function toggleAddItems() {
        setShowAdd(!showAdd);
    }

    function toggleEditItems() {
        setShowEdit(!showEdit);
    }
    return (
        <div>
            <h1>Items</h1>
            <button onClick={toggleAddItems}>Add Items</button>
            <br />
            <br />
            <button onClick={toggleEditItems}>Edit Items</button>
            <br />
            {   
                showAdd &&
                <AddItemForm 
                    onAddItem={onAddItem} 
                    parties={parties} onChooseParty={onChooseParty} chosenParty={chosenParty}
                />
            }
            {   
                showAdd && showEdit &&
                <hr/>
            }
            {
                showEdit&&
                <EditItemForm 
                    itemOptions={itemOptions} setItemOptions={setItemOptions} itemId={itemId} setItemId={setItemId} onChangeItemInfo={onChangeItemInfo}
                    onEditItem={onEditItem} onDeleteItem={onDeleteItem} 
                    parties={parties} onChooseParty={onChooseParty} chosenParty={chosenParty}
                />
            }
        </div>
    )
}

export default Item;