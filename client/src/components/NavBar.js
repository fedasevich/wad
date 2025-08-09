import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useStore } from '../store';
import '../style.css';
import {
  ChartBarIcon,
  ChartPieIcon,
  CreditCardIcon,
  GearSixIcon,
  LogoIcon,
  SignOutIcon
} from '../ui/Icons/NavbarIcons/NavIcons';
import { ANALYTICS_ROUTE, CATEGORY_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, SETTINGS_ROUTE } from '../utils/constants';

function NavItem({ to, children, icon, ...rest }) {
  return (
    <Nav.Item className="mb-0 mb-md-4">
      <NavLink
        to={to}
        {...rest}
        className="d-flex flex-column flex-md-row justify-content-center align-items-center d-md-block"
      >
        {icon}
        <span className="ms-0 ms-md-3">{children}</span>
      </NavLink>
    </Nav.Item>
  );
}

const NavBar = observer(() => {
  const { user } = useStore();

  const handleLogOut = () => user.logOut();

  const navigationItems = useMemo(
    () => [
      {
        to: MAIN_ROUTE,
        icon: <CreditCardIcon />,
        label: 'Accounts'
      },
      {
        to: CATEGORY_ROUTE,
        icon: <ChartPieIcon />,
        label: 'Categories'
      },
      {
        to: ANALYTICS_ROUTE,
        icon: <ChartBarIcon />,
        label: 'Analytics'
      },
      {
        to: SETTINGS_ROUTE,
        icon: <GearSixIcon />,
        label: 'Settings'
      },
      {
        to: LOGIN_ROUTE,
        icon: <SignOutIcon />,
        label: 'Sign out',
        onClick: handleLogOut
      }
    ],
    []
  );

  return (
    <aside className="navbar-aside d-flex justify-content-between flex-column desktop-height-100vh px-3 bg-main-blue px-lg-0 ps-md-4 ps-lg-4 fw-medium fs-6">
      <div className="h-100">
        <LogoIcon />
        <Nav
          variant="pills"
          className="flex-row align-items-center align-items-md-start flex-md-column mb-lg-0 mt-md-5 text-center mt-md-0 text-md-start justify-content-evenly justify-content-md-between"
        >
          {navigationItems.map((item) => (
            <NavItem key={item.to} {...item}>
              {item.label}
            </NavItem>
          ))}
        </Nav>
      </div>
    </aside>
  );
});

export default NavBar;
