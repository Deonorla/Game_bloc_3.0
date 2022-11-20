import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
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

  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   guestBook.getMessages().then(setMessages);
  // }, []);

  // onSubmit = async (e) => {
  //   e.preventDefault();

  //   const { fieldset, message, donation } = e.target.elements;

  //   fieldset.disabled = true;

  //   await guestBook.addMessage(message.value, donation.value)
  //   const messages = await guestBook.getMessages()

  //   setMessages(messages);
  //   message.value = '';
  //   donation.value = '0';
  //   fieldset.disabled = false;
  //   message.focus();
  // };

  // const signIn = () => { wallet.signIn() }

  // const signOut = () => { wallet.signOut() }



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
      <Route path="/" element={<Home/>} />
      <Route path="/chatbox" element={<Chat />}/>
    </Routes>

    <Chathome/>
   </div>
 </Router>
  );
};

export default App;
    // <main>
    //   <table>
    //     <tr>
    //       <td><h1>📖 NEAR Guest Book</h1></td>
    //       <td>{ isSignedIn
    //       ? <button onClick={signOut}>Log out</button>
    //       : <button onClick={signIn}>Log in</button>
    //     }</td>
    //     </tr>
    //   </table>
    
    //   <hr />
    //   { isSignedIn
    //     ? <Form onSubmit={onSubmit} currentAccountId={wallet.accountId} />
    //     : <SignIn/>
    //   }
    //   { !!isSignedIn && !!messages.length && <Messages messages={messages}/> }
    // </main>

