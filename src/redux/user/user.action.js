import {CommonActions} from '@react-navigation/native';
import {LoginManager} from 'react-native-fbsdk-next';
import ActionsType from './../utils/actions.type';
import {Url} from '../../constant/baseURL';
import axios from 'axios';
import {setLoader} from '../loader/loader.action';
import {showMessage} from '../../helpers/replaceDigitsWithAesteriks';

export const setFilterParams = value => ({
  type: ActionsType.SET_FILTER_PARAMS,
  payload: value,
});

export const setFilterData = value => ({
  type: ActionsType.SET_FILTER_DATA,
  payload: value,
});

export const setUserMode = value => ({
  type: ActionsType.SET_USER_MODE,
  payload: value,
});

export const setCurrentUser = user => ({
  type: ActionsType.SET_CURRENT_USER,
  payload: user,
});

export const setBadgeEnabled = flag => ({
  type: ActionsType.SET_BADGE_ENABLED,
  payload: flag,
});

export const setUserDetail = user => ({
  type: ActionsType.SET_USER_DETAIL,
  payload: user,
});

export const setBecomeProviderFlag = flag => ({
  type: ActionsType.SET_BECOME_PROVIDER,
  payload: flag,
});

export const setAuthToken = token => ({
  type: ActionsType.SET_TOKEN,
  payload: token,
});

export const setOnbaording = token => ({
  type: ActionsType.SET_ONBAORDING_FLAG,
  payload: token,
});

export const createAccount = (data, navigation) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
    };
    axios
      .post(`${Url}api/auth/register`, data, {headers: headers})
      .then(resp => {
        let response = resp.data;
        dispatch(setCurrentUser(response.user));
        dispatch(setAuthToken(response.access_token));
        showMessage('Account created successfully');
        dispatch(setLoader(false));
        navigation.navigate('confirmYourEmail', {email: data.email});
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

export const userLogin = (data, navigation) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
    };
    axios
      .post(`${Url}api/auth/login`, data, {headers: headers})
      .then(resp => {
        let response = resp.data;
        let verified = resp.data.user.isVerified;
        dispatch(setCurrentUser(response.user));
        dispatch(setAuthToken(response.access_token));
        dispatch(setLoader(false));
        if (verified) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'mainRoutes'}],
            }),
          );
        } else {
          navigation.navigate('confirmYourEmail', {email: data.email});
        }
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

export const loginByGoogle = (data, navigation) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
    };
    axios
      .post(`${Url}api/auth/google`, data, {headers: headers})
      .then(resp => {
        let response = resp.data;
        dispatch(setCurrentUser(response.user));
        dispatch(setAuthToken(response.access_token));
        dispatch(setLoader(false));
        navigation.navigate('mainRoutes');
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

export const loginByFacebook = (access_token, navigation) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
    };
    axios
      .get(
        `${Url}api/auth/facebook`,
        {
          params: {access_token},
        },
        {headers: headers},
      )
      .then(resp => {
        let response = resp.data;
        dispatch(setCurrentUser(response.user));
        dispatch(setAuthToken(response.access_token));
        dispatch(setLoader(false));
        navigation.navigate('mainRoutes');
        LoginManager.logOut();
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

export const getCurrentUserDetail = (id, token) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${Url}api/users/${id}`, {headers: headers})
      .then(resp => {
        let response = resp.data;
        let user = {
          _id: response._id,
          updatedAt: response.updatedAt,
          createdAt: response.createdAt,
          email: response.email,
          roles: ['User'],
          isVerified: response.isVerified,
        };
        dispatch(setCurrentUser(user));
      })
      .catch(err => {});
  };
};

export const getUserDetail = id => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      // "Authorization": `Bearer ${token}`
    };
    axios
      .get(`${Url}api/users/me/${id}`, {headers: headers})
      .then(resp => {
        let response = resp.data;
        dispatch(setUserDetail(response));
      })
      .catch(err => {});
  };
};

export const getBadgeEnabled = token => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${Url}api/users/verification-status`, {headers: headers})
      .then(resp => {
        let response = resp.data;
        dispatch(setBadgeEnabled(response));
      })
      .catch(err => {});
  };
};

export const uploadReview = (data, token, navigation) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/reviews`, data, {headers: headers})
      .then(resp => {
        let response = resp.data;
        dispatch(setLoader(false));
        navigation.navigate('thankyou');
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

export const uploadProviderReview = (data, token, navigation, type) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/reviews`, data, {headers: headers})
      .then(resp => {
        let response = resp.data;
        dispatch(setLoader(false));
        navigation.navigate('thankyouUser', {type: type});
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

export const changePassword = (data, token) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/users/change-password`, data, {headers: headers})
      .then(resp => {
        let response = resp.data;
        dispatch(setLoader(false));
        showMessage('Password updated successfully');
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          showMessage('Old password does not match');
        }
        dispatch(setLoader(false));
      });
  };
};
