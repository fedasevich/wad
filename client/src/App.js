import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import ErrorBoundary from './components/ErrorBoundary';
import { fetchCategory } from './http/categoryApi';
import { check } from './http/userApi';
import { fetchWallet } from './http/walletApi';
import { useStore } from './store';
import './style.css';
import { useTheme } from './ui/hooks/useTheme';

const App = observer(() => {
  const { user, category, wallet } = useStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      return setLoading(false);
    }
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
        fetchCategory().then((data) => category.setCategories(data));
        fetchWallet().then((data) => wallet.setWallet(data));
      })
      .finally(() => setLoading(false));
  }, []);

  useTheme();

  if (loading) {
    return <h2>loading</h2>;
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ErrorBoundary>
  );
});

export default App;
