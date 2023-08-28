import { observer } from 'mobx-react-lite';
import React from 'react';
import { CancelIcon, CheckMarkIcon } from '../ui/Icons/ControlIcons/ControlIcons';

function Header({ children }) {
  return <div className="menu-header">{children}</div>;
}

function HeaderBorderBottom({ children }) {
  return <div className="menu-header border-bottom">{children}</div>;
}

function Actions({ children, close, commit }) {
  const handleClose = () => close();

  const handleCommit = () => commit();

  return (
    <div className="menu-colored-header bg-secondary-blue component-border-radius d-flex flex-row justify-content-between">
      <button type="button" className="cursor-pointer" onClick={handleClose} data-testid="menu-cancel-button">
        {close && <CancelIcon />}
      </button>
      <div className="">{children}</div>

      <button type="button" className="cursor-pointer" onClick={handleCommit} data-testid="menu-commit-button">
        {commit && <CheckMarkIcon />}
      </button>
    </div>
  );
}

function Rounded({ children }) {
  return (
    <div className="menu-colored-header bg-secondary-blue component-border-radius d-flex flex-row justify-content-between">
      <div className="">{children}</div>
    </div>
  );
}

function Straight({ children }) {
  return (
    <div className="align-items-center menu-colored-header component-none-border-radius-bottom  bg-secondary-blue component-border-radius d-flex flex-row justify-content-between">
      {children}
    </div>
  );
}

function Container({ children, className = '' }) {
  return <div className={`menu-container d-flex flex-column ${className}`}>{children}</div>;
}

const MenuProvider = observer(({ children, className }) => {
  return <div className={`${className} menu mb-3`}>{children}</div>;
});

MenuProvider.Header = Header;
MenuProvider.Container = Container;
MenuProvider.Actions = Actions;
MenuProvider.Header.Rounded = Rounded;
MenuProvider.Header.Straight = Straight;
MenuProvider.Header.BorderBottom = HeaderBorderBottom;
export default MenuProvider;
