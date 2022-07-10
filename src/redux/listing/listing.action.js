import ActionsType from '../utils/actions.type';
import { Url } from '../../constant/baseURL';
import axios from 'axios';
import { setLoader } from '../loader/loader.action';
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';


export const setSearchText = data => ({
  type: ActionsType.SET_SEARCH_TEXT,
  payload: data,
});

export const setPolicyArray = data => ({
  type: ActionsType.SET_POLICY_LIST,
  payload: data,
});
export const setListingArray = data => ({
  type: ActionsType.SET_LISTING_ARRAY,
  payload: data,
});

export const setSpecificUserList = data => ({
  type: ActionsType.SET_SPECIFIC_USER_LIST,
  payload: data,
});

export const setAllListing = data => ({
  type: ActionsType.SET_ALL_LISTING,
  payload: data,
});
export const setListingSchedule = data => ({
  type: ActionsType.SET_SCHEDULE_LIST,
  payload: data,
});
export const setListingDetail = data => ({
  type: ActionsType.SET_LISTING_DETAIL,
  payload: data,
});

// Add listing Data
export const addServiceDetail = (token, data, navigation, type) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/listing/service`, data, { headers: headers })
      .then(resp => {
        let response = resp.data;
        dispatch(setLoader(false));
        if (type == 1) {
          navigation.navigate('particulars', { recordId: response._id });
        }
        if (type == 2) {
          navigation.navigate('particularsEvents', { recordId: response._id });
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

export const addServiceParticulars = (token, id, data, navigation, type) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/listing/particulars/${id}`, data, { headers: headers })
      .then(resp => {
        let response = resp.data;
        if (type == 1) {
          navigation.navigate('serviceLocation', { recordId: id });
        }
        if (type == 2) {
          navigation.navigate('eventLocation', { recordId: id });
        }
        if (type == 3) {
          navigation.navigate('facilityLocation', { recordId: id });
        }

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

export const editServiceParticulars = (token, id, data, navigation, type) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/listing/particulars/${id}`, data, { headers: headers })
      .then(resp => {
        let response = resp.data;
        showMessage('Record saved successfully!');
        if (type == 1) {
          navigation.navigate('editServiceLocation', { recordId: id });
        }
        if (type == 2) {
          navigation.navigate('editEventLocation', { recordId: id });
        }
        if (type == 3) {
          navigation.navigate('editFacilityLocation', { recordId: id });
        }

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

export const addServiceLocation = (token, id, data, navigation, type) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/listing/location/${id}`, data, { headers: headers })
      .then(resp => {
        let response = resp.data;
        if (type == 1) {
          navigation.navigate('facilities', { recordId: id });
        } else if (type == 2) {
          navigation.navigate('facilitiesEvent', { recordId: id });
        } else {
          navigation.navigate('facilitiesFacy', { recordId: id });
        }
        dispatch(setLoader(false));
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          showMessage(err.response.data.message);
        }
        console.log('Error addServiceLocation: ', err);
        dispatch(setLoader(false));
      });
  };
};

