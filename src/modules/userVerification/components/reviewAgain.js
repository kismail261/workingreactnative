/**
 * @format
 */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { FONTS, ICONS } from '../../../constant';
import Header from '../../profileSetup/components/header';

const reviewAgain = props => {

  useEffect(() => {
    // setTimeout(() => {
    //   props.navigation.navigate("userBottomTab")
    // }, 200);
    return () => {

    }
  }, [])
  return (
    <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#F8FAFF' }}  >
      <Header
        navigation={() => props.navigation.goBack()}
        label="Verified Provider"
        progressCount={0}
      />
      <View style={styles.container} >

        <Image source={ICONS.reviewProfileIcon} style={{ width: wp('60'), height: wp('30'), alignSelf: 'center', marginBottom: 25 }} resizeMode='stretch' />
        <Text style={styles.headingStyle}>We are still reviewing your ID</Text>

        <Text style={styles.subHeading}>
          This will be done soon. We will let you know if there is anything else
          we need
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingStyle: {
    width: wp('70'),
    color: '#000000',
    fontSize: wp('7'),
    fontFamily: FONTS.SFBold,
  },
  subHeading: {
    width: wp('70'),
    color: '#707070',
    fontSize: wp('4'),
    fontFamily: FONTS.SFRegular,
    marginTop: 8,
    marginBottom: Platform.OS == 'android' ? 8 : 8,
  },
});

export default reviewAgain;
