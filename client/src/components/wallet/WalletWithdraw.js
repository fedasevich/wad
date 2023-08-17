import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { Suspense, lazy } from 'react';
import { useStore } from '../../store';
import MenuProvider from '../MenuProvider';
import Loader from '../loader/Loader';

const Calculator = lazy(() => import('../calculator/calculator'));

const WalletWithdraw = observer(({ id }) => {
  const { wallet } = useStore();

  return (
    <MenuProvider>
      <MenuProvider.Header.Straight>
        <h5>Withdraw</h5>
        <h6> {wallet.getWalletById(id).name}</h6>
      </MenuProvider.Header.Straight>
      <Suspense fallback={<Loader />}>
        <Calculator walletId={id} />
      </Suspense>
      <h6 className="text-center py-2 fw-light"> {format(new Date(), 'd MMMM y')}</h6>
    </MenuProvider>
  );
});

export default WalletWithdraw;
