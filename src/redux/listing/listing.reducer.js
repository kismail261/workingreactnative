import ActionsType from "../utils/actions.type"
const INITIAL_STATE = {
  listingArray: [],
  specificUserList: [],
  allListings: [],
  allListings: [],
  scheduleList: [],
  policyList: null,
  listingDetail: null,
  searchText: '',

}

const listingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionsType.SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload
      }
    case ActionsType.SET_LISTING_ARRAY:
      return {
        ...state,
        listingArray: action.payload
      }
    case ActionsType.SET_POLICY_LIST:
      return {
        ...state,
        policyList: action.payload
      }
    case ActionsType.SET_SPECIFIC_USER_LIST:
      return {
        ...state,
        specificUserList: action.payload
      }
    case ActionsType.SET_ALL_LISTING:
      return {
        ...state,
        allListings: action.payload
      }
    case ActionsType.SET_SCHEDULE_LIST:
      return {
        ...state,
        scheduleList: action.payload
      }
    case ActionsType.SET_LISTING_DETAIL:
      return {
        ...state,
        listingDetail: action.payload
      }

    default:
      return state
  }
}

export default listingReducer
