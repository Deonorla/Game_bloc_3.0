import React from "react";
import TournamentData from "../Features/TournamentData";

const UserContext = React.createContext({ TournamentData });

const UserProvider = ({ children }) => {
    return (
        <UserContext.Provider value={{ TournamentData }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };