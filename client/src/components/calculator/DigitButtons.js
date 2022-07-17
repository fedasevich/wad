import { ACTIONS } from "../utils/consts";

export default function DigitButton({dispatch,digit}) {
    if(digit === "0") {
        return <div className="item zero" onClick={() => dispatch({type:ACTIONS.ADD_DIGIT, payload:{digit}})}>{digit}</div>
    }
return <div className="item" onClick={() => dispatch({type:ACTIONS.ADD_DIGIT, payload:{digit}})}>{digit}</div>
}