import React from 'react'
import MenuProvider from '../MenuProvider'



const EditWallet = ({id}) => {
  return (
    <>
    <MenuProvider>
      <MenuProvider.Header><h2>test{id}</h2></MenuProvider.Header>
      <MenuProvider.Container> <h2>test</h2></MenuProvider.Container>
    </MenuProvider>
    </>
    
  )
}

export default EditWallet