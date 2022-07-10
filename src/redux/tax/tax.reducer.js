import ActionsType from "../utils/actions.type"
const INITIAL_STATE = {
  taxList: [],
  newTaxAdd: false,
}

const taxReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionsType.SET_TAX_INFO:
      return {
        ...state,
        taxList: action.payload
      }

    case ActionsType.SET_NEW_TAX_ADD:
      return {
        ...state,
        newTaxAdd: action.payload
      }

    default:
      return state
  }
}

export default taxReducer
