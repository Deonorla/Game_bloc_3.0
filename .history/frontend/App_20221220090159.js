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
import AllTournaments from './Components/AllTournaments';


const App = ({ isSignedIn, wallet, gamebloc }) => {
  
  // gamebloc.new(accountID).then((e) => console.log(e)
  // );

  return (
    <Router>
      <>
        <Header
          isSignedIn={isSignedIn}
          wallet={wallet}
        />
      </>
      <div className="app">
        <Dashboard isSignedIn={isSignedIn} wallet={wallet} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbox" element={<Chat />} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/modal" element={<SoonPopUP />} />
          <Route path="/all-tournaments" element={<AllTournaments gamebloc={gamebloc} isSigned={isSignedIn} />} />
          <Route path="/tournament/:id" element={<CreateTournament gamebloc={gamebloc} />} />
        </Routes>

        <Chathome isSignedIn={isSignedIn} gamebloc={gamebloc} />
      </div>
    </Router>
  );
};

export default App;


