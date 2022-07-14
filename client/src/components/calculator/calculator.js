import React, { useState, useRef } from 'react'
import { useOnClickOutside } from './Hooks/useOnClickOutisde';
import "./CalculatorStyle.css"


const Calculator = () => {
    const [isOpen, setIsOpen] = useState(true);

   
    const calculatorRef = useRef(); 

      let sum = "0";

    useOnClickOutside(calculatorRef, () => setIsOpen(false));
  return (
    <>
    <div ref={calculatorRef} className="wrapper" style={{ display: isOpen ? "block":"none"}} >
   
    <div className="calculator">
    <div className="item wallet">wallet</div>
    <div className="item category">cat</div>
    <div className="item sum">
      <h6>Sum</h6>
      <p>{sum} USD</p>
      <input type="text" placeholder="Description" />
      </div>
    <div className="item command">:</div>
    <div className="item">7</div>
    <div className="item">8</div>
    <div className="item">9</div>
    <div className="item back">b</div>
    <div className="item command">x</div>
    <div className="item">4</div>
    <div className="item">5</div>
    <div className="item">6</div>
    <div className="item command">-</div>
    <div className="item" >1</div>
    <div className="item">2</div>
    <div className="item">3</div>
    <div className="item submit">s</div>
    <div className="item command">+</div>
    <div className="item zero">0</div>
    <div className="item">,</div>
    

    </div>

    </div>
    <h2 onClick={()=> setIsOpen(!isOpen)}>click</h2>
    </>
    )
}

export default Calculator