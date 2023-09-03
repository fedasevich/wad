import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';
import { useStore } from '../../../store';

export const CloseCalculatorOnSubmit = observer(() => {
  const { userSettings } = useStore();

  const handleCheckBoxClick = () => {
    userSettings.setCloseCalculatorOnSubmit(!userSettings.closeCalculatorOnSubmit);
  };

  return (
    <Form.Check
      type="checkbox"
      label="Close calculator on submit"
      name="closeCalculatorOnSubmit"
      id="closeCalculatorOnSubmit"
      onChange={handleCheckBoxClick}
      checked={userSettings.closeCalculatorOnSubmit}
    />
  );
});
