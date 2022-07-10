/**
 * @format
 */
import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  Platform,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Btn from '../../../common/meduimBtnSP';
import { FONTS, ICONS } from '../../../constant';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';
import CustomInputField from './customInputField';
import Header from './header';

const organizationProviderDetailsEIN = props => {
  const apiData = props.route.params.apiData
  const [org, setOrg] = useState('')
  const [ein, setEin] = useState('')

  useEffect(() => {
    return () => {

    }
  }, [])

  const continueClick = () => {
    if (org == '') {
      showMessage("Your organization field should not be blank")
    } else if (ein == '') {
      showMessage("EIN field should not be blank")
    } else {
      let data = {
        country: apiData.country,
        phone: apiData.phone,
        email: apiData.email,
        businessName: apiData.businessName,
        tradingName: apiData.tradingName,
        web: apiData.web,
        org: org,
        ein: ein,
      }
      props.navigation.navigate('payoutDetails', { apiData: data });
    }
  }

  const getEin = (value) => {
    if (value.length > 0) {
      let finalVal = value.replace(/(\d{2})(\d{7})/, "$1-$2");
      setEin(finalVal)
    } else {
      setEin(value)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: '100%', alignItems: 'center' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
      <View style={styles.container} >
        <Header
          navigation={props.navigation}
          label="Payout Method"
          progressCount={0.4}
        />
        <ScrollView contentContainerStyle={{ width: wp('100'), alignItems: 'center' }} >
          <View style={{ width: wp('85') }} >
            <Text style={styles.headingStyle}>Organization Provider Details</Text>
            <Text style={styles.subHeading}>
              Tell us a few details about yourself and your services
            </Text>

            <Text style={styles.inputHeading}>Your Organization</Text>

            <CustomInputField
              value={org}
              getValue={setOrg.bind(this)}
              placeholder={"Your Organization"}
            />

            <View style={{ padding: 1 }} />

            <Text style={styles.inputHeading}>
              Employer Identification Number (EIN)
            </Text>

            <TextInput
              maxLength={10}
              style={styles.inputStyle}
              onChangeText={value => { getEin(value) }}
              placeholder={"12-3456789"}
              placeholderTextColor="rgba(112, 112, 112, 0.5)"
              value={ein}
              keyboardType='phone-pad'
            />


            <Text style={styles.inputSubHeading}>
              If you use your Social Security number for your Organizations tax
              purposes, you can enter that instead
            </Text>

            <View style={{ paddingVertical: 20 }} />
            <View style={{ alignSelf: 'center' }}>
              <Btn
                label="Continue"
                onClick={continueClick.bind(this)}
                bgColor="#2C99C6"
              />
            </View>
          </View>
        </ScrollView >
      </View >
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
    width: wp('85'),
    color: '#707070',
    fontSize: wp('4'),
    fontFamily: FONTS.SFRegular,
    marginTop: 8,
    marginBottom: Platform.OS == 'android' ? 8 : 8,
  },
  inputHeading: {
    color: '#000000',
    fontSize: wp('4'),
    fontFamily: FONTS.SFBold,
    marginTop: Platform.OS == 'android' ? 10 : 18,
    marginBottom: Platform.OS == 'android' ? 10 : 18,
  },
  inputSubHeading: {
    color: '#707070',
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFRegular,
    marginTop: 8,
    marginBottom: Platform.OS == 'android' ? 8 : 8,
  },
  inputStyle: {
    width: wp('80'),
    height: 46,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#70707026',
    borderRadius: 4,
    color: '#000000',
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFRegular,
    paddingLeft: 13,
    marginBottom: 15,
    marginTop: -5
  },
});

export default organizationProviderDetailsEIN;
