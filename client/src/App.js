import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import './style.css';

const App = observer(()=> {
  // useEffect(()=>{
  //   const {user} = useContext(Context)
  //   const [loading,setLoading] = useState(true)
  //   console.log(process.env.REACT_APP_API_URL)
  // },[])

  return (

    <BrowserRouter>
     <AppRouter/>
     </BrowserRouter>
   
  );
})

export default App;
