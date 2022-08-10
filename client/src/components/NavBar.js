import { observer } from 'mobx-react-lite'
import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { CATEGORY_ROUTE, MAIN_ROUTE, WALLET_ROUTE } from '../utils/consts'

const NavBar = observer(() => {
  return (
  
    <Nav variant="pills" >
    <Nav.Item>
    <NavLink to={MAIN_ROUTE}>Main</NavLink>
   
    </Nav.Item>
    <Nav.Item>
    <NavLink to={CATEGORY_ROUTE}>Categories</NavLink>
    </Nav.Item>
    <Nav.Item>
    <NavLink to={WALLET_ROUTE}>Wallets</NavLink>
    </Nav.Item>
  </Nav>
  
  )
})

export default NavBar