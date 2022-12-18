import React, { useEffect, useState } from "react";
import TournamentData from "../Features/TournamentData";
import { Wallet } from "../near-wallet";
import { GameBloc } from "../near-interface";

const UserContext = React.createContext();

const UserProvider = ({ children }) => { 
        return (
            <UserContext.Provider
                value={{
                    TournamentData,
                }}
            >
                {children}
            </UserContext.Provider>
        )

    }
    


export { UserContext, UserProvider };