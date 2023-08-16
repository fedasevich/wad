import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM for using portals
import MenuProvider from '../MenuProvider';
import { useNestedModal } from '../calculator/Hooks/useNestedModal';
import './modalStyle.css';

const Modal = observer(({ active, setActive, children, id }) => {
  const modalRef = useRef();

  const portalContainer = document.getElementById('modal-root');

  useNestedModal(modalRef, () => setActive(false));

  if (!portalContainer) return null;

  return ReactDOM.createPortal(
    <div className={`custom_modal ${active ? 'active' : ''}`}>
      <div ref={modalRef} className={`custom_modal_content ${active ? 'active' : ''}`} id={id}>
        <MenuProvider>{children}</MenuProvider>
      </div>
    </div>,
    portalContainer
  );
});

export default Modal;
