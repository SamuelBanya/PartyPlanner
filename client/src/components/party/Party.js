import React, { useState, useEffect } from "react";
import AddPartyForm from "./AddPartyForm";
import EditPartyForm from "./EditPartyForm";

function Party({ parties, onFetchParties, onAddParty, onEditParty, onDeleteParty, onChooseParty, chosenParty}) {
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

    function toggleAddParties() {
        setShowAdd(!showAdd);
    }

    function toggleEditParties() {
        setShowEdit(!showEdit);
    }

    return (
        <div>
            <h1>Parties</h1>
            <button onClick={toggleAddParties}>Add Parties</button>
            <br />
            <br />
            <button onClick={toggleEditParties}>Edit Parties</button>
            <br />
            { 
                showAdd  &&
                <AddPartyForm 
                    onAddParty={onAddParty} 
                />
            }
            {   
                showAdd && showEdit &&
                <hr/>
            }
            {   
                showEdit &&
                <EditPartyForm 
                    onEditParty={onEditParty} onDeleteParty={onDeleteParty} 
                    parties={parties} onChooseParty={onChooseParty} chosenParty={chosenParty} 
                />
            }
        </div>
    )
}

export default Party;