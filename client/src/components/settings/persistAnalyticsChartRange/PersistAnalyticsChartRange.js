import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';
import { useStore } from '../../../store';

export const PersistAnalyticsChartRange = observer(() => {
  const { userSettings } = useStore();

  const handleCheckBoxClick = () => {
    userSettings.setPersistAnalyticsChartRange(!userSettings.persistAnalyticsChartRange);
  };

  return (
    <Form.Check
      type="checkbox"
      label="Persist analytics chart range"
      onChange={handleCheckBoxClick}
      checked={userSettings.persistAnalyticsChartRange}
    />
  );
});
