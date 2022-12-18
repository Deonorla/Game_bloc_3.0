import React, { useEffect, useState } from "react";
import TournamentData from "../Features/TournamentData";
import { Wallet } from "../near-wallet";
import { GameBloc } from "../near-interface";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME });
    const gamebloc = new GameBloc({ contractId: process.env.CONTRACT_NAME, walletToUse: wallet });
    
        return (
            <UserContext.Provider
                value={{
                    TournamentData,
                    gamebloc,
                    wallet,
                }}
            >
                {children}
            </UserContext.Provider>
        )

    }
    


export { UserContext, UserProvider };