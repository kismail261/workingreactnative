/**
 * @format
 */
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Btn from '../../../common/meduimBtnSP';
import { FONTS, ICONS } from '../../../constant';
import CustomInputField from './customInputField';
import CustomInputFieldTextArea from './customInputFieldTextArea';
import Header from './header';


const individualContactDetailsService = props => {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [web, setWeb] = useState('')

  const getFName = (value) => {
    setFname(value)
  }

  const getLName = (value) => {
    setLname(value)
  }
  const getWeb = (value) => {
    setWeb(value)
  }

  return (
    <View style={styles.container} >
      <Header
        navigation={props.navigation}
        label="Payout Method"
        progressCount={0.25}
      />
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{ width:'92%', marginBottom: 15, alignSelf:'center' }} >
          <Text style={styles.headingStyle}>Individual Provider Details</Text>
          <Text style={styles.subHeading}>
            Tell us a few details about yourself and your services
          </Text>

          <Text style={styles.inputHeading}>Legal Name of Individual</Text>
          <Text style={styles.inputSubHeading}>
            The name you provide must match the account holder name on your bank
            account or card
          </Text>

          <CustomInputField value={fname} getValue={getFName.bind(this)}  />
          <CustomInputField value={lname} getValue={getLName.bind(this)} />

          <View style={{ padding: 1 }} />

          <Text style={styles.inputHeading}>Website</Text>
          <Text style={styles.inputSubHeading}>
            In a few sentences, describe your services, your customers, and when you
            charge your customers (e.g. during checkout, one day after a service
            etc.). Or, if you have a website,{' '}
            <Text
              style={{
                textDecorationColor: '#49a6ce',
                color: '#49a6ce',
                fontWeight: 'bold',
              }}>
              provide your website instead
            </Text>
          </Text>

          <CustomInputFieldTextArea value={web} getValue={getWeb.bind(this)} />

          <View style={{ paddingVertical: 20 }} />
          <View style={{ alignSelf: 'center' }}>
            <Btn
              label="Continue"
              onClick={() => {
                props.navigation.navigate("individualProviderDetailsDOB")
              }}
              bgColor="#2C99C6"
            />
          </View>
        </View>
      </ScrollView>
    </View>

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

export default individualContactDetailsService;
