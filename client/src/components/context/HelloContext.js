import React, { createContext } from "react";

const HelloContext = createContext();

function HelloProvider({children}) {
    return (
        <HelloContext.Provider value="Hello">
            {children}
        </HelloContext.Provider>
    )
}

export { HelloContext, HelloProvider }