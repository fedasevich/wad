import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Context } from './index';
import { check } from './http/userApi';
import AppRouter from './components/AppRouter';
import './style.css';
import { fetchCategory } from './http/categoryApi';
import { fetchWallet } from './http/walletApi';



const App = observer(() => {
  const { user,category,wallet } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
      fetchCategory().then(data=> category.setCategories(data))
      fetchWallet().then(data => {wallet.setWallet(data)})
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <h2>loading</h2>
  }

  return (
    <>

      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
})

export default App;
