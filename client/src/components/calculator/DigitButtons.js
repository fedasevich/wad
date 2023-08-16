import { ACTIONS } from './utils/constants';

export default function DigitButton({ dispatch, digit }) {
  if (digit === '0') {
    return (
      <button
        type="button"
        className="item zero"
        onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
      >
        {digit}
      </button>
    );
  }
  return (
    <button type="button" className="item" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>
      {digit}
    </button>
  );
}
