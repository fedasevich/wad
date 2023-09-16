import React from 'react';

import { useLocation } from 'react-router-dom';
import { LogoIcon } from '../../ui/Icons/NavbarIcons/NavIcons';
import { LOGIN_ROUTE } from '../../utils/constants';
import { AuthForm } from './AuthForm';
import { AuthLinks } from './AuthLinks';

export function AuthFormContainer() {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  return (
    <div className="d-flex flex-column auth-form-container align-items-center px-5">
      <div className="d-md-none d-flex justify-content-center mb-4">
        <LogoIcon />
      </div>
      <div className="text-center">
        <h2 className="fw-bold mb-5 text-center"> {isLogin ? 'Sign in' : 'Sign up'}</h2>
      </div>
      <AuthForm isLogin={isLogin} />
      <div className="text-center text-lg-start">
        <AuthLinks isLogin={isLogin} />
      </div>
    </div>
  );
}
