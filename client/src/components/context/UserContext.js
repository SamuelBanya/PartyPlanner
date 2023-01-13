import React, { useContext, createContext } from "react"

function UserContext() {
    const UserContext = createContext();
    return (
        <h2>Hello {user}</h2>
    )
}

export default UserContext;