import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import { FONTS, ICONS, Url } from '../../constant';
import ListItemCard from './components/listItemCard';
import LargeBtn from '../../common/meduimBtnSP';
import LargeBtnBorder from '../../common/meduimBtnBorder';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/loader/loader.action';
import TNIndicator from '../../common/TNIndicator';
import { publishList } from '../../redux/listing/listing.action';
import ThemedListItem from 'react-native-elements/dist/list/ListItem';
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';

const publishListing = props => {
  let recordId = props.route.params.recordId;
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader);
  const token = useSelector(state => state.user.token);
  const currentUser = useSelector(state => state.user.currentUser);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    dispatch(setLoader(true));
    getSpecificListDetail();
    return () => { };
  }, []);

  const getSpecificListDetail = () => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${Url}api/listing/by/${recordId}`, {
        headers: headers,
      })
      .then(resp => {
        let response = resp.data;
        console.log(response)
        setDetail(response);
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

  const publish = () => {
    dispatch(setLoader(true));
    dispatch(publishList(token, recordId, props.navigation, currentUser._id));
    props.navigation.navigate("bottomTab", { screen: "Listings" })
    // props.navigation.navigate("bottomTab", { recordId: recordId })
    //Listings
  };

  const onEditClick = () => {
    if (detail.listingType == 'Service') {
      props.navigation.navigate("editAddServiceDetail", { listId: recordId })
    } else if (detail.listingType == 'Event') {
      props.navigation.navigate("editEventDetail", { listId: recordId })
    } else if (detail.listingType == 'Facility') {
      props.navigation.navigate("editFacilityDetail", { listId: recordId })
    }
  }

  return (
    <View style={styles.container}>
      {loader ? (
        <TNIndicator />
      ) : (
        <View style={styles.listContainer}>
          <Text style={styles.headingStyle}>Nice Job!</Text>
          <Text style={styles.detailStyle}>
            Your {detail.listingType != undefined ? detail.listingType.toLowerCase() : 'n/a'} is nearly ready to go live
          </Text>
          <ListItemCard data={detail} onClick={onEditClick.bind(ThemedListItem)} />
        </View>
      )}
      <View style={{ position: 'absolute', bottom: 30, alignSelf: 'center' }}>
        <LargeBtn
          label="Publish Listing"
          bgColor="#2C99C6"
          onClick={() => publish()}
        />
        <LargeBtnBorder
          label="Create another listing"
          bgColor="#2C99C6"
          onClick={() => props.navigation.navigate('listingTypes')}
        />
      </View>
    </View>
  );
};

export default publishListing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF05',
  },
  listContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingStyle: {
    width: '65%',
    color: '#000000',
    fontSize: wp('6'),
    fontFamily: FONTS.SFSemiBold,
    textAlign: 'center',
  },
  detailStyle: {
    width: '65%',
    color: '#707070',
    fontSize: wp('4.7'),
    fontFamily: FONTS.SFRegular,
    textAlign: 'center',
    marginTop: 5,
  },
});
