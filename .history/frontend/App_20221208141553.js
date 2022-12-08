import 'regenerator-runtime/runtime';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Header from './Components/Header';
import Chathome from './Components/Chathome';
import Chat from "./Components/Chat";
import Tournament from './Pages/Tournament';
import "./App.css";
import CreateTournament from './Pages/CreateTournament';
import SoonPopUP from './Components/Popup/SoonPopUp';


const App = ({ isSignedIn, wallet, gamebloc }) => {
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
  
  
  gamebloc.new(accountID).then((e) => console.log(e)
  );

  return (
    <Router>
      <>
        <Header
          isSignedIn={isSignedIn}
          wallet={wallet}
        />
      </>
      <div className="app">
        <Dashboard userName={userName} isSignedIn={isSignedIn} wallet={wallet} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbox" element={<Chat />} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/modal" element={<SoonPopUP />} />
          <Route path="/tournament/:id" element={<CreateTournament gamebloc={gamebloc} />} />
        </Routes>

        <Chathome />
      </div>
    </Router>
  );
};

export default App;


