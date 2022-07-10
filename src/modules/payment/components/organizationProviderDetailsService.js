/**
 * @format
 */
import React, {useRef} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import MultiSelect from 'react-native-multiple-select';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Btn from '../../../common/meduimBtnSP';
import {FONTS, ICONS} from '../../../constant';
import CustomInputField from './customInputField';
import CustomInputFieldTextArea from './customInputFieldTextArea';


const organizationProviderDetailsService = props => {
  
  return (
    <ScrollView style={styles.contentContainer}>
      <Text style={styles.headingStyle}>Organization Provider Details</Text>
      <Text style={styles.subHeading}>
        Tell us a few details about yourself and your services
      </Text>

      <Text style={styles.inputHeading}>Legal Name of Organization</Text>
      <Text style={styles.inputSubHeading}>
        The name you provide should exactly match the name associated with your
        Employer Identification Number (EIN)
      </Text>

      <CustomInputField value="Business Name" />

      <View style={{padding: 1}} />

      <Text style={styles.inputHeading}>Doing business as (Optional)</Text>
      <Text style={styles.inputSubHeading}>
        The trading name of your Organization, if it's different to the legal
        name
      </Text>

      <CustomInputField value="DBA trading name" />

      <View style={{padding: 1}} />

      <Text style={styles.inputHeading}>Service Description</Text>
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

      <CustomInputFieldTextArea value="Service Description" />

      <View style={{paddingVertical: 20}} />
      <View style={{alignSelf: 'center'}}>
        <Btn
          label="Continue"
          onClick={() => {
            props.nextStep();
          }}
          bgColor="#2C99C6"
        />
      </View>
    </ScrollView>
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
  },
  inputSubHeading: {
    color: '#707070',
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFRegular,
    marginTop: 8,
    marginBottom: Platform.OS == 'android' ? 8 : 8,
  },
});

export default organizationProviderDetailsService;
