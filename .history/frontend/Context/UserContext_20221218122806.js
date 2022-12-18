import React, {useState} from "react";
import TournamentData from "../Features/TournamentData";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
const account = localStorage.getItem('near_app_wallet_auth_key') === null ? "Username" : localStorage.getItem('near_app_wallet_auth_key');
  const [userName, setUserName] = useState("");

  let accountJSON

  useEffect(() => {
    if (account === "Username") {
      setUserName("Username")
    } else {
      accountJSON = JSON.parse(account);
      const accountID = accountJSON.accountId;
      setUserName(accountID.substring(0, accountID.length - 8));
    }
  }, [userName])

    return (
        <UserContext.Provider value={{TournamentData, userName}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };