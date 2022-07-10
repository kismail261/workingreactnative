import ActionsType from "../utils/actions.type"
import { Url } from "../../constant/baseURL";
import axios from 'axios'
import { showMessage } from "../../helpers/replaceDigitsWithAesteriks";


export const setFavouritesList = (data) => ({
  type: ActionsType.SET_FAVOURITES_LIST,
  payload: data
});
export const setFavouritesProviderList = (data) => ({
  type: ActionsType.SET_FAVOURITES_PROVIDER,
  payload: data
});


export const addFavourite = (token, data) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.post(`${Url}api/like`, data, { headers: headers })
      .then(resp => {
        let response = resp.data
        console.log("addFavourite: ", response)
        dispatch(getfavouriteList(token, data.likeType, data.likerId));
      }).catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
        }
      });
  };
}


export const getfavouriteList = (token, likeType, likerId) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.get(`${Url}api/like?likeType=${likeType}&likerId=${likerId}`,
      { headers: headers }
    )
      .then(resp => {
        let response = resp.data
        if (likeType == "listing") {
          dispatch(setFavouritesList(response.data))
        } else {
          dispatch(setFavouritesProviderList(response.data))
        }
      }).catch(error => {
        const err = error
        if (err.response) {
        }
      });
  };
}