export const editServiceLocations = (token, id, data, navigation, type) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/listing/location/${id}`, data, { headers: headers })
      .then(resp => {
        let response = resp.data;
        if (type == 1) {
          navigation.navigate('editFacilities', { recordId: id });
        } else if (type == 2) {
          navigation.navigate('editfacilitiesEvent', { recordId: id });
        } else {
          navigation.navigate('editFacilitiesFacy', { recordId: id });
        }
        dispatch(setLoader(false));
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          showMessage(err.response.data.message);
        }
        console.log('Error addServiceLocation: ', err);
        dispatch(setLoader(false));
      });
  };
};

export const addServiceFacilities = (token, id, data, navigation, type) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/listing/facilites/${id}`, data, { headers: headers })
      .then(resp => {
        let response = resp.data;
        dispatch(setLoader(false));
        if (type == 1) {
          navigation.navigate('schedulePrice', { recordId: id });
        }
        if (type == 2) {
          navigation.navigate('schedulePriceEvents', { recordId: id });
        }
        if (type == 3) {
          navigation.navigate('schedulePriceFacility', { recordId: id });
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

export const editServiceFacilities = (token, id, data, navigation, type) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/listing/facilites/${id}`, data, { headers: headers })
      .then(resp => {
        let response = resp.data;
        dispatch(setLoader(false));
        if (type == 1) {
          navigation.navigate('editSchedulePrice', { recordId: id });
        }
        if (type == 2) {
          navigation.navigate('editSchedulePriceEvents', { recordId: id });
        }
        if (type == 3) {
          navigation.navigate('editSchedulePriceFacility', { recordId: id });
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

export const addServiceFacilitiesAmenties = (token, id, data, navigation) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/listing/facilites-amenties/${id}`, data, {
        headers: headers,
      })
      .then(resp => {
        let response = resp.data;
        dispatch(setLoader(false));
        navigation.navigate('schedulePriceFacility', { recordId: id });
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

export const addServiceSchedule = (token, id, data, navigation, type) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/listing/schedual/${id}`, data, { headers: headers })
      .then(resp => {
        let response = resp.data;
        console.log('this is saved====== ',response)
        dispatch(getSchedules(token, id));
      })
      .catch(error => {
        const err = error;
        console.log('error: ', err.response.data.message);
        if (err.response) {
          showMessage(err.response.data.message);
        }
        dispatch(setLoader(false));
      });
  };
};

export const updateSchedule = (token, recordId, id, data, navigation) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .put(`${Url}api/listing/updateSchedule/${id}`, data, { headers: headers })
      .then(resp => {
        let response = resp.data;
        showMessage("Schedule updated successfully")
        dispatch(getSchedules(token, recordId));
        navigation.goBack();
        // navigation.navigate('schedulePrice', { recordId: recordId });
        // if (type == 1) {
        //   navigation.navigate("frequentlyQuestions", { recordId: id })
        // } else if (type == 2) {
        //   navigation.navigate("frequentlyQuestionsEvent", { recordId: id })
        // } else {
        //   navigation.navigate("frequentlyQuestionsFacility", { recordId: id })
        // }
      })
      .catch(error => {
        const err = error;
        console.log('error: ', err.response.data.message);
        if (err.response) {
          showMessage(err.response.data.message);
        }
        dispatch(setLoader(false));
      });
  };
};

export const addInsurance = (token, id, data, navigation) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/listing/facilites-insurance/${id}`, data, {
        headers: headers,
      })
      .then(resp => {
        let response = resp.data;
        dispatch(setLoader(false));
        navigation.navigate('frequentlyQuestionsFacility', { recordId: id });
      })
      .catch(error => {
        const err = error;
        console.log('error: ', err.response.data.message);
        if (err.response) {
          showMessage(err.response.data.message);
        }
        dispatch(setLoader(false));
      });
  };
};

export const editInsurance = (token, id, data, navigation) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/listing/facilites-insurance/${id}`, data, {
        headers: headers,
      })
      .then(resp => {
        let response = resp.data;
        showMessage('Record saved successfully!');
        dispatch(setLoader(false));
        navigation.navigate('editFrequentlyQuestionsFacility', { recordId: id });
      })
      .catch(error => {
        const err = error;
        console.log('error: ', err.response.data.message);
        if (err.response) {
          showMessage(err.response.data.message);
        }
        dispatch(setLoader(false));
      });
  };
};

export const addFrequentlyAskedQuestions = (token, id, data) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/listing/faq/${id}`, data, { headers: headers })
      .then(resp => {
        let response = resp.data;
        dispatch(setLoader(false));
        // if (type == 1) {
        //   navigation.navigate("cancellationPolicy", { recordId: id })
        // } else if (type == 2) {
        //   navigation.navigate("cancellationPolicyEvent", { recordId: id })
        // } else {
        //   navigation.navigate("cancellationPolicyFacilty", { recordId: id })
        // }
      })
      .catch(error => {
        const err = error;
        console.log('error: ', err.response.data.message);
        if (err.response) {
          showMessage(err.response.data.message);
        }
        dispatch(setLoader(false));
      });
  };
};


