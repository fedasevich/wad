import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Context } from './index';
import { check } from './http/userApi';
import AppRouter from './components/AppRouter';
import './ui/style.css';



const App = observer(()=> {
  const {user} = useContext(Context)
  const [loading,setLoading] = useState(true)
 
  useEffect(() => {
    check().then(data => {
        user.setUser(data)
        user.setIsAuth(true)
    }).finally(() => setLoading(false))
}, [])

if (loading) {
  return <h2>loading</h2>
}

  return (
<>

    <BrowserRouter>
     <AppRouter/>
     </BrowserRouter>
     </>
  );
})

export default App;
