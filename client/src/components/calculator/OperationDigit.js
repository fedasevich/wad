import { ACTIONS } from './utils/constants';

export default function OperationButton({ dispatch, operation }) {
  return (
    <button
      type="button"
      className="item"
      onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
    >
      {operation}
    </button>
  );
}
