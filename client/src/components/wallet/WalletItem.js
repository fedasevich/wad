import { observer } from 'mobx-react-lite';
import React from 'react';

export const WalletItem = observer(({ wallet: { name, balance, currency } }) => {
  return (
    <>
      <h4 className="m-0">{name}</h4>
      <h6 className="m-0">
        {balance} {currency}
      </h6>
    </>
  );
});
