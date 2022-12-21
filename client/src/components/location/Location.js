import React from "react";

function Location({ parties, onFetchParties, onAddLocation, onEditLocation, onDeleteLocation, onChooseParty, chosenParty}) {
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

    function toggleAddLocation() {
        setShowAdd(!showAdd);
    }

    function toggleEditLocation() {
        setShowEdit(!showEdit);
    }

    return (
        <div>
            <h1>Locations</h1>
            <button onClick={toggleAddLocation}>Add Location</button>
            <br />
            <br />
            <button onClick={toggleEditLocation}>Edit Location</button>
            <br />
            { 
                showAdd  &&
                <AddLocationForm 
                    onAddLocation={onAddLocation} 
                />
            }
            {   
                showAdd && showEdit &&
                <hr/>
            }
            {   
                showEdit &&
                <EditLocationForm 
                    onEditLocation={onEditLocation} onDeleteLocation={onDeleteLocation} 
                    parties={parties} onChooseParty={onChooseParty} chosenParty={chosenParty} 
                />
            }
        </div>
    )
}

export default Location;