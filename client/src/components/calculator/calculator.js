import React, { useState, useRef, useReducer } from 'react'
import { useOnClickOutside } from './Hooks/useOnClickOutisde';
import "./CalculatorStyle.css"
import { ACTIONS, DIVIDE_SYMBOL, MULTIPLY_SYMBOL, SUBMIT_SYMBOL } from '../utils/consts';
import DigitButton from './DigitButtons';
import OperationButton from './OperationDigit';



function reducer(state, {type, payload}) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if(payload.digit === "0" && state.currentOperand === "0") return state
      if(payload.digit === "," && state.currentOperand?.includes(",")) return state
      return {
        ...state,
        currentOperand:`${state.currentOperand || ""}${payload.digit}`
      }
      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOperand == null && state.previousiousOperand === null) {
          return state
        }
        if (state.previousiousOperand == null) {
          return {
            ...state,
            operation: payload.operation,
            previousiousOperand: state.currentOperand,
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
          previousiousOperand: evaluate(state),
          operation: payload.operation,
          currentOperand: null
        }
       
      }
  }
  
  function evaluate({currentOperand, previousiousOperand, operation}) {
    const previous = parseFloat(previousiousOperand)
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
 
  

const Calculator = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [{currentOperand, previousiousOperand, operation}, dispatch] = useReducer(reducer, {})
   
    const calculatorRef = useRef(); 

   

  

    useOnClickOutside(calculatorRef, () => setIsOpen(false));
  return (
    <>
    <div ref={calculatorRef} className="wrapper" style={{ display: isOpen ? "block":"none"}} >
   
    <div className="calculator">
    <div className="item wallet">wallet</div>
    <div className="item category">cat</div>
    <div className="item sum">
      <h6>Sum</h6>
      <p>{previousiousOperand} {operation} {currentOperand}</p>
      <input type="text" placeholder="Description" />
      </div>
    <OperationButton operation={DIVIDE_SYMBOL} dispatch={dispatch}/>
    <DigitButton digit="7" dispatch={dispatch}/>
    <DigitButton digit="8" dispatch={dispatch}/>
    <DigitButton digit="9" dispatch={dispatch}/>
    <div className="item back">⌫</div>
    <OperationButton operation={MULTIPLY_SYMBOL} dispatch={dispatch}/>
    <DigitButton digit="4" dispatch={dispatch}/>
    <DigitButton digit="5" dispatch={dispatch}/>
    <DigitButton digit="6" dispatch={dispatch}/>
    <OperationButton operation="-" dispatch={dispatch}/>
    <DigitButton digit="1" dispatch={dispatch}/>
    <DigitButton digit="2" dispatch={dispatch}/>
    <DigitButton digit="3" dispatch={dispatch}/>
    <div className="item submit">{SUBMIT_SYMBOL}</div>
    <OperationButton operation="+" dispatch={dispatch}/>
    <DigitButton className="zero" digit="0" dispatch={dispatch}/>
    <DigitButton digit="," dispatch={dispatch}/>
    

    </div>

    </div>
    <h2 onClick={()=> setIsOpen(!isOpen)}>click</h2>
    </>
    )
}

export default Calculator