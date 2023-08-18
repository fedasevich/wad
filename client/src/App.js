import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/loader/Loader';
import { check } from './http/userApi';
import { useStore } from './store';
import './style.css';
import { useTheme } from './ui/hooks/useTheme';

const App = observer(() => {
  const { user, rootStore } = useStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      return setLoading(false);
    }
    check()
      .then(async (data) => {
        user.setUser(data);
        user.setIsAuth(true);

        await rootStore.initializeCategoriesAndWallets();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useTheme();

  if (loading) {
    return <Loader />;
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
