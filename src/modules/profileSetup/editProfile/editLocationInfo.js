import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View, Platform} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {FONTS} from '../../../constant';
import Header from '../components/header';
import Btn from '../../../common/meduimBtnSP';
import CustomInputField from '../components/customInputField';
import TNIndicator from '../../../common/TNIndicator';

const editLocationInfo = props => {
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader);
  const token = useSelector(state => state.user.token);
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postCode, setPostCode] = useState('');
  const [progress, setProgress] = useState(0.5);

  const getUserData = async () => {
    try {
      const response = await fetch(
        `https://api2.sporforya.com/api/users/me`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      setAddress(data.providerInfo?.locationInfo?.address);
      setApartment(data.providerInfo.locationInfo.appartment);
      setCity(data.providerInfo.locationInfo.city);
      setCountry(data.providerInfo.locationInfo.countary);
      setState(data.providerInfo.locationInfo.state);
      setPostCode(data.providerInfo.locationInfo.postcode);
    } catch (error) {
      console.error(error);
    }
  };

  const updateData = async () => {
    try {
      const body = {
        address: address,
        appartment: apartment,
        city: city,
        state: state,
        countary: country,
        postcode: postCode,
      };

      const response = await fetch(
        `https://api2.sporforya.com/api/users/locationinfo`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        },
      );

      if (response.status == 201) {
        props.navigation.navigate('editProviderInfo');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getAddress = value => {
    setAddress(value);
  };
  const getApartment = value => {
    setApartment(value);
  };
  const getCity = value => {
    setCity(value);
  };
  const getState = value => {
    setState(value);
  };
  const getCountry = value => {
    setCountry(value);
  };
  const getPostCode = value => {
    setPostCode(value);
  };

  const saveLocation = () => {
    updateData();
  };

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} label="Edit Location" />
      <ScrollView
        contentContainerStyle={{width: wp('100'), alignItems: 'center'}}>
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
        <CustomInputField
          label="Address"
          value={address}
          getValue={getAddress.bind(this)}
        />
        <CustomInputField
          label="Apartment / Building"
          value={apartment}
          getValue={getApartment.bind(this)}
        />
        <CustomInputField
          label="City"
          value={city}
          getValue={getCity.bind(this)}
        />
        <CustomInputField
          label="State"
          value={state}
          getValue={getState.bind(this)}
        />
        <CustomInputField
          label="Country"
          value={country}
          getValue={getCountry.bind(this)}
        />
        <CustomInputField
          label="Post code"
          value={postCode}
          getValue={getPostCode.bind(this)}
        />
        <View style={{height: 50}} />
        <Btn
          label="Next"
          onClick={() => {
            saveLocation();
          }}
          bgColor="#2C99C6"
        />
        <View style={{height: 20}} />
      </ScrollView>
      {loader ? <TNIndicator /> : null}
    </View>
  );
};

export default editLocationInfo;

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
});
