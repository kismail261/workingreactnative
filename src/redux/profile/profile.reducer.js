import ActionsType from "../utils/actions.type"
const INITIAL_STATE = {
  profileStatus: null,
  reviewsList: [],
  notificationList: [],
  childList: [],
  locationList: [],
}

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionsType.SET_PROFILE_STATUS:
      return {
        ...state,
        profileStatus: action.payload
      }
    case ActionsType.SET_REVIEWS:
      return {
        ...state,
        reviewsList: action.payload
      }
    case ActionsType.SET_NOTIFICATION_LIST:
      return {
        ...state,
        notificationList: action.payload
      }
    case ActionsType.SET_CHILD_LIST:
      return {
        ...state,
        childList: action.payload
      }
    case ActionsType.LOCATION_LIST:
      return {
        ...state,
        locationList: action.payload
      }

    default:
      return state
  }
}

export default profileReducer
