import ActionsType from "../utils/actions.type"
import { Url } from "../../constant/baseURL";
import axios from 'axios'
import { setLoader } from "../loader/loader.action";
import { showMessage } from "../../helpers/replaceDigitsWithAesteriks";


export const setTaxInfo = (data) => ({
  type: ActionsType.SET_TAX_INFO,
  payload: data
});

export const setNewTaxFlag = (data) => ({
  type: ActionsType.SET_NEW_TAX_ADD,
  payload: data
});


export const addTaxDetail = (token, data, navigation) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.post(`${Url}api/users/tax-info`, data, { headers: headers })
      .then(resp => {
        let response = resp.data
        dispatch(setNewTaxFlag(true))
        dispatch(setLoader(false));
        dispatch(getTaxDetail(token));
      }).catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
        }
        // dispatch(setNewTaxFlag(true))
        dispatch(setLoader(false))
      });
  };
}

export const updateTaxDetail = (token, data, id, navigation) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.put(`${Url}api/users/tax-info/${id}`, data, { headers: headers })
      .then(resp => {
        let response = resp.data
        dispatch(setLoader(false));
        dispatch(getTaxDetail(token));
        
      }).catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
        }
        dispatch(setLoader(false))
      });
  };
}

export const getTaxDetail = (token) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.get(`${Url}api/users/all-tax-info`, { headers: headers })
      .then(resp => {
        let response = resp.data
        dispatch(setTaxInfo(response.docs))
      }).catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
        }
      });
  };
}








