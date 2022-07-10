import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FONTS, Url} from '../../../constant';
import Header from '../components/header';
import Btn from '../../../common/meduimBtnSP';
import PlacesSearchBar from '../../profileSetup/components/findAddress';
import ChoosedLocation from '../components/choosedLocation';
import {useDispatch, useSelector} from 'react-redux';
import {setLoader} from '../../../redux/loader/loader.action';
import TNIndicator from '../../../common/TNIndicator';
import {useIsFocused} from '@react-navigation/native';
import {editServiceLocations} from '../../../redux/listing/listing.action';
import axios from 'axios';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';

const serviceLocation = props => {
  let recordId = props.route.params.recordId;
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader);
  const token = useSelector(state => state.user.token);
  const [shortName, setShortName] = useState('');
  const [longName, setLongName] = useState('');
  const [address, setAddress] = useState('');
  const [progress, setProgress] = useState(0.5);
  const [savedLocation, setSavedLocation] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getListingDetail();
      setTimeout(() => {
        setProgress(0.7);
      }, 100);
    }
    return () => {};
  }, [isFocused]);

  const getListingDetail = () => {
    dispatch(setLoader(true));
    let headers = {
      'Content-Type': 'application/json',
    };
    axios
      .get(`${Url}api/listing/by/${recordId}`, {headers: headers})
      .then(resp => {
        let response = resp.data;
        setSavedLocation(response.location);
        setShortName(response.location.shortName);
        setLongName(response.location.description);
        setAddress({
          lng: response.location.coordinates[0],
          lat: response.location.coordinates[1],
        });
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

  const getAddress = (data, details) => {
    setAddress(details.geometry.location);
    setLongName(data.description);
    setShortName(details.address_components[0].short_name);
  };

  const saveLocation = () => {
    if (address == '') {
      showMessage('Should choose location', 'warning');
    } else {
      dispatch(setLoader(true));
      let data = {
        location: {
          coordinates: [address.lng, address.lat],
          shortName: shortName,
          description: longName,
        },
      };
      dispatch(
        editServiceLocations(token, recordId, data, props.navigation, 3),
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, width: '100%', alignItems: 'center'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
      <View style={styles.container}>
        <Header
          navigation={props.navigation}
          label="Facilities"
          progressCount={progress}
        />
        <View style={{width: wp('100'), alignItems: 'center'}}>
          <View
            style={{
              alignItems: 'center',
              marginTop: Platform.OS == 'android' ? 20 : 35,
            }}>
            <Text style={styles.headingStyle}>Location information</Text>
            <Text style={styles.subheadingStyle}>
              Please tell us where your facility is located
            </Text>
          </View>
          <View style={{height: 20}} />
          <PlacesSearchBar handler={getAddress.bind(this)} />
          <View style={{height: 50}} />
          {savedLocation != '' ? (
            <ChoosedLocation data={savedLocation} />
          ) : null}
        </View>

        <View style={{marginTop: hp('42')}}>
          <Btn
            label="Continue"
            onClick={() => {
              saveLocation();
            }}
            bgColor="#2C99C6"
          />
        </View>

        {loader ? <TNIndicator /> : null}
      </View>
    </KeyboardAvoidingView>
  );
};

export default serviceLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
  },
  headingStyle: {
    width: wp('80'),
    color: '#000000',
    fontSize: wp('6.5'),
    fontFamily: FONTS.SFSemiBold,
  },
  subheadingStyle: {
    width: wp('80'),
    color: '#707070',
    fontSize: wp('3.2'),
    fontFamily: FONTS.SFRegular,
    marginTop: 6,
  },
  optionContainer: {
    width: wp('80'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelStyle: {
    width: '100%',
    color: '#000000',
    fontSize: wp('4'),
    fontFamily: FONTS.SFSemiBold,
    marginBottom: 6,
  },
  sublabelStyle: {
    width: '100%',
    color: 'rgba(112, 112, 112, 1)',
    fontSize: wp('3'),
    fontFamily: FONTS.SFRegular,
    marginBottom: 12,
  },
});
