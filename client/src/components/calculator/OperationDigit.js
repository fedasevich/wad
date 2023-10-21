import { ACTIONS } from './libs/constants/constants';

export default function OperationButton({ dispatch, operation }) {
  const handleClick = () => {
    dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
  };

  return (
    <button type="button" className="item" onClick={handleClick}>
      {operation}
    </button>
  );
}
