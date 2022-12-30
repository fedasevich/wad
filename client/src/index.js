import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CategoryStore from './store/CategoryStore';
import UserStore from './store/UserStore';
import WalletStore from './store/WalletStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Context.Provider value={{
    user: new UserStore(),
    category: new CategoryStore(),
    wallet: new WalletStore()
  }}>

    <App />

  </Context.Provider>
  </React.StrictMode>
);


