import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {ICONS, FONTS} from '../../constant';
import Btn from '../../common/meduimBtnSP';
import {useSelector} from 'react-redux';
import {replacePhoneNumbers} from '../../helpers/replaceDigitsWithAesteriks';

const noConfirmed = props => {
  const phoneNo = props.route.params.phoneNo;
  const chooseType = useSelector(state => state.loader.chooseType);
  const nextBtnClick = () => {
    props.navigation.navigate(
      chooseType == 'Organization' ? 'orgLocationIinfo' : 'locationIinfo',
    );
  };

  return (
    <View style={styles.container}>
      <View style={{height: wp('20')}} />
      <Image source={ICONS.confirmedIcon} style={styles.iconStyle} />
      <View style={{height: wp('10')}} />
      <Text style={styles.heading}>Confirmed!</Text>
      <View style={{height: wp('7')}} />
      <Text style={styles.subHeadingStyle}>
        Your phone number {replacePhoneNumbers(phoneNo)} has been confirmed
        successfully.
      </Text>
      <View style={{height: wp('40')}} />
      <Btn
        label="Continue"
        onClick={() => {
          nextBtnClick();
        }}
        bgColor="#2C99C6"
      />
    </View>
  );
};

export default noConfirmed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    width: wp('35'),
    height: wp('35'),
  },
  heading: {
    color: '#000000',
    fontSize: wp('6'),
    fontFamily: FONTS.SFSemiBold,
  },
  subHeadingStyle: {
    width: wp('80'),
    color: '#000000',
    fontSize: wp('4.5'),
    fontFamily: FONTS.SFRegular,
    textAlign: 'center',
  },
});
