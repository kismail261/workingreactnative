/**
 * @format
 */
import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Btn from '../../../common/meduimBtnSP';
import { FONTS, } from '../../../constant';
import Header from './header';


const verificationSummaryBank = props => {

  return (
    <ScrollView>
      <View style={styles.container} >
        <Header
          navigation={props.navigation}
          label="Payout Method"
          progressCount={0.25}
        />
        <Text style={styles.headingStyle}>Verification Summary</Text>
        <Text style={styles.subHeading}>
          You're almost ready to start getting paid by Sporforya. Please confirm
          your information below.
        </Text>
        <Text style={styles.inputHeading}>Provider Details</Text>
        <View style={{ paddingVertical: 5 }} />
        <View style={styles.verificationInput}>
          <Text style={styles.verificationInputText}>Your Organization name</Text>
          <View style={styles.buttonCheckMark}>
            <Text style={styles.checkMarkText}></Text>
          </View>
        </View>
        <View style={{ paddingVertical: 5 }} />
        <View style={styles.verificationInput}>
          <View>
            <Text style={styles.verificationInputText}>
              Your Organization name
            </Text>
            <Text style={styles.verificationInputSubText}>Account Holder</Text>
          </View>
          <View style={styles.buttonCheckMark}>
            <Text style={styles.checkMarkText}></Text>
          </View>
        </View>

        <Text style={styles.inputHeading}>Payout Details</Text>
        <View style={{ paddingVertical: 5 }} />

        <View style={styles.verificationInput}>
          <View>
            <Text style={styles.verificationInputText}>STRIPE TEST BANK</Text>
            <Text style={styles.verificationInputSubText}>
              1100000000 **** 6789
            </Text>
          </View>
          <View style={styles.buttonCheckMark}>
            <Text style={styles.checkMarkText}></Text>
          </View>
        </View>

        <Text style={styles.inputSubHeading}>
          By clicking Done, you agree to the Connected Account Agreement, to
          receiving autodialled text messages from Stripe, and you certify that
          the information you have provided to Stripe is complete and correct.
          Stripe Inc. is a registered ISO of Wells Fargo Bank, N.A., Concord, CA
        </Text>

        <View style={{ paddingVertical: 20 }} />
        <View style={{ alignSelf: 'center' }}>
          <Btn
            label="Continue"
            onClick={() => {
              props.navigation.navigate("bottomTab")
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
  verificationInput: {
    width: wp('80'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: 1,
    height: 55,
  },
  verificationInputText: {
    paddingLeft: 20,
    fontFamily: FONTS.SFRegular,
    color: 'black',
  },
  verificationInputSubText: {
    fontFamily: FONTS.SFRegular,
    paddingLeft: 20,
    color: 'gray',
  },
  buttonCheckMark: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#65c51f',
    marginRight: 10,
  },
  checkMarkText: {
    color: 'white',
  },
});

export default verificationSummaryBank;
