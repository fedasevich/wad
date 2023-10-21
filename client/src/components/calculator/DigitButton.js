import { ACTIONS } from './libs/constants/constants';

export default function DigitButton({ dispatch, digit }) {
  const buttonClass = digit === '0' ? 'item zero' : 'item';

  const handleClick = () => {
    dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
  };

  return (
    <button type="button" className={buttonClass} onClick={handleClick}>
      {digit}
    </button>
  );
}
