import React, { useContext, useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Accordion, Button, ButtonGroup, ButtonToolbar, Col, Container, Row, useAccordionButton } from 'react-bootstrap';
import { Context } from '../../index';
import { changeTransaction, deleteTransaction, fetchTransaction } from '../../http/transactionApi';
import Modal from '../modal/modal';
import { runInAction } from 'mobx';
import { Icons } from '../../ui/Icons/CategoryIcons/CategoryIcons';
import ChangeTransactionModal from './ChangeTransactionModal';
import TransactionProvider from './TransactionProvider';
import { format, formatISO, parseISO } from 'date-fns';





// const Transactions = observer(() => {
//   const {category,wallet} = useContext(Context) 
//   const [buttonVisible,setButtonVisible] = useState(true)
//   const [changeTransactionModal,setChangeTransactionModal] = useState(false)

//   const [newSum,setNewSum] = useState('')
//   const [newDescription,setNewDescription] = useState('')
//   useEffect(()=>{
//     try {
//       fetchTransaction(category.transactionsPage,category.transactionsLimit,category.transactionsSort).
//       then(data=> {category.setTransactions(data.rows)    

//     })
//     } catch(e) {
//       alert(e.response.data.message);
//     }


//   },[category.transactionsLimit,category.transactionsSort,category])



// const data = category.transactions

//   const transactions = data.reduce((transactions, transactionItem) => {

//     const date = transactionItem.createdAt.split('T')[0];
//     if (!transactions[date]) {
//       transactions[date] = [];
//     }
//     transactions[date].push(transactionItem);
//     return transactions;
//   }, {})

//   const transactionArrays = Object.keys(transactions).map((date) => {

//     return {
//       date,
//       trs: transactions[date]
//     };
//   })



//   const getIconIdFromCategoryById =(id)=> {

//     let findCategory = category.categories.find((category)=> category.id === id)
//     return findCategory?.iconId
//   }

//   return (
//    <>
//    <Container> 
//     <h2>Transactions:</h2>

// <Button onClick={()=> {
// category.setTransactionsSort(category.transactionsSort==="DESC" ? "ASC" : "DESC" )

// category.setTransactionsPage(1)
// setButtonVisible(true)

// }}>sort</Button>
// <ButtonToolbar className="justify-content-end"aria-label="Toolbar with button groups">
//       <ButtonGroup className="me-2" aria-label="First group">
//       <Button onClick={()=>{
//       category.setTransactionsLimit(5);
//       category.setTransactionsPage(1)
//       setButtonVisible(true)
//     }}>5</Button>
//     <Button onClick={()=>{
//       category.setTransactionsLimit(10);
//       category.setTransactionsPage(1)
//       setButtonVisible(true)
//     }}>10</Button>
//     <Button onClick={()=>{
//       category.setTransactionsLimit(20);
//       category.setTransactionsPage(1)
//       setButtonVisible(true)
//     }}>20</Button>
//     <Button onClick={()=>{
//       category.setTransactionsLimit(30);
//       category.setTransactionsPage(1)
//       setButtonVisible(true)
//     }}>30</Button>
//       </ButtonGroup>
//     </ButtonToolbar>




// {transactionArrays.map((transactionsMap,index)=>

//   <Row  key={index}>


//      <h2>{transactionsMap.date}</h2> 
//    {transactionsMap.trs.map(transactions=>

// <Col key={transactions.id} md="12" className="d-inline-flex justify-content-between">
//          <Icons iconId={getIconIdFromCategoryById(transactions.categoryId)}></Icons> 
//        <h2>{transactions.description}</h2>

//     <div className="d-flex flex-direction-row">  
//       <h4>{transactions.sum}</h4>
//        <Button className="ml-2 btn-danger" onClick={()=>{
//           category.deleteTransaction(transactions.id,transactions.categoryId,transactions.walletId,wallet)

//       }}> Delete</Button>
//        <Button onClick={()=>{
//         category.setSelectedTransaction(transactions)

