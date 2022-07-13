import React, { useState, useRef } from 'react'
import { useOnClickOutside } from './Hooks/useOnClickOutisde';
import "./CalculatorStyle.css"


const Calculator = () => {
    const [isOpen, setIsOpen] = useState(false);

   
    const calculatorRef = useRef(); 

      

    useOnClickOutside(calculatorRef, () => setIsOpen(false));
  return (
    <>
    <div ref={calculatorRef} className="wrapper" style={{ display: isOpen ? "block":"none"}} >
   
    <div className="calculator">
 
    </div>

    </div>
    <h2 onClick={()=> setIsOpen(!isOpen)}>click</h2>
    </>
    )
}

export default Calculator