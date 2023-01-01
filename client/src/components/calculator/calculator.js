import React, { useState, useRef, useReducer, useContext, useEffect } from 'react'
import { useOnClickOutside } from './Hooks/useOnClickOutside';
import "./CalculatorStyle.css"
import { ACTIONS, BACK_SYMBOL, DIVIDE_SYMBOL, EVALUATE_SYMBOL, INTEGER_FORMATTER, MULTIPLY_SYMBOL, SUBMIT_SYMBOL } from './utils/consts';
import DigitButton from './DigitButtons';
import OperationButton from './OperationDigit';
import { Context } from '../..';
import Modal from '../modal/modal';
import { createTransaction } from '../../http/transactionApi';
import { observer } from 'mobx-react-lite';
import CalculatorWalletModal from './CalculatorWalletModal';
import CalculatorCategoryModal from './CalculatorCategoryModal';



function reducer(state, {type, payload}) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }
      if(payload.digit === "0" && state.currentOperand === "0") return state
      if(state.currentOperand === "0" && payload.digit !== ".") 
      {
      return {
        ...state,
        currentOperand:`${payload.digit}`
      }
    }
      if(payload.digit === "." && state.currentOperand?.includes(".")) return state
      return {
        ...state,
        currentOperand:`${state.currentOperand || ""}${payload.digit}`
      }
      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOperand == null && state.previousOperand === null || state.currentOperand === '0') {
  
          return state
        }

        if(state.currentOperand == '0') {
         
          return state
        }
        if (state.previousOperand == null ) {
         
          return {
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null
          }
        }
        if (state.currentOperand == null) {
   
          return {
            ...state,
            operation: payload.operation
          }
        }

        return {
          ...state,
          previousOperand: evaluate(state),
          operation: payload.operation,
          currentOperand: null
        }
       case ACTIONS.EVALUATE: 
       if( state.operation ==  null || state.operation == null || state.previousOperand == null) {
        return state
       }
       return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state)
       }
       case ACTIONS.DELETE_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            overwrite:false,
            currentOperand:null
          }
        }
        if (state.currentOperand == null || state.currentOperand == "0") return state
        if ( state.currentOperand.length === 1  ) {
          return {
            ...state,
            currentOperand: '0'
          }
        }
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0,-1)
        }
        case ACTIONS.CLEAR:
          return {}
      }
  }
  



function formatOperand(operand) {
  if ( operand == null ) return
  const [integer, decimal] = operand.split('.')
  if (decimal == null) {
    return INTEGER_FORMATTER.format(integer)
  }
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function evaluate({currentOperand, previousOperand, operation}) {
    const previous = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if( isNaN(previous) || isNaN(current)) {
      return ""
    }
    let computation = ""
    switch (operation) {
      case "+":
        computation = previous + current
        break
      case "-":
        computation = previous - current
        break
      case MULTIPLY_SYMBOL:
        computation = previous * current
        break
        case DIVIDE_SYMBOL:
        computation = previous / current
        break
    }
    return computation.toString()
  } 
 
  

const Calculator = observer(({id}) => {

    const {wallet,category} = useContext(Context)
    const [walletModalActive, setWalletModalActive] = useState(false)
    const [categoryModalActive, setCategoryModalActive] = useState(false)
    const [selectedWallet, setSelectedWallet] = useState(wallet.getWalletById(id))
    const [selectedCategory,  setSelectedCategory] = useState(category.categories[0])
    const [{currentOperand='0', previousOperand, operation}, dispatch] = useReducer(reducer, {})
    const [description, setDescription] = useState("")



    useEffect(() => {
setSelectedWallet(wallet.getWalletById(id))
    }, [id])


  return (
    <>
    <div >
   
    <div className="calculator">
    <div className="item wallet" onClick={()=> setWalletModalActive(true)}>
      <h4> {selectedWallet.name}</h4>
      {'\n'}
     <h5>{selectedWallet.balance} {selectedWallet.currency}</h5>
      </div>
    <div className="item category" onClick={()=> setCategoryModalActive(true)}><h4>{selectedCategory.name}</h4></div>
    <div className="item sum">
      <h6 className='mt-3'>Expense</h6>
      <p className='fs-3'>{formatOperand(previousOperand)} {operation} {formatOperand(currentOperand)} {wallet.getCurrencyFromWalletById(selectedWallet.id)}</p>
      <input type="text" name="description" className='w-100 text-center p-1' placeholder="Description" onChange={e => setDescription(e.target.value)} value={description}/>
      </div>
 
    <DigitButton digit="7" dispatch={dispatch}/>
    <DigitButton digit="8" dispatch={dispatch}/>
    <DigitButton digit="9" dispatch={dispatch}/>
    <OperationButton operation={DIVIDE_SYMBOL} dispatch={dispatch}/>
    <div className="item back" onClick={()=> dispatch({type: ACTIONS.DELETE_DIGIT})}>{BACK_SYMBOL}</div>
  
    <DigitButton digit="4" dispatch={dispatch}/>
    <DigitButton digit="5" dispatch={dispatch}/>
    <DigitButton digit="6" dispatch={dispatch}/>
    <OperationButton operation={MULTIPLY_SYMBOL} dispatch={dispatch}/>
    <DigitButton digit="1" dispatch={dispatch}/>
    <DigitButton digit="2" dispatch={dispatch}/>
    <DigitButton digit="3" dispatch={dispatch}/>
    <OperationButton operation="-" dispatch={dispatch}/>
    {operation ? <div className="item submit" onClick={()=> dispatch({type: ACTIONS.EVALUATE})}>{EVALUATE_SYMBOL}</div>
    :  
    <div className="item submit" onClick={()=> {
if(currentOperand === '0') {
  return alert("sum cant be 0")
}

      // try {
 
      //   createTransaction(selectedCategory.id,selectedWallet.id, description ?  description:selectedCategory.name , parseFloat(currentOperand)).
      //   then(data=> {category.transactions.unshift(data)
      // const findWalletIndex = (e) => e.id === selectedWallet.id
      // const walletIndex = wallet.wallets.findIndex(findWalletIndex)
      // wallet.wallets[walletIndex].balance -= parseFloat(currentOperand)
      // selectedCategory.spent += parseFloat(currentOperand)
      // setDescription('')
      // dispatch({type: ACTIONS.CLEAR})
      // setActive(false)
      //     console.log(data)
      //   })
      // } catch(e) {
      //   alert(e.response.data.message);
      // }

    
    }} >{SUBMIT_SYMBOL}</div>}
    
    
    <DigitButton className="zero" digit="0" dispatch={dispatch}/>
    <DigitButton digit="." dispatch={dispatch}/>
    <OperationButton operation="+" dispatch={dispatch}/>
   
    

    </div>


<CalculatorWalletModal walletModalActive={walletModalActive} setWalletModalActive={setWalletModalActive} setSelectedWallet={setSelectedWallet}/>
<CalculatorCategoryModal categoryModalActive={categoryModalActive} setCategoryModalActive={setCategoryModalActive} setSelectedCategory={setSelectedCategory}/>

    </div>
   
  
    
   
    </>
    )
})

export default Calculator