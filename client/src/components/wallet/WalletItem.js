import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../store';

export const WalletItem = observer(({ wallet: { name, balance } }) => {
  const { currency } = useStore();
  return (
    <>
      <h5 className="m-0 fw-medium">{name}</h5>
      <h6 className="m-0 fw-medium">
        {balance.toFixed(2)} {currency.userCurrency.symbol}
      </h6>
    </>
  );
});
