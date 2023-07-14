import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Context } from '../index';
import { authRoutes, publicRoutes } from '../routes';
import { LOGIN_ROUTE } from '../utils/constants';

const AppRouter = observer(() => {
  const { user } = useContext(Context)
  return (
    <Routes>
      {user.isAuth && authRoutes.map(({ path, Component }) =>
        <Route key={path} path={path} element={<Component />} exact />
      )}
      {publicRoutes.map(({ path, Component }) =>
        <Route key={path} path={path} element={<Component />} exact />
      )}
      <Route
        path="*"
        element={<Navigate to={LOGIN_ROUTE} replace />}
      />
    </Routes>
  )
})

export default AppRouter