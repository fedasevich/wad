import { ACTIONS } from "../utils/consts";

export default function DigitButton({dispatch,digit}) {
return <div className="item" onClick={() => dispatch({type:ACTIONS.ADD_DIGIT, payload:{digit}})}>{digit}</div>
}