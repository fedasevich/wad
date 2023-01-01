import React, { useContext, useState } from 'react'
import { Col } from 'react-bootstrap'
import { Context } from '../..'
import { DispatchContext } from '../../pages/MainPage'
import Currencies from '../Currencies'
import MenuProvider from '../MenuProvider'

const CreateWallet = () => {

    const [newWallet, setNewWallet] = useState({
        name: "",
        currency: "",
        balance: "",
    })
    const { wallet } = useContext(Context)
    const dispatch = useContext(DispatchContext)




    const handleClose = () => {
        dispatch({ operation: "DEFAULT_WALLET", id: -1 })
    }



    const handleCommit = () => {
        
          wallet.createWallet(newWallet.currency,newWallet.name)
          setNewWallet({ 
            name: "",
            currency: "",
            })
        handleClose()
    }

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            handleCommit()
        }
        if (event.key === 'Escape') {
            handleClose()
        }
    };

    function handleChange(event) {
        setNewWallet({
            ...newWallet,
            [event.target.name]: event.target.value
        });

    }

    return (
        <>
            <Col xl={{ span: 4, offset: 1 }}> 
            <MenuProvider>
                <MenuProvider.Actions close={handleClose} commit={handleCommit}><h4>Create wallet</h4></MenuProvider.Actions>
                <MenuProvider.Container className="d-flex flex-column">
                    <label className='mb-2' htmlFor="name">Enter name:</label>
                    <input className='mb-2 component-half-border-radius' type="text" name='name' onKeyDown={handleKeyDown} value={newWallet.name} onChange={handleChange} />
                    <h4 className='mb-2' >Chosen currency: {newWallet.currency}</h4>
                </MenuProvider.Container>
            </MenuProvider> 
            </Col>

            <Col xl={{ span: 6, offset: 1 }}>
                <MenuProvider>
                    <MenuProvider.Header><h2>Choose currency:</h2></MenuProvider.Header>
                    <MenuProvider.Container className="d-flex flex-column">
                        <Currencies setCurrency={handleChange}/>
                    </MenuProvider.Container>
                </MenuProvider>
            </Col>


        </>

    )
}

export default CreateWallet