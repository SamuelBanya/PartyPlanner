import React, { useState } from "react";
import swal from "sweetalert";

function AddPartyForm({ onAddParty }) {
    const [createPartyFormData, setCreatePartyFormData] = useState({
        name: "",
        start_time: "",
        end_time: ""
    });

    const handleCreatePartyChange = (e) => {
        setCreatePartyFormData({...createPartyFormData, [e.target.name]: e.target.value})
    };

    const handleCreatePartyFormSubmit = (e) => {
        console.log("createPartyFormData in handleCreatePartyFormSubmit function in AddPartyForm child component: ", createPartyFormData);
        console.log('createPartyFormData["name"] in handleCreatePartyFormSubmit function in AddPartyForm child component: ', createPartyFormData["name"]);
        console.log('createPartyFormData["start_time"] in handleCreatePartyFormSubmit function in AddPartyForm child component: ', createPartyFormData["start_time"]);
        console.log('createPartyFormData["end_time"] in handleCreatePartyFormSubmit function in AddPartyForm child component: ', createPartyFormData["end_time"]);
        e.preventDefault();
        fetch("/parties", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ "name": createPartyFormData["name"], "start_time": createPartyFormData["start_time"], "end_time": createPartyFormData["end_time"] }),
        })
        .then((response) => response.json())
        .then((newParty) => {
            onAddParty(newParty);
            swal("New party created!");
        });
    }

    return (
        <div>
            <h2>Add New Party</h2>
            <form onSubmit={handleCreatePartyFormSubmit}>
                <label htmlFor="name">Name of Party:</label>
                <br />
                <input onChange={handleCreatePartyChange} type="text" id="name" name="name"/>
                <br />
                <label htmlFor="start_time">Start Time of Party:</label>
                <br />
                <input onChange={handleCreatePartyChange}  type="text" id="start_time" name="start_time"/>
                <br />
                <label htmlFor="end_time">End Time of Party:</label>
                <br />
                <input onChange={handleCreatePartyChange} type="text" id="end_time" name="end_time"/>
                <br />
                <input type="submit"/>
            </form>
        </div>
    )

}

export default AddPartyForm;