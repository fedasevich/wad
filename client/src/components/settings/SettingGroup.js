import { observer } from 'mobx-react-lite';

export const SettingGroup = observer(({ name, children }) => {
  return (
    <div className="mb-3">
      <h3 className="mb-2 fw-medium">{name}</h3>
      {children}
    </div>
  );
});
