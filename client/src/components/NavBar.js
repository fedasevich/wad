import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { CATEGORY_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, WALLET_ROUTE } from '../utils/consts'
import { ChartBarIcon, ChartPieIcon, ClipboardTextIcon, CreditCardIcon, GearSixIcon, LogoIcon, SignOutIcon } from '../ui/Icons/NavbarIcons/NavIcons'
import '../style.css'
import { Context } from '../index';

const NavBar = observer(() => {
  const { user } = useContext(Context)
  return (

    <>
      <div className='d-flex justify-content-between flex-column desktop-height-100vh   px-2 bg-main-blue px-lg-0 ps-md-4 ps-lg-4 fw-medium fs-6' >


        <div>

          <LogoIcon />



          <Nav variant="pills" className="flex-row flex-md-column mt-lg-5 text-center mt-md-0 text-md-start justify-content-between">
            <Nav.Item>

              <NavLink to={MAIN_ROUTE}><CreditCardIcon /><span className='d-none d-md-inline'>Accounts</span></NavLink>
            </Nav.Item>
            <Nav.Item>

              <NavLink to={CATEGORY_ROUTE}><ChartPieIcon /><span className='d-none d-md-inline'>Categories</span></NavLink>
            </Nav.Item>
            <Nav.Item>

              <NavLink to={WALLET_ROUTE}><ClipboardTextIcon /><span className='d-none d-md-inline'>Transactions</span></NavLink>
            </Nav.Item>
            <Nav.Item>

              <NavLink to={WALLET_ROUTE}> <ChartBarIcon /><span className='d-none d-md-inline'>Analytics</span></NavLink>
            </Nav.Item>
            <Nav.Item>

              <NavLink to={WALLET_ROUTE}>  <GearSixIcon /><span className='d-none d-md-inline'>Settings</span></NavLink>
            </Nav.Item>

          </Nav>
        </div>
        <Nav.Item>

          <NavLink onClick={() => { user.logOut() }} to={LOGIN_ROUTE} end> <SignOutIcon /><span className='d-none d-md-inline'>Sign out</span></NavLink>
        </Nav.Item>
      </div>
    </>

  )
})

export default NavBar