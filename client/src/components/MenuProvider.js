import { observer } from 'mobx-react-lite'
import React from 'react'

 const Header = ({children}) => {
    return (
    <>

    <div>{children}</div> 
    </>
    )
}

const Container = ({children}) => {
    return (
    <>

    <div>{children}</div> 
    </>
    )
}

 const MenuProvider = observer(({children}) => {
  return (
    <div>

    {children}
  </div>
  )
})

MenuProvider.Header = Header
MenuProvider.Container = Container

export default MenuProvider