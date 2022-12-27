import { observer } from 'mobx-react-lite'
import React from 'react'
import { CancelIcon, CheckMarkIcon } from '../ui/Icons/ControlIcons/ControlIcons'



 const Header = ({children}) => {
    return (
    <>

    <div className='menu-header'>{children}</div> 
    </>
    )
}

const Actions = ({children,close,commit}) => {
  return (
    <>
     <div className='menu-control-header bg-secondary-blue component-border-radius d-flex flex-row justify-content-between'>
    <div className="" onClick={()=>{ close()}}>
    {close && <CancelIcon />}
    </div>
    <div className="">
    {children} 
    </div>
  
    <div className="" onClick={()=>{commit()}} >
    {commit && <CheckMarkIcon />}
    </div>
    </div>
    </>
  )
}

const Container = ({children,className}) => {
    return (
    <>

    <div className={'menu-container '+className}>{children}</div> 
    </>
    )
}

 const MenuProvider = observer(({children}) => {
  return (
    <div className='menu'>

    {children}
  </div>
  )
})

MenuProvider.Header = Header
MenuProvider.Container = Container
MenuProvider.Actions = Actions
export default MenuProvider