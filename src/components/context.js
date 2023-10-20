import { createContext, useState } from "react";

const contextE = createContext()

function ContextProvider({ children }) {

    const [example, setExample] = useState('example///')

    return (
        <contextE.Provider value={{ example }}>
            {children}
        </contextE.Provider>
    )
}

export { contextE, ContextProvider }