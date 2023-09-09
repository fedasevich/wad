import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { mainCurrencies } from '../utils/constants';

const Currencies = observer(({ setCurrency, walletDefaultCurrency }) => {
  const [activeCurrency, setActiveCurrency] = useState(walletDefaultCurrency);

  const handleChange = (event) => {
    event.target.name = 'currency';
    setCurrency(event);
    setActiveCurrency(event.target.value);
  };

  return (
    <div>
      <div>
        <h6 className="mb-2">{mainCurrencies.name}</h6>
        {mainCurrencies.data.map((currency) => (
          <div className="d-flex flex-row mb-2" key={currency.symbol}>
            <Form.Check
              type="radio"
              id={currency.symbol}
              name={currency.symbol}
              value={currency.symbol}
              checked={currency.symbol === activeCurrency}
              onChange={handleChange}
            />
            <Form.Label className="ms-2" htmlFor={currency.symbol}>
              {currency.currency}
            </Form.Label>
            <p className="mb-0 ms-auto">{currency.symbol}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Currencies;
