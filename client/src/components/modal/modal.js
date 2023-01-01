import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react'
import { useOnClickOutside } from '../calculator/Hooks/useOnClickOutside';
import './modalStyle.css'

const Modal = observer(({active,setActive,children})=>{ 
  const modalRef = useRef(); 
  useOnClickOutside(modalRef, () => setActive(false));
  return (
    <div className={active ? "custom_modal active":"custom_modal" }>
        <div ref={modalRef} className={active ? "custom_modal_content active":"custom_modal_content" }>{children}</div>
    </div>
  )
})

export default Modal