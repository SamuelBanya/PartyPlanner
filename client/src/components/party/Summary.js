import React, { useEffect } from "react"

function Summary({ parties, onFetchParties }) {
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

    let partyResults = parties.map((party) => {
        let partyItems = party.items.map((item) => {
            return (
                <li key={item.id}>{item.name}</li>
            )
        })

        // NOTE: I used this StackOverflow post as a reference to utilize 'Object.keys().length' to determine the length of the object:
        // https://stackoverflow.com/questions/126100/how-to-efficiently-count-the-number-of-keys-properties-of-an-object-in-javascrip
        let partyLocation = (<li></li>)
        if (party.location) {
            if (Object.keys(party.location).length > 0) {
                partyLocation = (
                    <li key={party.location.id}>{party.location.name}</li>
                )
            }
        }

        let usersArray = [];

        party.users.map((user) => {
            usersArray.push(user);
        })

        let uniqueUsers = [...new Set(usersArray.map((user) => user.username ))]  ;
        let partyUsers = uniqueUsers.map((user) => {
            return (
                <li key={uniqueUsers.indexOf(user)}>{user}</li>
            )
        })

        return (
            <>
                <ul>
                    <li>{party.name}</li>
                    <ul>
                        <li>Location</li>
                        <ul>
                            {partyLocation}
                        </ul>
                        <li>Start Time</li>
                        <ul>
                            {party.start_time}
                        </ul>
                        <li>End Time: </li>
                        <ul>
                            {party.end_time}
                        </ul>
                        <li>Items: </li>
                        <ul>
                            {partyItems}
                        </ul>
                        <li>Users: </li>
                        <ul>
                            {partyUsers}
                        </ul>
                    </ul>
                </ul>
            </>
        )
    });

    return (
        <>
            <h1>Summary</h1>
            { partyResults }
        </>
    )

}

export default Summary;