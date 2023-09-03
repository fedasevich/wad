import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';
import { useStore } from '../../../store';

export const PersistTransactionFilter = observer(() => {
  const { userSettings } = useStore();

  const handleCheckBoxClick = () => {
    userSettings.setPersistTransactionFilter(!userSettings.persistTransactionFilter);
  };

  return (
    <Form.Check
      type="checkbox"
      label="Persist transaction filter"
      name="persistTransactionFilter"
      id="persistTransactionFilter"
      onChange={handleCheckBoxClick}
      checked={userSettings.persistTransactionFilter}
    />
  );
});
