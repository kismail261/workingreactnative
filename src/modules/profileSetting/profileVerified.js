/**
 * @format
 */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { FONTS, ICONS } from '../../constant';
import Header from './components/headerCross';
import Btn from '../../common/largeBtnSP'

const profileVerified = props => {

  useEffect(() => {
    return () => {

    }
  }, [])

  return (

    <View style={styles.container} >
      <Header
        navigation={props.navigation}
        label="Verified Provider"
      />
      <View style={styles.contentContainer} >
        <Image source={ICONS.ladyIcon} style={{ width: wp('35'), height: wp('35'), alignSelf: 'center' }} resizeMode="contain" />
        <Text style={styles.headingStyle}>Profile Verified</Text>
        <Text style={styles.subHeading}>
          Your profile has been verified, and your listings have our Verified Badge
        </Text>
      </View>

      <View style={styles.btnContainer} >
        <Btn label="OK" bgColor="#2C99C6" onClick={() => { }} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
  },
  contentContainer: {
    width: wp('90'),
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingStyle: {
    width: wp('70'),
    color: '#000000',
    fontSize: wp('7'),
    fontFamily: FONTS.SFBold,
    textAlign: 'center',
    marginTop: 10
  },
  subHeading: {
    width: wp('75'),
    color: '#707070',
    fontSize: wp('4'),
    fontFamily: FONTS.SFRegular,
    marginTop: 8,
    marginBottom: Platform.OS == 'android' ? 8 : 8,
    textAlign: 'center'
  },
  btnContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 45
  },
});

export default profileVerified;
