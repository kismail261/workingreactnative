/**
 * @format
 */
import React, { useRef, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Platform,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Btn from '../../../common/meduimBtnSP';
import TNActivityIndicator from '../../../common/TNIndicator';
import { FONTS } from '../../../constant';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';
import CustomInputField from './customInputField';
import CustomInputFieldTextArea from './customInputFieldTextArea';
import Header from './header';


const individualContactDetails = props => {
  const apiData = props.route.params.apiData
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [web, setWeb] = useState('');
  const [detail, setDetail] = useState('');
  const [isWebsite, setIsWebsite] = useState(true);
  const [loader, setLoader] = useState(false);


  const getFName = value => {
    setFname(value);
  };

  const getLName = value => {
    setLname(value);
  };
  const getWeb = value => {
    setWeb(value);
  };
  const getDetail = value => {
    setDetail(value);
  };

  const onContinue = () => {
    if (fname == '') {
      showMessage("First name field should not be blank")
    } else if (lname == '') {
      showMessage("Last name field should not be blank")
    } else if (web == '' && detail == '') {
      showMessage("Should provide website url/service detail")
    } else {
      let data = {
        country: apiData.country,
        phone: apiData.phone,
        email: apiData.email,
        firstName: fname,
        lastName: lname,
        businessWebUrl: isWebsite ? web : detail
      }
      props.navigation.navigate('individualProviderDetailsDOB', { apiData: data });
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: '100%', alignItems: 'center' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
      <View style={styles.container}>
        <Header
          navigation={props.navigation}
          label="Payout Method"
          progressCount={0.55}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.headingStyle}>Individual Provider Details</Text>
            <Text style={styles.subHeading}>
              Tell us a few details about yourself and your services
            </Text>

            <Text style={styles.inputHeading}>Legal Name of Individual</Text>
            <Text style={styles.inputSubHeading}>
              The name you provide must match the account holder name on your bank
              account or card
            </Text>

            <CustomInputField
              value={fname}
              getValue={getFName.bind(this)}
              placeholder="First Name"
            />
            <CustomInputField
              value={lname}
              getValue={getLName.bind(this)}
              placeholder="Last Name"
            />

            <View style={{ padding: 1 }} />
            {
              isWebsite
                ?
                <>
                  <Text style={styles.inputHeading}>Website</Text>
                  <Text onPress={() => setIsWebsite(false)} style={[styles.inputSubHeading]}>
                    No website? You can share an app store link, social media profile,
                    or{' '} <Text
                      onPress={() => setIsWebsite(false)}
                      style={{
                        textDecorationColor: '#49a6ce',
                        color: '#49a6ce',
                        textDecorationLine: 'underline',
                        fontFamily: FONTS.SFMedium,
                        fontSize: wp('3.5'),
                      }}>
                      add a description instead
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
                  <Text onPress={() => setIsWebsite(true)} style={[styles.inputSubHeading]}>
                    In a few sentences, describe your services, your customers,
                    and when you charge your customers (e.g., during checkout, one day after a service, etc.).
                    Or, if you have a website,{' '}
                    <Text
                      onPress={() => setIsWebsite(true)}
                      style={{
                        textDecorationColor: '#49a6ce',
                        color: '#49a6ce',
                        textDecorationLine: 'underline',
                        fontFamily: FONTS.SFMedium,
                        fontSize: wp('3.5'),
                      }}>
                      provide your website instead
                    </Text>
                  </Text>
                  <CustomInputFieldTextArea
                    value={detail}
                    getValue={getDetail.bind(this)}
                  />
                </>
            }
            <View style={{ paddingVertical: 20 }} />
            <View style={{ alignSelf: 'center' }}>
              <Btn
                label="Continue"
                onClick={onContinue}
                bgColor="#2C99C6"
              />
            </View>
          </View>
        </ScrollView>
        {
          loader
            ?
            <TNActivityIndicator />
            :
            null
        }
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
    marginBottom: Platform.OS == 'android' ? 12 : 18,
  },
});

export default individualContactDetails;
