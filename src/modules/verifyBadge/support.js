/**
 * @format
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Btn from '../../common/meduimBtnSP';
import { FONTS } from '../../constant';
import Header from '../../common/header';

const support = props => {


  return (
    <ScrollView >
      <View style={styles.container} >
        <Header
          label="Support"
        />
        <Text style={styles.headingStyle}>Verify Identity</Text>

        <Text style={styles.innerHeading}>
          How Sporforya verfies your identity.
        </Text>

        <Text style={styles.subHeading}>
          When you are asked to confirm your identity, you'll need to add either
          your legal name and address, or a photo of a government ID (driver's
          license, passport, or national identity card). This is in addition to
          the verification our partner Stripe requires when verifying your
          payments
        </Text>

        <View style={{ paddingVertical: 5 }}></View>

        <Text style={styles.boldSubHeading}>
          You ID must be valid, if you're under 18, or your ID doesn't appear to
          be valid, you won't be able to book a listing requiring an ID. If you're
          under 18, all current reservations will also be canceled.
        </Text>

        <View style={{ paddingVertical: 5 }}></View>

        <Text style={styles.subHeading}>
          You may have a few options for confirming your identity:
        </Text>

        <Text style={styles.boldSubHeading}>
          Upload an existing photo of your ID
        </Text>
        <Text style={styles.boldSubHeading}>
          Add your legal first and last name
        </Text>

        <View style={{ alignSelf: 'center' }}>
          <Btn
            label="Back"
            onClick={() => {
              props.navigation.goBack()
            }}
            bgColor="#2C99C6"
          />
        </View>
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
    width: wp('85'),
    color: '#000000',
    fontSize: wp('6.5'),
    fontFamily: FONTS.SFBold,
    marginTop: Platform.OS == 'android' ? 18 : 28,
  },
  innerHeading: {
    width: wp('85'),
    color: '#000000',
    fontSize: wp('5'),
    fontFamily: FONTS.SFBold,
    marginTop: Platform.OS == 'android' ? 12 : 19,
  },
  subHeading: {
    width: wp('85'),
    color: '#707070',
    fontSize: wp('4'),
    fontFamily: FONTS.SFRegular,
    marginTop: 8,
    marginBottom: Platform.OS == 'android' ? 8 : 8,
  },
  boldSubHeading: {
    width: wp('85'),
    color: '#707070',
    fontSize: wp('4'),
    fontFamily: FONTS.SFBold,
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

export default support;
