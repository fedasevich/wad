export const ACTIONS = {
    ADD_DIFIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    DELETE_DIGIT:'delete-digit',
    EVALUATE: 'evaluate',
    CLEAR:'clear'
}

export const DIVIDE_SYMBOL = "÷"
export const BACK_SYMBOL = "⌫"
export const MULTIPLY_SYMBOL = "✕"
export const SUBMIT_SYMBOL = "✅"
export const EVALUATE_SYMBOL = "="

export const INTEGER_FORMATTER = new Intl.NumberFormat("ru", {
    maximumFractionDigits:0,
  })

