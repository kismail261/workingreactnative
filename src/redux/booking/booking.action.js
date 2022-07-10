import ActionsType from '../utils/actions.type';
import {Url} from '../../constant/baseURL';
import axios from 'axios';
import {setLoader} from '../loader/loader.action';
import {showMessage} from '../../helpers/replaceDigitsWithAesteriks';

export const setPaymentStats = data => ({
  type: ActionsType.SET_PAYMENT_STATS,
  payload: data,
});
export const setBookingStats = data => ({
  type: ActionsType.SET_BOOKING_STATS,
  payload: data,
});
export const setUserBookingList = data => ({
  type: ActionsType.SET_USER_BOOKING_LIST,
  payload: data,
});
export const setListBookings = data => ({
  type: ActionsType.SET_LIST_BOOKING,
  payload: data,
});

export const setBookingDetail = data => ({
  type: ActionsType.SET_BOOKING_DETAIL,
  payload: data,
});

export const getUsersBookingList = (token, id) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${Url}api/booking?${id}`, {headers: headers})
      .then(resp => {
        let response = resp.data;
        dispatch(setUserBookingList(response.data));
        dispatch(setLoader(false));
      })
      .catch(error => {
        const err = error;
        if (err.response) {
        }
        dispatch(setLoader(false));
      });
  };
};

export const getListBookings = (token, listingId) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${Url}api/booking?listingId=${listingId}`, {headers: headers})
      .then(resp => {
        let response = resp.data;
        dispatch(setListBookings(response.data));
        dispatch(setLoader(false));
      })
      .catch(error => {
        const err = error;
        if (err.response) {
        }
        dispatch(setLoader(false));
      });
  };
};

export const cancelBooking = (token, data, navigation, detail) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/booking/cancel-user`, data, {headers: headers})
      .then(resp => {
        let response = resp.data;
        navigation.navigate('cancelBookingNotifier', {detail: detail});
        dispatch(getUsersBookingList(token, `userId=${data.userId}`));
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          showMessage(err.response.data.message);
        }
        dispatch(setLoader(false));
      });
  };
};

export const cancelBookingProvider = (token, data, listingId) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/booking/cancel-provider`, data, {headers: headers})
      .then(resp => {
        let response = resp.data;
        dispatch(getListBookings(token, listingId));
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          showMessage(err.response.data.message);
        }
        dispatch(setLoader(false));
      });
  };
};

export const getBookingDetail = (token, id) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${Url}api/booking/${id}`, {headers: headers})
      .then(resp => {
        let response = resp.data;
        dispatch(setBookingDetail(response));
        dispatch(setLoader(false));
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          showMessage(err.response.data.message);
        }
        dispatch(setLoader(false));
      });
  };
};

export const getBookingStats = (token, id) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${Url}api/booking/stats/${id}`, {headers: headers})
      .then(resp => {
        let response = resp.data;
        dispatch(setBookingStats(response));
        dispatch(setLoader(false));
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          console.log('errrrrr', err.response);
          showMessage(err.response.data.message, 'warning', 'top');
        }
        dispatch(setLoader(false));
      });
  };
};

export const getPaymentStats = (token, id) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${Url}api/payments/stats/${id}`, {headers: headers})
      .then(resp => {
        let response = resp.data;
        dispatch(setPaymentStats(response));
        dispatch(setLoader(false));
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          showMessage(err.response.data.message, 'warning');
        }
        dispatch(setLoader(false));
      });
  };
};
