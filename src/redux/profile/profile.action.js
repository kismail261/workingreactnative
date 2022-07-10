import ActionsType from "../utils/actions.type"
import { Url } from "../../constant/baseURL";
import axios from 'axios'
import { setLoader } from "../loader/loader.action";
import { getUserDetail } from '../user/user.action';
import { showMessage } from "../../helpers/replaceDigitsWithAesteriks";

export const setProfileStatus = (data) => ({
  type: ActionsType.SET_PROFILE_STATUS,
  payload: data
});

export const setReviews = (data) => ({
  type: ActionsType.SET_REVIEWS,
  payload: data
});

export const setNotificationList = (data) => ({
  type: ActionsType.SET_NOTIFICATION_LIST,
  payload: data
});
export const setChildList = (data) => ({
  type: ActionsType.SET_CHILD_LIST,
  payload: data
});

export const setLocationList = (data) => ({
  type: ActionsType.LOCATION_LIST,
  payload: data
});


//individual profile setup api calls
export const getProfileSetupFlags = (token, id) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.get(`${Url}api/users/profileflags/${id}`, { headers: headers })
      .then(resp => {
        let response = resp.data
        dispatch(setProfileStatus(response))
        dispatch(setLoader(false));
      })
      .catch(err => {
        console.log("Error getProfileSetupFlags: ", err)
        dispatch(setLoader(false))
      });
  };
}

export const saveContactInfo = (data, token, navigation, id) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.post(`${Url}api/users/contactinfo`, data, { headers: headers })
      .then(resp => {
        let response = resp.data
        dispatch(setLoader(false))
        navigation.navigate("confirmYourPhone", { phoneNo: data.phone })
        showMessage("Code has been sent successfully")
        dispatch(getUserDetail(id))
      })
      .catch(err => {
        console.log("Error saveContactInfo: ", err)
        dispatch(setLoader(false))
      });
  };
}

export const saveLocationInfo = (data, token, navigation, id) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.post(`${Url}api/users/locationinfo`, data, { headers: headers })
      .then(resp => {
        let response = resp.data
        dispatch(setLoader(false))
        navigation.navigate("homeMain")
        // showMessage("Information added successfully")
        dispatch(getUserDetail(id))
      })
      .catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
          console.log(err.response.data.message)
        }
        console.log("Error SaveLocationInfo: ", err)
        dispatch(setLoader(false))
      });
  };
}

export const saveProviderInfo = (data, token, navigation, id) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.post(`${Url}api/users/providerinfo`, data, { headers: headers })
      .then(resp => {
        let response = resp.data
        dispatch(setLoader(false))
        navigation.navigate("congratulates", { type: "Individual" })
        // showMessage("Information added successfully")
        dispatch(getUserDetail(id))
      })
      .catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
          // console.log(err.response.data.message)
        }
        dispatch(setLoader(false))
      });
  };
}

//org profile setup apis call
export const saveOrganizationInfo = (data, token, id, navigation) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.post(`${Url}api/users/organization-info`, data, { headers: headers })
      .then(resp => {
        let response = resp.data
        dispatch(setLoader(false))
        navigation.navigate("confirmYourPhone", { phoneNo: data.phone })
        dispatch(getUserDetail(id))
      })
      .catch(err => {
        console.log("Error saveOrganizationInfo: ", err)
        dispatch(setLoader(false))
      });
  };
}

export const saveOrgLocation = (data, token, id) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.post(`${Url}api/users/location-org`, data, { headers: headers })
      .then(resp => {
        let response = resp.data
        dispatch(getLocationsList(id))
        dispatch(getUserDetail(id))
        // showMessage("Information added successfully")
      })
      .catch(err => {
        console.log("Error saveOrgLocation: ", err)
        dispatch(setLoader(false))
      });
  };
}

