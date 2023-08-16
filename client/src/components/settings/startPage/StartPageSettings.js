import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';
import { authRoutes } from '../../../routes';
import { useStore } from '../../../store';

export const StartPageSettings = observer(() => {
  const { userSettings } = useStore();

  const handleSelectChange = (event) => userSettings.setStartPage(event.target.value);

  return (
    <Form.Select onChange={handleSelectChange} defaultValue={userSettings._startPage}>
      {authRoutes.map((route) => (
        <option key={route.path} value={route.path}>
          {route.path}
        </option>
      ))}
    </Form.Select>
  );
});
