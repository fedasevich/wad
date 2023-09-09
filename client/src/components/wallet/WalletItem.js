import { observer } from 'mobx-react-lite';
import React from 'react';

export const WalletItem = observer(({ wallet: { name, balance, currency } }) => {
  return (
    <>
      <h5 className="m-0 fw-medium">{name}</h5>
      <h6 className="m-0 fw-medium">
        {balance} {currency}
      </h6>
    </>
  );
});
