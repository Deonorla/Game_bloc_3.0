// React
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// NEAR
import { GuestBook } from './near-interface';
import { Wallet } from './near-wallet';
import store from './store';
import { Provider } from 'react-redux';

// When creating the wallet you can choose to create an access key, so the user
// can skip signing non-payable methods when talking wth the  contract
const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME })

// Abstract the logic of interacting with the contract to simplify your flow
const guestBook = new GuestBook({ contractId: process.env.CONTRACT_NAME, walletToUse: wallet });

const root = ReactDOM.createRoot(document.getElementById('root'));
// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp()
  root.render(
    <React.StrictMode>
      {/* <Provider store={store}> */}
      <App isSignedIn={isSignedIn} wallet={wallet} />
      {/* </Provider> */}
    </React.StrictMode>
  );
}