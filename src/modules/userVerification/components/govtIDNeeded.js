/**
 * @format
 */
import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Btn from '../../../common/meduimBtnSP';
import { FONTS, ICONS, } from '../../../constant';
import Header from '../../../common/headerBLC';

const govtIdNeeded = props => {
  const imgDetail = props.route.params.imgData
  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={props.navigation}
        label="Verification Badge"
      />
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%' }}  >
        <View style={{ width: '100%', alignItems: 'center' }} >
          <Image source={ICONS.veiriedProvider} style={{ width: wp('40'), height: wp('40'), top: wp('10'), bottom: wp('10'), alignSelf: 'center' }} />
          <Text style={styles.headingStyle}>Government ID needed</Text>
          <Text style={styles.subHeading}>
            It looks like there might not be a government ID in the photo. Do you
            want to continue?
          </Text>
          <View style={{ paddingVertical: 20 }}></View>
          <View style={{ alignSelf: 'center' }}>
            <Btn
              label="Yes, I took a photo of an ID"
              bgColor="#21d17f"
              onClick={() => {
                props.navigation.navigate('verify', { type: 'front', imgData: imgDetail })
              }}
            />
          </View>
          <View style={{ paddingVertical: 10 }}></View>
          <View style={{ alignSelf: 'center' }}>
            <Btn
              label="No, I want to try again"
              bgColor="#2c99c6"
              onClick={() => {
                props.navigation.goBack()
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
  },
  headingStyle: {
    width: wp('82'),
    color: '#000000',
    fontSize: wp('6.5'),
    fontFamily: FONTS.SFBold,
    marginTop: Platform.OS == 'android' ? 18 : 28,
  },
  innerHeading: {
    width: wp('82'),
    color: '#000000',
    fontSize: wp('5'),
    fontFamily: FONTS.SFBold,
    marginTop: Platform.OS == 'android' ? 12 : 19,
  },
  subHeading: {
    width: wp('82'),
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

export default govtIdNeeded;
