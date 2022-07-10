import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FONTS} from '../../constant';
import Header from './components/header';
import Btn from '../../common/meduimBtnSP';
import PlacesSearchBar from '../profileSetup/components/findAddress';
import PreviousLocation from './components/previousLocation';
import SearchedLocation from './components/searchedLocation';
import ChoosedLocation from './components/choosedLocation';
import {useDispatch, useSelector} from 'react-redux';
import {setLoader} from '../../redux/loader/loader.action';
import TNIndicator from '../../common/TNIndicator';
import {addServiceLocation} from '../../redux/listing/listing.action';
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';

const editServiceLocation = props => {
  let recordId = props.route.params.recordId;
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader);
  const token = useSelector(state => state.user.token);
  const [shortName, setShortName] = useState('');
  const [longName, setLongName] = useState('');
  const [address, setAddress] = useState('');
  const [progress, setProgress] = useState(0.5);

  useEffect(() => {
    setTimeout(() => {
      setProgress(0.7);
    }, 100);
    return () => {};
  }, []);

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
          coordinates: [address.lat, address.lng],
          shortName: shortName,
          description: longName,
        },
      };
      dispatch(addServiceLocation(token, recordId, data, props.navigation, 1));
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api2.sporforya.com/api/listing/by/${recordId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );

      const data = await response.json();

      if (data.location) {
        if (
          data.location.shortName &&
          data.location.longName &&
          data.location.coordinates
        ) {
          setAddress({
            lat: data.location.coordinates.lat,
            long: data.location.coordinates.long,
          });
          setShortName(data.location.shortName);
          setLongName(data.location.longName);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateData = async () => {
    try {
      if (address == '') {
        showMessage('Should choose location', 'warning');
      } else {
        const body = {
          location: {
            coordinates: [address.lat, address.lng],
            shortName: shortName,
            description: longName,
          },
        };
        const response = await fetch(
          `http://sfyapi.herokuapp.com/api/listing/location/${recordId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(body),
          },
        );

        if (response.status === 200 || response.status === 201) {
          props.navigation.navigate('editServiceFacilities');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        navigation={props.navigation}
        label="Service"
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
            Please tell us where your service is located
          </Text>
        </View>
        <View style={{height: 20}} />
        <PlacesSearchBar handler={getAddress.bind(this)} />
        <View style={{height: 50}} />
        {/* <ChoosedLocation /> */}
        <View style={{height: 20}} />

        {/* <PreviousLocation /> */}
        {/* <SearchedLocation /> */}
      </View>

      <View style={{marginTop: hp('52')}}>
        <Btn
          label="Continue"
          onClick={() => {
            updateData();
          }}
          bgColor="#2C99C6"
        />
      </View>

      {loader ? <TNIndicator /> : null}
    </View>
  );
};

export default editServiceLocation;

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
