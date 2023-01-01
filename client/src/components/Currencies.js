import { observer } from 'mobx-react-lite'
import React from 'react'
import { mainCurrencies,cryptoCurrencies } from '../utils/consts'


const Currencies = observer(({setCurrency}) => {
 


const handleChange= (event)=> {
  setCurrency(event)
}

  return (
    <>

  <div> 
  <h6>{mainCurrencies.name}</h6>
 {mainCurrencies.data.map(currency=>{
  
    return (
    <div className='d-flex flex-row mb-2' key={currency.symbol}> 

<input type="radio" id={currency.currency} name="currency" value={currency.symbol} 


onChange={(e)=>{ handleChange(e)}} />
<label className='ms-2 ' htmlFor={currency.currency}> {currency.currency}  </label>
<p className='mb-0 ms-auto'>{currency.symbol}</p>

    </div>  
    )
   
    })
 }
</div> 

<div> 
  <h6>{cryptoCurrencies.name}</h6>
 {cryptoCurrencies.data.map(currency=>{
  
    return (
        <div className='d-flex flex-row mb-2'  key={currency.symbol}>  

<input type="radio" id={currency.currency} name="currency" value={currency.symbol} onChange={(e)=>{ handleChange(e)}}/>
<label className='ms-2 ' htmlFor={currency.currency}> {currency.currency}  </label>
<p className='mb-0 ms-auto'>{currency.symbol}</p>

    </div>  
    )
   
    })
 }
</div> 

</> 
  )
})

export default Currencies