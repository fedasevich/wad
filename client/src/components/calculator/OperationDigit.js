import { ACTIONS } from "../utils/consts";

export default function OperationButton({dispatch,operation}) {
return <div className="item" onClick={() => dispatch({type:ACTIONS.CHOOSE_OPERATION, payload:{operation}})}>{operation}</div>
}