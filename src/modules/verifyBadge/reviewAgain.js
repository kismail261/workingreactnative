/**
 * @format
 */
import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Image } from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { FONTS, ICONS } from '../../constant';
import Header from '../../common/headerBLC';

const reviewAgain = props => {

  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate("bottomTab")
    }, 200);
    return () => {

    }
  }, [])

  return (
    <ScrollView >
      <SafeAreaView style={styles.container} >
        <Header
          navigation={props.navigation}
          label="Verification Badge"
        />
        <Image source={ICONS.reviewProfileIcon} style={{ width: wp('35'), height: wp('35'), alignSelf: 'center' }} resizeMode="contain" />
        <Text style={styles.headingStyle}>We are still reviewing your ID</Text>

        <Text style={styles.subHeading}>
          This will be done soon. We will let you know if there is anything else
          we need
        </Text>
      </SafeAreaView>
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
    width: wp('70'),
    color: '#000000',
    fontSize: wp('7'),
    fontFamily: FONTS.SFBold,
  },
  subHeading: {
    width: wp('75'),
    color: '#707070',
    fontSize: wp('4'),
    fontFamily: FONTS.SFRegular,
    marginTop: 8,
    marginBottom: Platform.OS == 'android' ? 8 : 8,
  },
});

export default reviewAgain;