export const getLocationsList = (id) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${token}`
    };
    axios.get(`${Url}api/users/me/${id}`, { headers: headers })
      .then(resp => {
        let response = resp.data
        dispatch(setLocationList(response))
        dispatch(setLoader(false))
      })
      .catch(err => {
        console.log("Error getLocationsList: ", err)
        dispatch(setLoader(false))
      });
  };
}

export const saveOrgProviderInfo = (data, token, navigation, id) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.post(`${Url}api/users/propviderinfo-org`, data, { headers: headers })
      .then(resp => {
        let response = resp.data
        dispatch(setLoader(false))
        navigation.navigate("organizationContactInfo")
        dispatch(getUserDetail(id))
        // showMessage("Information added successfully")
      })
      .catch(err => {
        console.log("Error saveOrgProviderInfo: ", err)
        dispatch(setLoader(false))
      });
  };
}

export const saveOrgContactInfo = (data, token, id) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.post(`${Url}api/users/contact-org`, data, { headers: headers })
      .then(resp => {
        let response = resp.data
        dispatch(getLocationsList(id))
        // showMessage("Information added successfully")
        dispatch(getUserDetail(id))
      })
      .catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
        }
        dispatch(setLoader(false))
      });
  };
}

export const updateOrgContactInfo = (data, token, id, navigation, userId) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.put(`${Url}api/users/contact-org`, data, { headers: headers })
      .then(resp => {
        let response = resp.data
        dispatch(getLocationsList(userId))
        navigation.navigate("organizationContactInfo")
        showMessage("Information updated successfully")
      })
      .catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
        }
        dispatch(setLoader(false))
      });
  };
}

export const uploadImage = (data, token) => {
  let { type, name, path } = data
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.get(`${Url}api/file-upload/presigned-url?type=${type}&name=${name}&path=${path}`, { headers: headers })
      .then(resp => {
        let response = resp.data
        console.log("uploadImage response: ", response)
      })
      .catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
        }
        dispatch(setLoader(false))
      });
  };
}

export const uploadPhotoVerifyID = (token, data, navigation, type) => {

  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.post(`${Url}api/users/identity-verification`, data, { headers: headers })
      .then(resp => {
        let response = resp.data
        dispatch(setLoader(false))
        if (type == 1) {
          navigation.navigate("back")
        }
        if (type == 2) {
          navigation.navigate("reviewInformation")
        }

      })
      .catch(error => {
        const err = error
        if (err.response) {
          // showMessage(err.response.data.message)
        }
        dispatch(setLoader(false))
      });
  };
}

export const getReview = (id) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios.get(`${Url}api/reviews?recieverId=${id}`, { headers: headers })
      .then(resp => {
        let response = resp.data.data
        // console.log("getReview: ", response)
        dispatch(setReviews(response))
        dispatch(setLoader(false))
      })
      .catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
        }
        dispatch(setLoader(false))
      });
  };
}

export const getNotification = (token) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.get(`${Url}api/notification`, { headers: headers })
      .then(resp => {
        let response = resp.data.data
        dispatch(setNotificationList(response))
        dispatch(setLoader(false))
      })
      .catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
        }
        dispatch(setLoader(false))
      });
  };
}
export const tapSpecificNotification = (token, id) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.get(`${Url}api/notification/${id}`, { headers: headers })
      .then(resp => {
        // let response = resp.data.data
        dispatch(getNotification(token))
      })
      .catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
        }
        dispatch(setLoader(false))
      });
  };
}

export const addChild = (token, data, navigation, type, apiData) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.post(`${Url}api/child`, data, { headers: headers })
      .then(resp => {
        dispatch(setLoader(false))
        showMessage("Child added successfully")
        dispatch(getChildList(token, data.parentId))
        navigation.navigate("ChildAdded", { type: type, apiData: apiData })
      })
      .catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
        }
        dispatch(setLoader(false))
      });
  };
}

export const updateChild = (token, data, id, navigation) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.put(`${Url}api/child/${id}`, data, { headers: headers })
      .then(resp => {
        dispatch(setLoader(false))
        showMessage("Child updated successfully")
        dispatch(getChildList(token, data.parentId))
        navigation.navigate("childStack")
      })
      .catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
        }
        dispatch(setLoader(false))
      });
  };
}

export const getChildList = (token, parentId) => {
  return dispatch => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.get(`${Url}api/child?parentId=${parentId}`,
      { headers: headers })
      .then(resp => {
        let response = resp.data.data
        dispatch(setChildList(response))
        dispatch(setLoader(false))
      })
      .catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
        }
        dispatch(setLoader(false))
      });
  };
}







