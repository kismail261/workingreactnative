/**
 * @format
 */
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Btn from '../../../common/meduimBtnSP';
import { FONTS } from '../../../constant';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';
import CustomInputField from './customInputField';
import CustomInputFieldTextArea from './customInputFieldTextArea';
import Header from './header';

const organizationProviderDetails = props => {
  const apiData = props.route.params.apiData
  const [businessName, setBusinessName] = useState('')
  const [tradingName, setTradingName] = useState('')
  const [isWebsite, setIsWebsite] = useState(true);
  const [web, setWeb] = useState('')
  const [detail, setDetail] = useState('')

  const getBussinessName = (value) => {
    setBusinessName(value)
  }

  const getTradingName = (value) => {
    setTradingName(value)
  }
  const getWeb = (value) => {
    setWeb(value)
  }

  const getDetail = value => {
    setDetail(value);
  };

  const continueClick = () => {
    if (businessName == '') {
      showMessage("Business name field should not be blank")
    } else if (tradingName == '') {
      showMessage("Trading name field should not be blank")
    } 
    else if (web == '' && detail == '') {
      showMessage("Should provide website url/service detail")
    }
     else {
      let data = {
        country: apiData.country,
        phone: apiData.phone,
        email: apiData.email,
        businessName: businessName,
        tradingName: tradingName,
        web: isWebsite ? web : detail,
      }
      props.navigation.navigate('organizationProviderDetailsEIN', { apiData: data });
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
        <ScrollView contentContainerStyle={{ width: wp('100'), alignItems: 'center' }} >
          <View style={{ width: wp('85') }} >
            <Text style={styles.headingStyle}>Organization Provider Details</Text>
            <Text style={styles.subHeading}>
              Tell us some details about your Organization
            </Text>

            <Text style={styles.inputHeading}>Legal Name of Organization</Text>
            <Text style={styles.inputSubHeading}>
              The name you provide should exactly match the name associated with your
              Employer Identification Number (EIN)
            </Text>

            <CustomInputField
              value={businessName}
              placeholder={"Business Name"}
              getValue={getBussinessName.bind(this)}
            />

            <View style={{ padding: 1 }} />

            <Text style={styles.inputHeading}>Doing business as </Text>
            <Text style={styles.inputSubHeading}>
              The trading name of your Organization, if it's different to the legal
              name
            </Text>

            <CustomInputField
              value={tradingName}
              placeholder={"DBA trading name"}
              getValue={getTradingName.bind(this)}
            />

            <View style={{ padding: 1 }} />
            {
              isWebsite
                ?
                <>
                  <Text style={styles.inputHeading}>Organization website</Text>
                  <Text onPress={() => setIsWebsite(false)} style={styles.inputSubHeading}>
                    No website? You can share an app store link, social media profile,
                    or{' '}
                    <Text
                      onPress={() => setIsWebsite(false)}
                      style={{
                        textDecorationColor: '#49a6ce',
                        color: '#49a6ce',
                        fontWeight: 'bold',
                        textDecorationLine: 'underline',
                      }}>
                      add a service description instead
                    </Text>
                  </Text>
                  <CustomInputField
                    value={web}
                    getValue={getWeb.bind(this)}
                    placeholder="Enter your URL"
                  />
                </>
                :
                <>
                  <Text style={styles.inputHeading}>Service Description</Text>
                  <Text onPress={() => setIsWebsite(true)} style={styles.inputSubHeading}>
                    In a few sentences, describe your services, your customers,
                    and when you charge your customers (e.g., during checkout, one day after a service, etc.).
                    Or, if you have a website,{' '}
                    <Text
                      onPress={() => setIsWebsite(true)}
                      style={{
                        textDecorationColor: '#49a6ce',
                        color: '#49a6ce',
                        fontWeight: 'bold',
                        textDecorationLine: 'underline',
                      }}>
                      provide your website instead
                    </Text>
                  </Text>
                  <CustomInputFieldTextArea
                    placeholder={"Service description"}
                    value={detail}
                    getValue={getDetail.bind(this)}

                  />
                </>
            }

            <View style={{ paddingVertical: 20 }} />
            <View style={{ alignSelf: 'center', marginBottom: Platform.OS == 'ios' ? 15 : 8 }}>
              <Btn
                label="Continue"
                onClick={continueClick}
                bgColor="#2C99C6"
              />
            </View>
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
    marginBottom: Platform.OS == 'android' ? 12 : 18,
  },
});

export default organizationProviderDetails;
