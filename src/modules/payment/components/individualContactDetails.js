/**
 * @format
 */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Btn from '../../../common/meduimBtnSP';
import {FONTS, Url} from '../../../constant';
import CustomInputField from './customInputField';
import CustomPhonePicker from '../../profileSetup/components/customPhonePicker';
import Header from './header';
import {DropDownSingle} from '../../../common/dropdownComponents/dropDownSingle';
import {useSelector} from 'react-redux';
import axios from 'axios';
import TNActivityIndicator from '../../../common/TNIndicator';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';

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

const individualContactDetails = props => {
  const token = useSelector(state => state.user.token);
  const [country, setCountry] = useState('Select country');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('+1');
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // setLoader(false)
    return () => {};
  }, []);

  const getCountry = value => {
    setCountry(value);
  };

  const getPhone = value => {
    setPhone(value);
  };
  const getCode = value => {
    setCode(value);
  };

  const getEmail = value => {
    setEmail(value);
  };

  const onContinue = async () => {
    let validate = await validateEmail();
    if (country == 'Select country') {
      showMessage('Please select country');
    } else if (phone == '') {
      showMessage('Phone number field should not be blank');
    } else if (email == '') {
      showMessage('Email field should not be blank');
    } else if (!validate) {
      showMessage('Wrong email format');
    } else {
      setLoader(true);
      let data = {
        country: country,
        phone: code + phone,
        email: email,
      };
      props.navigation.navigate('confirmYourPhone', {
        phoneNo: code + phone,
        apiData: data,
      });
      resendCode(data);
    }
  };

  const resendCode = apiData => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    let data = {
      phone: code + phone,
    };
    axios
      .post(`${Url}api/users/resend-verification`, data, {headers: headers})
      .then(resp => {
        let response = resp.data;
        setLoader(false);
        //  showMessage(`code is sent on ${code + phone}`)
        props.navigation.navigate('confirmYourPhone', {
          phoneNo: code + phone,
          apiData: apiData,
        });
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

  const validateEmail = async () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, width: '100%', alignItems: 'center'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
      <View style={styles.container}>
        <Header
          navigation={props.navigation}
          label="Payout Method"
          progressCount={0.25}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.headingStyle}>Get paid by Sporforya</Text>
            <Text style={styles.subHeading}>
              Sporforya partners with Stripe for fast and secure payments.
              Complete some details so you can start getting paid
            </Text>

            <Text style={styles.inputHeading}>Country</Text>
            <Text style={styles.inputSubHeading}>
              Please select the country where you or your organization will
              operate
            </Text>
            <View style={{width: wp('80'), marginTop: -33}}>
              <DropDownSingle
                name={country}
                data={dataCountries}
                getValue={getCountry.bind(this)}
                label=""
              />
            </View>
            <Text style={styles.inputHeading}>Phone</Text>
            <Text style={styles.inputSubHeading}>
              We will send a message to this number to verify your Stripe
              account
            </Text>
            <View style={{marginTop: -34}} />
            <CustomPhonePicker
              label=""
              value={phone}
              getValue={getPhone.bind(this)}
              getCountryCode={getCode.bind(this)}
              placeholder="Phone number"
            />
            <Text style={styles.inputHeading}>Email</Text>
            <Text style={styles.inputSubHeading}>
              We will use this email for important updates
            </Text>

            <CustomInputField
              value={email}
              getValue={getEmail.bind(this)}
              placeholder="Email"
            />
            <View style={{alignSelf: 'center'}}>
              <Btn label="Continue" onClick={onContinue} bgColor="#2C99C6" />
            </View>
          </View>
        </ScrollView>
        {loader ? <TNActivityIndicator /> : null}
      </View>
    </KeyboardAvoidingView>
  );
};

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
    fontFamily: FONTS.SFBold,
    marginTop: Platform.OS == 'android' ? 18 : 28,
  },
  subHeading: {
    width: wp('80'),
    color: '#707070',
    fontSize: wp('4'),
    fontFamily: FONTS.SFRegular,
    marginTop: 8,
    marginBottom: Platform.OS == 'android' ? 8 : 8,
  },
  inputHeading: {
    width: wp('80'),
    color: '#000000',
    fontSize: wp('4'),
    fontFamily: FONTS.SFBold,
    marginTop: Platform.OS == 'android' ? 10 : 18,
  },
  inputSubHeading: {
    width: wp('80'),
    color: '#707070',
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFRegular,
    marginTop: 8,
    marginBottom: Platform.OS == 'android' ? 8 : 8,
  },
});

export default individualContactDetails;
