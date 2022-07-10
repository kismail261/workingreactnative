import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import userReducer from './user/user.reducer';
import loaderReducer from './loader/loader.reducer';
import profileReducer from './profile/profile.reducer';
import listingReducer from './listing/listing.reducer';
import taxReducer from './tax/tax.reducer';
import favouriteReducer from './favourite/favourite.reducer';
import bookingReducer from './booking/booking.reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: userReducer,
  loader: loaderReducer,
  profile: profileReducer,
  listing: listingReducer,
  tax: taxReducer,
  favourite: favouriteReducer,
  booking: bookingReducer,
});

export default persistReducer(persistConfig, rootReducer);
