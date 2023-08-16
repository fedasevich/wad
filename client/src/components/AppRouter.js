import { observer } from 'mobx-react-lite';
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { useStore } from '../store';
import { LOGIN_ROUTE } from '../utils/constants';
import { SidebarLayout } from './SidebarLayout';

const AppRouter = observer(() => {
  const { user } = useStore();
  return (
    <Suspense>
      <Routes>
        <Route element={<SidebarLayout />}>
          {user.isAuth &&
            authRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} exact />)}
        </Route>
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
        <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
      </Routes>
    </Suspense>
  );
});

export default AppRouter;