//         setChangeTransactionModal(true)
//        }}>Change</Button>
//        </div> 
//       </Col>

//      )}
//      </Row>

//     )}

// { buttonVisible ?    
//     <Button className={"d-flex justify-content-center mb-5"} onClick={()=> {
//       category.setTransactionsPage(category.transactionsPage+1);  

//       try {
//         fetchTransaction(category.transactionsPage,category.transactionsLimit,category.transactionsSort).then(data=> 
//           {
//             if(!data.rows.length) {
//               setButtonVisible(false)
//             };
//         runInAction(()=> {
//           category.transactions.push(...data.rows)
//         }) 




//           })
//       } catch(e) {
//         alert(e.response.data.message);
//       }

//       }}>Load More</Button>:
//       <h2 className="text-center">There is nothing to load...</h2>
//       }
//          </Container>


//           {/* <ChangeTransactionModal changeTransactionModal={changeTransactionModal} setChangeTransactionModal={setChangeTransactionModal} category={category} wallet={wallet}/>
//       */}

//       </>
//   );

// });

function TransactionToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <div

      onClick={decoratedOnClick}
    >
      {children}
    </div>
  );
}

const Transactions = observer(({ actions }) => {
  const { category, wallet } = useContext(Context)
  const [buttonVisible, setButtonVisible] = useState(true)
  const [changeTransactionModal, setChangeTransactionModal] = useState(false)
  const [newSum, setNewSum] = useState('')
  const [newDescription, setNewDescription] = useState('')
  useEffect(() => {
    try {
      fetchTransaction(category.transactionsPage, category.transactionsLimit, category.transactionsSort).
        then(data => {
          category.setTransactions(data.rows)

        })
    } catch (e) {
      alert(e.response.data.message);
    }


  }, [category.transactionsLimit, category.transactionsSort, category])



  const data = category.transactions

  console.log(data)
  const transactions = data.reduce((transactions, transactionItem) => {
    const date = format(parseISO(transactionItem.createdAt), "d MMMM y");
    if (!transactions[date]) {
      transactions[date] = [];
    }
    transactions[date].push(transactionItem);
    return transactions;
  }, {})

  const transactionArrays = Object.keys(transactions).map((date) => {

    return {
      date,
      trs: transactions[date]
    };
  })





  const loadMoreTransactions = () => {
    category.setTransactionsPage(category.transactionsPage + 1);

    try {
      fetchTransaction(category.transactionsPage, category.transactionsLimit, category.transactionsSort).then(data => {
        if (!data.rows.length) {
          setButtonVisible(false)
        };
        runInAction(() => {
          category.transactions.push(...data.rows)
        })




      })
    } catch (e) {
      alert(e.response.data.message);
    }
  }







  return (
    <>

      <TransactionProvider>
        {actions && <TransactionProvider.Actions setButtonVisible={setButtonVisible} category={category} />}

        {transactionArrays.map((transactionsMap, index) => {
          return (


            <Row key={transactionsMap.date}>
              <TransactionProvider.Transaction.Date key={index} date={transactionsMap.date} />
              <Accordion>
                {transactionsMap.trs.map((transactions, index) => {

                  return (
                    <TransactionToggle eventKey={index} key={transactions.id}>
                      <TransactionProvider.Transaction transaction={transactions} wallet={wallet} category={category} index={index} setChangeTransactionModal={setChangeTransactionModal} />
                    </TransactionToggle>

                  )
                }

                )}
              </Accordion>

            </Row>

          )

        }

        )}

        <Row>
          <TransactionProvider.LoadMore buttonVisible={buttonVisible}
            setButtonVisible={setButtonVisible}
            fetchTransaction={loadMoreTransactions}
          />
        </Row>

        <ChangeTransactionModal changeTransactionModal={changeTransactionModal.active} id={changeTransactionModal.id} setChangeTransactionModal={setChangeTransactionModal} />
      </TransactionProvider>
    </>

  );

});

export default Transactions