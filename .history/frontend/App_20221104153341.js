import 'regenerator-runtime/runtime';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./Pages/Dashbard";
import Home from "./Pages/Home";
import Header from './Components/Header';
import Chathome from './Components/Chathome';
import Chat from "./Components/Chat";
import "./App.css";
import { GameBloc } from './near-interface';


const App = ({ isSignedIn, wallet }) => {

  const account = localStorage.getItem('near_app_wallet_auth_key')
  const accountJSON = JSON.parse(account)
  const accountID = accountJSON.accountId

  GameBloc.getUserID(accountID)

  return (
    <Router>
      <>
        <Header
          isSignedIn={isSignedIn}
          wallet={wallet}
        />
      </>
      <div className="app">
        <Dashboard />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbox" element={<Chat />} />
        </Routes>

        <Chathome />
      </div>
    </Router>
  );
};

export default App;


