import { observer } from 'mobx-react-lite';

export const SettingGroup = observer(({ name, children }) => {
  return (
    <div className="mb-3">
      <h4 className="mb-2">{name}</h4>
      {children}
    </div>
  );
});
