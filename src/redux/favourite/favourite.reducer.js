import ActionsType from "../utils/actions.type"
const INITIAL_STATE = {
  favouriteList: [],
  favouriteProviderList: [],
}

const favouriteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionsType.SET_FAVOURITES_LIST:
      return {
        ...state,
        favouriteList: action.payload
      }
    case ActionsType.SET_FAVOURITES_PROVIDER:
      return {
        ...state,
        favouriteProviderList: action.payload
      }
    default:
      return state
  }
}

export default favouriteReducer
