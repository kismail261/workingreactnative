import ActionsType from "../utils/actions.type"
const INITIAL_STATE = {
  userBookingList: [],
  listBookings: [],
  bookingDetail: null,
  bookingStats: null,
  pymentStats: null,
}


const bookingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionsType.SET_PAYMENT_STATS:
      return {
        ...state,
        pymentStats: action.payload
      }
    case ActionsType.SET_BOOKING_STATS:
      return {
        ...state,
        bookingStats: action.payload
      }
    case ActionsType.SET_USER_BOOKING_LIST:
      return {
        ...state,
        userBookingList: action.payload
      }
    case ActionsType.SET_LIST_BOOKING:
      return {
        ...state,
        listBookings: action.payload
      }
    case ActionsType.SET_BOOKING_DETAIL:
      return {
        ...state,
        bookingDetail: action.payload
      }
    default:
      return state
  }
}

export default bookingReducer
