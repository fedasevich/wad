import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Context } from './index';
import { check } from './http/userApi';
import AppRouter from './components/AppRouter';
import './style.css';

const App = observer(()=> {
  const {user} = useContext(Context)
  const [loading,setLoading] = useState(true)
 
  useEffect(() => {
    check().then(data => {
        user.setUser(true)
        user.setIsAuth(true)
    }).finally(() => setLoading(false))
}, [])

  return (

    <BrowserRouter>
     <AppRouter/>
     </BrowserRouter>
   
  );
})

export default App;
