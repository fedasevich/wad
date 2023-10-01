import { observer } from 'mobx-react-lite';
import { Suspense, lazy, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useStore } from '../../../store';

const UserCurrencyConvertModal = lazy(() => import('./UserCurrencyConvertModal'));

export const UserCurrencySettings = observer(() => {
  const { currency } = useStore();

  const [userCurrencyConvertModal, setUserCurrencyConvertModal] = useState({
    show: false,
    currencyToChange: currency.userCurrency.id
  });

  const handleSelectChange = (event) =>
    setUserCurrencyConvertModal({ show: true, currencyToChange: Number(event.target.value) });

  return (
    <>
      <Form.Select onChange={handleSelectChange} value={userCurrencyConvertModal.currencyToChange}>
        {currency.exchangeRates.map((rate) => (
          <option key={rate.id} value={rate.id}>
            {rate.currency} - {rate.symbol}
          </option>
        ))}
      </Form.Select>
      <Suspense>
        {userCurrencyConvertModal.show && (
          <UserCurrencyConvertModal
            userCurrencyConvertModal={userCurrencyConvertModal.show}
            setUserCurrencyConvertModal={setUserCurrencyConvertModal}
            currencyToChange={userCurrencyConvertModal.currencyToChange}
          />
        )}
      </Suspense>
    </>
  );
});