export const addPolicy = (token, id, data, navigation, type) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/listing/cancel/${id}`, data, { headers: headers })
      .then(resp => {
        let response = resp.data;
        dispatch(setLoader(false));
        dispatch(getListingDetail(token, id))
        // navigation.navigate('releaseLiability', { recordId: id });
        // if (type == 1) {
        // } else if (type == 2) {
        //   navigation.navigate("cancellationPolicyEvent", { recordId: id })
        // } else {
        //   navigation.navigate("cancellationPolicyFacilty", { recordId: id })
        // }
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

export const addLiability = (token, id, data, navigation) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/listing/waiver/${id}`, data, { headers: headers })
      .then(resp => {
        let response = resp.data;
        dispatch(setLoader(false));
        navigation.navigate('publishListing', { recordId: id });
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
export const editLiability = (token, id, data, navigation) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/listing/waiver/${id}`, data, { headers: headers })
      .then(resp => {
        let response = resp.data;
        showMessage('Record updated successfully!');
        dispatch(setLoader(false));
        dispatch(getListingArray(token))
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

export const publishList = (token, id, navigation, userId, type) => {
  return dispatch => {
    dispatch(setLoader(true));
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios.get(`${Url}api/listing/publish/${id}`,
      { headers: headers }
    ).then(resp => {
      let response = resp.data
      showMessage("Listing published successfully")
      dispatch(setLoader(false));
      dispatch(getListingArray(token));
      dispatch(getSpecificUserListings(userId));
      if (type == 1) {

      } else {
        navigation.navigate("bottomTab", { recordId: id })
      }

    }).catch(error => {
      const err = error
      showMessage("Listing published successfully")
      navigation.navigate("bottomTab", { recordId: id })
      dispatch(getListingArray(token));
      dispatch(getSpecificUserListings(userId));
      dispatch(setLoader(false));
    });
  };
};

// Add Events Listing

export const addEventDetail = (token, data, navigation) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/listing/event`, data, { headers: headers })
      .then(resp => {
        let response = resp.data;
        dispatch(setLoader(false));
        console.log('addEventDetail: ', response);
        navigation.navigate('particularsEvents', { recordId: response._id });
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

export const addFacilityDetail = (token, data, navigation) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/listing/facility`, data, { headers: headers })
      .then(resp => {
        let response = resp.data;
        dispatch(setLoader(false));
        navigation.navigate('particularsFacilities', { recordId: response._id });
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

export const editFacilityDetails = (token, data, id, navigation) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .put(`${Url}api/listing/facility/${id}`, data, { headers: headers })
      .then(resp => {
        let response = resp.data;
        dispatch(setLoader(false));
        navigation.navigate('editParticularsFacilities', { recordId: id });
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


export const getListingArray = token => {
  return dispatch => {
    dispatch(setLoader(true));
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${Url}api/listing/status`, { headers: headers })
      .then(resp => {
        let response = resp.data;
        // console.log("getListingArray: ", response.data.length)

        dispatch(setListingArray(response.data));
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

export const getSpecificUserListings = (id) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
    };
    axios
      .get(`${Url}api/listing/lists?userId=${id}`, { headers: headers })
      .then(resp => {
        let response = resp.data;
        dispatch(setSpecificUserList(response.data));
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

export const getAllListings = token => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${Url}api/listing/sort-filters`, { headers: headers })
      .then(resp => {
        let response = resp.data;
        dispatch(setAllListing(response.data));
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

export const getSchedules = (token, id) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${Url}api/listing/schedules/${id}`, { headers: headers })
      .then(resp => {
        console.log(resp);
        let response = resp.data;
        dispatch(setListingSchedule(response.schedules));
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

export const getListingDetail = (token, id) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${Url}api/listing/by/${id}`, { headers: headers })
      .then(resp => {
        let response = resp.data;
        if (response.cancelPolicy != undefined) {
          dispatch(setPolicyArray(response.cancelPolicy));
        } else {
          dispatch(setPolicyArray(null));
        }
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
