import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { DispatchContext } from '../../pages/MainPage';
import { useStore } from '../../store';
import WalletStore from '../../store/WalletStore';
import { WALLET_PAGE_STATE } from '../../utils/constants';
import MenuProvider from '../MenuProvider';
import { WalletCarousel } from './WalletCarousel';

const WalletTransfer = observer(({ id }) => {
  const { wallet } = useStore();
  const dispatch = useContext(DispatchContext);

  const [fromSelectedWallet, setFromSelectedWallet] = useState(null);
  const [toSelectedWallet, setToSelectedWallet] = useState(null);
  const [transferAmount, setTransferAmount] = useState('');
  useEffect(() => {
    setFromSelectedWallet(wallet.getWalletById(id));
  }, [id]);

  useEffect(() => {
    setToSelectedWallet(wallet.wallets[0]);
  }, []);

  const handleTransferAmountChange = (e) => {
    setTransferAmount(e.target.valueAsNumber);
  };

  const handleSubmit = () => {
    WalletStore.transferWallet(fromSelectedWallet, toSelectedWallet, transferAmount);
  };

  const handleClose = () => {
    dispatch({ operation: WALLET_PAGE_STATE.DEFAULT_WALLET, id: -1 });
  };
  return (
    <MenuProvider>
      <MenuProvider.Actions onClose={handleClose}>
        <h5>Transfer</h5>
      </MenuProvider.Actions>
      <MenuProvider.Container>
        <div className="mb-3">
          <p>From:</p>
          <WalletCarousel selectedWallet={fromSelectedWallet} setSelectedWallet={setFromSelectedWallet} />
        </div>
        <div className="mb-3">
          <p>To:</p>
          <WalletCarousel selectedWallet={toSelectedWallet} setSelectedWallet={setToSelectedWallet} />
        </div>
        <div className="mb-3">
          <Form.Label htmlFor="transferAmount">Amount:</Form.Label>
          <Form.Control
            className="mb-3 component-half-border-radius"
            type="number"
            inputMode="decimal"
            pattern="[0-9]*"
            name="transferAmount"
            id="transferAmount"
            value={transferAmount}
            onChange={handleTransferAmountChange}
          />
        </div>

        <button
          type="button"
          className="w-100 p-4 mb-2 component-shadow bg-light-blue text-center component-border-radius"
          onClick={handleSubmit}
        >
          Transfer
        </button>
      </MenuProvider.Container>
    </MenuProvider>
  );
});

export default WalletTransfer;
