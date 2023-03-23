import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Accordion, Button, ButtonGroup, ButtonToolbar, Card, Col, Container, Row, useAccordionButton } from 'react-bootstrap'
import { Context } from '../..'
import { Icons } from '../../ui/Icons/CategoryIcons/CategoryIcons'
import { DeleteCircleIcon } from '../../ui/Icons/ControlIcons/ControlIcons'
import { EditIcon } from '../../ui/Icons/WalletIcons/WalletIcons'



const Actions = ({ setButtonVisible, category }) => {

    return (
        <>
            <Row>

                <ButtonToolbar className="justify-content-between mb-3" aria-label="Toolbar with button groups">
                    <Button className='bg-light-blue border-0' onClick={() => {
                        category.setTransactionsSort(category.transactionsSort === "DESC" ? "ASC" : "DESC")

                        category.setTransactionsPage(1)
                        setButtonVisible(true)

                    }}>Sort</Button>
                    <ButtonGroup className="me-2" aria-label="First group">
                        <Button className='bg-light-blue border-0' onClick={() => {
                            category.setTransactionsLimit(5);
                            category.setTransactionsPage(1)
                            setButtonVisible(true)
                        }}>5</Button>
                        <Button className='bg-light-blue border-0' onClick={() => {
                            category.setTransactionsLimit(10);
                            category.setTransactionsPage(1)
                            setButtonVisible(true)
                        }}>10</Button>
                        <Button className='bg-light-blue border-0' onClick={() => {
                            category.setTransactionsLimit(20);
                            category.setTransactionsPage(1)
                            setButtonVisible(true)
                        }}>20</Button>
                        <Button className='bg-light-blue border-0' onClick={() => {
                            category.setTransactionsLimit(30);
                            category.setTransactionsPage(1)
                            setButtonVisible(true)
                        }}>30</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Row>
        </>
    )
}

const LoadMore = ({ buttonVisible, setButtonVisible, fetchTransaction }) => {
    return (
        <>

            {buttonVisible ?
                <Button className={"d-flex justify-content-center mt-4 bg-light-blue border-0"} onClick={() => {
                    try {
                        fetchTransaction().then(data => {
                            if (!data.rows.length) {
                                setButtonVisible(false)
                            };
                        })
                    } catch (e) {
                        alert(e.response.data.message);
                    }
                }
                }>Load More</Button> :
                <h2 className="text-center">There is nothing to load...</h2>
            }
        </>
    )
}


const Transaction = observer(({ transaction, category, wallet, index, setChangeTransactionModal }) => {
    let isDeleted = false;
    if(transaction.categoryId===-1) isDeleted=true;
    if(transaction.walletId===-1) isDeleted=true;
    return (
        <>
            <Col md="12" className="d-inline-flex justify-content-between mt-3">
                <Card className='border-0 w-100' >
                    <Card.Header className={`bg-none d-flex w-100 justify-content-between border-0 ${isDeleted ? 'text-decoration-line-through':''} `}>
                        <div className="d-flex flex-row align-items-center">
                            <Icons iconId={category.getIconIdFromCategoryById(transaction.categoryId)}></Icons>
                            <h4 className='ms-3 mb-0'>{transaction.description}</h4>
                        </div>

                        <h4>-{transaction.sum} {wallet.getCurrencyFromWalletById(transaction.walletId)}</h4>

                    </Card.Header>

                    <Accordion.Collapse eventKey={index}>
                        <Card.Body className='d-flex justify-content-evenly bg-light-blue text-light component-one-third-border-radius-bottom '>
                            <div className='cursor-pointer' onClick={() => { category.deleteTransaction(transaction.id, transaction.categoryId, transaction.walletId, wallet) }}>
                                <DeleteCircleIcon />
                                <span className='ms-2'>Delete</span>
                            </div>

                            {setChangeTransactionModal && <div className='cursor-pointer' onClick={() => { setChangeTransactionModal({ active: true, id: transaction.id }) }}>
                                <EditIcon />
                                <span className='ms-2'>Change</span>
                            </div>
                            }
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Col>

        </>
    )
})

const TransactionDate = ({ date }) => {
    return (
        <>
            <h3>{date}</h3>
        </>
    )
}

const TransactionProvider = observer(({ children }) => {

    return (
        <>

            {children}




        </>
    )
})


TransactionProvider.Transaction = Transaction
TransactionProvider.Transaction.Date = TransactionDate
TransactionProvider.Actions = Actions
TransactionProvider.LoadMore = LoadMore
export default TransactionProvider