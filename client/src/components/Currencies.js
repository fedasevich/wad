import { observer } from 'mobx-react-lite'
import React from 'react'
import { mainCurrencies,cryptoCurrencies } from '../utils/consts'


const Currencies = observer(({state}) => {
 
const handleChange= (currency)=> {
    state=currency
}

  return (
    <>

  <div> 
  <h4>{mainCurrencies.name}</h4>
 {mainCurrencies.data.map(currency=>{
  
    return (
    <div className='d-flex flex-row mb-2'> 

<input type="radio" id={currency.currency} name="currency" value={currency.currency} 


onChange={()=>{ handleChange(currency.currency)}} />
<label className='ms-2 ' htmlFor={currency.currency}> {currency.currency}  </label>
<p className='mb-0 ms-auto'>{currency.symbol}</p>

    </div>  
    )
   
    })
 }
</div> 

<div> 
  <h4>{cryptoCurrencies.name}</h4>
 {cryptoCurrencies.data.map(currency=>{
  
    return (
        <div className='d-flex flex-row mb-2' >  

<input type="radio" id={currency.currency} name="currency" value={currency.currency} />
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