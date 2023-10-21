import { observer } from 'mobx-react-lite';
import React from 'react';
import { CancelIcon, CheckMarkIcon } from '../ui/Icons/ControlIcons/ControlIcons';

function Header({ children }) {
  return <div className="menu-header">{children}</div>;
}

function HeaderBorderBottom({ children }) {
  return <div className="menu-header border-bottom">{children}</div>;
}

function Actions({ children, onClose, onCommit }) {
  const handleClose = () => onClose();

  const handleCommit = () => onCommit();

  return (
    <div className="menu-colored-header bg-secondary-blue component-border-radius d-flex flex-row justify-content-between">
      {onClose && <CancelButton onClose={handleClose} />}
      <div className="">{children}</div>
      {onCommit && <CommitButton onCommit={handleCommit} />}
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

function CancelButton({ onClose }) {
  return (
    <button type="button" className="cursor-pointer" onClick={onClose} data-testid="menu-cancel-button">
      <CancelIcon />
    </button>
  );
}

function CommitButton({ onCommit }) {
  return (
    <button type="button" className="cursor-pointer" onClick={onCommit} data-testid="menu-commit-button">
      <CheckMarkIcon />
    </button>
  );
}

const MenuProvider = observer(({ children, className = '' }) => {
  return <div className={`${className} menu mb-3`}>{children}</div>;
});

MenuProvider.Header = Header;
MenuProvider.Container = Container;
MenuProvider.Actions = Actions;
MenuProvider.Actions.Cancel = CancelButton;
MenuProvider.Actions.Commit = CommitButton;
MenuProvider.Header.Rounded = Rounded;
MenuProvider.Header.Straight = Straight;
MenuProvider.Header.BorderBottom = HeaderBorderBottom;
export default MenuProvider;
