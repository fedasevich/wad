import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import ErrorBoundary from './components/ErrorBoundary';
import { fetchCategory } from './http/categoryApi';
import { check } from './http/userApi';
import { fetchWallet } from './http/walletApi';
import { Context } from './index';
import './style.css';



const App = observer(() => {
  const { user, category, wallet } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
      fetchCategory().then(data => category.setCategories(data))
      fetchWallet().then(data => { wallet.setWallet(data) })
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <h2>loading</h2>
  }

  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
})

export default App;
