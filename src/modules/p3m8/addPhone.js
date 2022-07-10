import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import {ButtonRegular} from '../../common/btnRegular';
import {FONTS, ICONS} from '../../constant';
import Header from '../../common/headerBLC';
import CustomPhonePicker from '../profileSetup/components/customPhonePicker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Url} from '../../constant/baseURL';
import axios from 'axios';
import TNIndicator from '../../common/TNIndicator';
import {useSelector} from 'react-redux';
import {setLoader} from '../../redux/loader/loader.action';
import {DropDownSingle} from '../../common/dropdownComponents/dropDownSingle';
import {showMessage} from '../../helpers/replaceDigitsWithAesteriks';

const dataCountries = [
  {id: 'United States', name: 'United States'},
  {id: 'Australia', name: 'Australia'},
  {id: 'United Kingdom', name: 'United Kingdom'},
  {id: 'Germany', name: 'Germany'},
  {id: 'France', name: 'France'},
  {id: 'Spain', name: 'Spain'},
  {id: 'Italy', name: 'Italy'},
  {id: 'Portugal', name: 'Portugal'},
  {id: 'Turkey', name: 'Turkey'},
];

export const AddPhone = props => {
  const token = useSelector(state => state.user.token);
  const loader = useSelector(state => state.loader.loader);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('+1');
  const [country, setCountry] = useState('Select country');

  const getPhone = value => {
    setPhone(value);
  };
  const getCode = value => {
    setCode(value);
  };
  const getCountry = value => {
    setCountry(value);
  };

  const continueClick = () => {
    if (country === 'Select country') {
      showMessage('Please select country');
    } else if (code === '') {
      showMessage('Please select country code');
    } else if (phone === '') {
      showMessage('Phone number field should not be blank');
    } else if (phone.length !== 10) {
      showMessage('Phone number field should have 10 digits');
    } else {
      let phoneIs = code + phone;
      setLoader(true);
      resendCode(phoneIs); //TwoStepVerificationStatus
      // props.navigation.navigate('TwoStepVerificationStatus')
    }
  };
  const resendCode = phoneNo => {
    setLoader(true);
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    let data = {
      phone: phoneNo,
    };
    axios
      .post(`${Url}api/users/two-factor-number`, data, {headers: headers})
      .then(resp => {
        let response = resp.data;
        setLoader(false);
        showMessage(`code is sent on ${phoneNo}`);
        props.navigation.navigate('confirmOTP', {phoneNo: phoneNo});
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          showMessage(err.response.data.message);
        }
        setLoader(false);
        console.log('err resendCode: ', err.response.data.message);
      });
  };

  return (
    <SafeAreaView style={styles.main}>
      <Header navigation={props.navigation} label={'2 Step Verification'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={{marginTop: 22, width: '80%'}}>
          <Text style={styles.title}>Add Phone No.</Text>
        </View>
        <View style={{marginTop: 22, width: '80%'}}>
          <Text style={styles.desc}>
            This phone number will be enabled for two-factor authentication and
            login.
          </Text>
        </View>
        <View style={{marginTop: 22, width: '94%'}}>
          <Text style={[styles.field, {marginBottom: -25}]}>Country</Text>
          <DropDownSingle
            name={country}
            data={dataCountries}
            getValue={getCountry.bind(this)}
            label=""
          />
        </View>
        <View style={{marginTop: 22, width: '80%'}}>
          <Text style={[styles.field, {marginBottom: 10}]}>Phone</Text>
          <Text style={styles.desc}>
            This phone number will be enabled for two-factor authentication and
            login.
          </Text>
          <View style={{marginTop: -20}} />
          <CustomPhonePicker
            label=""
            value={phone}
            getValue={getPhone.bind(this)}
            getCountryCode={getCode.bind(this)}
          />
        </View>
        <View style={styles.bottom} />
        <ButtonRegular onClick={continueClick} blue title="Continue" />
      </ScrollView>
      {loader ? <TNIndicator /> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  img: {
    width: 204.57,
    height: 165.3,
  },
  title: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('6'),
    color: '#000000',
  },
  desc: {
    color: '#3D3D3D',
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFMedium,
  },
  field: {
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFSemiBold,
    color: '#000000',
  },
  ti: {
    height: 46,
    borderRadius: 4,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#70707026',
    padding: 10,
  },
  bottom: {
    height: hp('21'),
  },
});
