/**
 * @format
 */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import Btn from '../../../common/meduimBtnSP';
import { FONTS, ICONS } from '../../../constant';
import { getBadgeEnabled } from '../../../redux/user/user.action';
import Header from './header';

const reviewInformation = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token)

  useEffect(() => {
    dispatch(getBadgeEnabled(token))
    return () => {

    }
  }, [])


  return (
    <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#F8FAFF' }} >
      <Header
        navigation={props.navigation}
        label="Verified Provider"
        progressCount={0}
      />
      <View style={styles.container}>
        <Image source={ICONS.reviewProfileIcon} style={{ width: wp('60'), height: wp('30'), alignSelf: 'center', marginBottom: 25 }} resizeMode='stretch' />
        <Text style={styles.headingStyle}>We are reviewing your information</Text>

        <Text style={styles.subHeading}>
          Thanks for sending us your info, our team is reviewing your ID, and we
          will let you know as soon as we are done
        </Text>

        <View style={{ paddingVertical: 50 }}></View>

        <View style={{ alignSelf: 'center' }}>
          <Btn
            label="OK"
            onClick={() => {
              props.navigation.navigate('bottomTab');
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
    flex: 0.8,
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
  innerHeading: {
    width: wp('70'),
    color: '#000000',
    fontSize: wp('5'),
    fontFamily: FONTS.SFBold,
    marginTop: Platform.OS == 'android' ? 12 : 19,
  },
  subHeading: {
    width: wp('70'),
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

export default reviewInformation;
