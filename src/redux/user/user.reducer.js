import ActionsType from './../utils/actions.type';
const INITIAL_STATE = {
  currentUser: null,
  userDetail: null,
  token: null,
  userType: null,
  onboarding: null,
  becomeProviderFlag: null,
  userMode: true,
  badgeEnabled: false,
  filterData: {
    sort: '',
    recommended: false,
    gender: '',
    abilityLevel: '',
    goodfor: '',
    suitable: '',
    facilites: '',
    amenities: '',
    sport: '',
    type: '',
    price: {
      start: '',
      end: '',
    },
    age: {
      from: '',
      to: '',
    },
    duration: {
      start: '',
      end: '',
    },
  },
  filterParams: [],
  error: {},
  response: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionsType.SET_FILTER_PARAMS:
      return {
        ...state,
        filterParams: action.payload,
      };

    case ActionsType.SET_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
      };

    case ActionsType.SET_USER_MODE:
      return {
        ...state,
        userMode: action.payload,
      };

    case ActionsType.SET_ONBAORDING_FLAG:
      return {
        ...state,
        onboarding: action.payload,
      };
    case ActionsType.SET_BECOME_PROVIDER:
      return {
        ...state,
        becomeProviderFlag: action.payload,
      };
    case ActionsType.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case ActionsType.SET_USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
      };
    case ActionsType.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case ActionsType.SET_USER_TYPE:
      return {
        ...state,
        userType: action.payload,
      };

    case ActionsType.SET_BADGE_ENABLED:
      return {
        ...state,
        badgeEnabled: action.payload,
      };

    case ActionsType.API_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ActionsType.API_SUCCESS:
      return {
        ...state,
        response: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
