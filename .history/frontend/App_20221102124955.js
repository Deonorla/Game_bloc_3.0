import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./Pages/Dashbard";
import Home from "./Pages/Home";
import Header from './Components/Header';
import Chathome from './Components/Chathome';
import Details from "./Pages/Details";
import Chat from "./Components/Chat";
import Form from './Components/Form';
import SignIn from './Components/SignIn';
import Messages from './Components/Messages';
import "./App.css";


const App = ({ isSignedIn, wallet }) => {
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


