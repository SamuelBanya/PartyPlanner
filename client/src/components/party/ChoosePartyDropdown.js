import React from "react";

function ChoosePartyForm({ parties, onChooseParty}) {
    let partyOptionsArray = parties.map(party => {
        return (
            <option key={party.id} value={party.name}>{party.name}</option>
        )
    });


    return (
        <>
            <h2>Choose Party: </h2>
            <form>
                <label htmlFor="choose_party">Choose a Party:</label>
                <br />
                <select name="choose_party" id="choose_party" onChange={onChooseParty}>
                    <option disabled selected value> -- Select a party -- </option>
                    { partyOptionsArray }
                </select>
                <br />
            </form>
        </>
    )
}

export default ChoosePartyForm;