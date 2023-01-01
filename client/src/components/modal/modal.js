import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useOnClickOutside } from '../calculator/Hooks/useOnClickOutside';
import MenuProvider from '../MenuProvider';
import './modalStyle.css'

const Modal = observer(({active,setActive,children,header})=>{ 
  const modalRef = useRef(); 
  useOnClickOutside(modalRef, () => setActive(false));
  return (
    <div className={active ? "custom_modal active":"custom_modal" }>
        <div ref={modalRef} className={active ? "custom_modal_content active ":"custom_modal_content" }>

        <MenuProvider>
    <MenuProvider.Header>
      <h2>{header}</h2> 

      </MenuProvider.Header>
      <MenuProvider.Container>
      {children}
      </MenuProvider.Container>
     

  </MenuProvider> 

          </div>
    </div>
  )
})

export default Modal