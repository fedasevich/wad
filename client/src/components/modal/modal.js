import React, { useRef } from 'react'
import { useOnClickOutside } from '../calculator/Hooks/useOnClickOutisde';
import './modalStyle.css'

const Modal = ({active,setActive,children}) => {
  const modalRef = useRef(); 
  useOnClickOutside(modalRef, () => setActive(false));
  return (
    <div className={active ? "custom_modal active":"custom_modal" }>
        <div ref={modalRef} className={active ? "custom_modal_content active":"custom_modal_content" }>{children}</div>
    </div>
  )
}

export default Modal