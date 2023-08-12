import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';
import { useStore } from '../../../store';
import { themes } from '../../../utils/constants';

export const Theme = observer(() => {
    const { userSettings } = useStore()

    const handleSelectChange = (event) => userSettings.setTheme(event.target.value)

    return (
        <Form.Select onChange={handleSelectChange} defaultValue={userSettings._theme}>
            {Object.values(themes).map(theme => <option key={theme} value={theme} >{theme}</option>)}
        </Form.Select>
    );
})