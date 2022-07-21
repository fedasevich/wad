import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import './style.css';

function App() {
  console.log(process.env.REACT_APP_API_URL)
  return (

    <BrowserRouter>
     <AppRouter/>
     </BrowserRouter>
   
  );
}

export default App;
