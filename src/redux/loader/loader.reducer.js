import ActionsType from "../utils/actions.type"
const INITIAL_STATE = {
  loader: false,
  chooseType: '',

}

const loaderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionsType.SET_LOADER:
      return {
        ...state,
        loader: action.payload
      }
    case ActionsType.SET_CHOOSED_TYPE:
      return {
        ...state,
        chooseType: action.payload
      }
    default:
      return state
  }
}

export default loaderReducer
