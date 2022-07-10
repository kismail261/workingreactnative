/**
 * @format
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker'
import Btn from '../../../common/meduimBtnSP';
import { FONTS } from '../../../constant';
import { Dropdown } from '../../../common/dropDown';
import Header from './header';
import moment from 'moment';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';


const individualContactDetailsDOB = props => {
  const apiData = props.route.params.apiData
  const [dob, setDOB] = useState(new Date())
  const [ssn, setSSN] = useState('')
  const [city, setCity] = useState('')
  const [stateInfo, setStateInfo] = useState('')
  const [line1, setLine1] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [gender, setGender] = useState('Select')
  const [open, setOpen] = useState(false)

  const getDOB = value => {
    const x = new Date(value).setHours(0, 0, 0, 0);
    const y = new Date().setHours(0, 0, 0, 0);
    if (y < x) {
      showMessage("Date of birth should be less than current date")
    } else {
      setDOB(value)
    }
  };

  const onContinue = () => {
    const x = new Date(dob).setHours(0, 0, 0, 0);
    const y = new Date().setHours(0, 0, 0, 0);
    if (gender == 'Select') {
      showMessage("Please select gender")
    } else if (y < x) {
      showMessage("Date of birth should be less than current date")
    } else if (city == '') {
      showMessage("City field should not be blank")
    } else if (stateInfo == '') {
      showMessage("State field should not be blank")
    } else if (line1 == '') {
      showMessage("Line field should not be blank")
    } else if (postalCode == '') {
      showMessage("Postal code should not be blank")
    } else if (ssn == '') {
      showMessage("SSN should not be blank")
    } else {
      let data = {
        country: apiData.country,
        phone: apiData.phone,
        email: apiData.email,
        businessWebUrl: apiData.businessWebUrl,
        firstName: apiData.firstName,
        lastName: apiData.lastName,
        gender: gender,
        dob: moment(dob).format(''),
        city: city,
        state: stateInfo,
        line1: line1,
        postal_code: postalCode,
        ssnNumber: ssn,
      }
      props.navigation.navigate('payoutDetails', { apiData: data });
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
          progressCount={0.25}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, width: '100%' }} >
          <View style={{ alignSelf: 'center' }} >
            <Text style={styles.headingStyle}>Individual Provider Details</Text>
            <Text style={styles.subHeading}>
              Tell us a few details about yourself and your services
            </Text>
            <Text style={styles.inputHeading}>Gender</Text>
            <View style={{ width: wp('80'), marginTop: 0 }}>
              <Dropdown
                name={gender}
                data={['Male', 'Female']}
                getValue={setGender.bind(this)}
              />
            </View>
            <Text style={styles.inputHeading}>Date of Birth</Text>
            <TouchableOpacity style={{
              width: wp('80%'),
              height: 46,
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#70707026',
              justifyContent: 'center',
              paddingLeft: 10,
              borderRadius: 4
            }} onPress={() => setOpen(true)}>
              <Text style={{
                color: '#000000',
                fontSize: wp('3.5'),
                fontFamily: FONTS.SFRegular,
              }} >
                {moment(dob).format("DD / MM / YY")}
              </Text>
            </TouchableOpacity>

            <Text style={styles.inputHeading}>
              City
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={value => setCity(value)}
              placeholder={"City"}
              placeholderTextColor="rgba(112, 112, 112, 0.5)"
              value={city}
            />
            <Text style={styles.inputHeading}>
              State
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={value => setStateInfo(value)}
              placeholder={"State"}
              placeholderTextColor="rgba(112, 112, 112, 0.5)"
              value={stateInfo}
            />

            <Text style={styles.inputHeading}>
              Line1
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={value => setLine1(value)}
              placeholder={"Line1"}
              placeholderTextColor="rgba(112, 112, 112, 0.5)"
              value={line1}
            />

            <Text style={styles.inputHeading}>
              Postal Code
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={value => setPostalCode(value)}
              placeholder={"Postal code"}
              placeholderTextColor="rgba(112, 112, 112, 0.5)"
              value={postalCode}
              keyboardType='phone-pad'
            />

            <Text style={styles.inputHeading}>
              Last 4 digits of Social Security number
            </Text>
            <TextInput
              maxLength={4}
              style={styles.inputStyle}
              onChangeText={value => setSSN(value)}
              placeholder={"… - … - 8888"}
              placeholderTextColor="rgba(112, 112, 112, 0.5)"
              value={ssn}
              keyboardType='phone-pad'
            />

            <View style={{ paddingVertical: 20 }} />
            <View style={{ marginBottom: Platform.OS == 'ios' ? 15 : 5 }}>
              <Btn
                label="Continue"
                onClick={onContinue}
                bgColor="#2C99C6"
              />
            </View>
            <DatePicker
              modal
              mode="date"
              open={open}
              date={dob}
              onConfirm={(date) => {
                setOpen(false)
                getDOB(date)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />
          </View>
        </ScrollView>
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
    marginTop: Platform.OS == 'android' ? 5 : 10,
    marginBottom: Platform.OS == 'android' ? 5 : 10,
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
  },
});

export default individualContactDetailsDOB;
