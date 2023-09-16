import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/constants';

export function AuthLinks({ isLogin }) {
  return (
    <>
      {isLogin ? (
        <p className="mt-4">
          Don&apos;t have account?{' '}
          <NavLink className=" text-decoration-none fw-medium auth-form-nav-link" to={REGISTRATION_ROUTE}>
            Sign up
          </NavLink>
        </p>
      ) : (
        <p className="mt-4">
          Have account?{' '}
          <NavLink className=" text-decoration-none fw-medium auth-form-nav-link" to={LOGIN_ROUTE}>
            Sign in
          </NavLink>
        </p>
      )}
    </>
  );
}
