/**
 * @format
 */
import React,{useEffect} from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Image } from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import Btn from '../../../common/meduimBtnSP';
import { FONTS, ICONS } from '../../../constant';
import Header from '../../../common/headerBLC';
import { getBadgeEnabled } from '../../../redux/user/user.action';



const reviewInformation = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token)

  useEffect(() => {
    dispatch(getBadgeEnabled(token))
    return () => {
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={props.navigation} label="Verification Badge" />
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%' }}  >
        <View style={{ width: '100%', alignItems: 'center' }} >
          <Image
            source={ICONS.reviewProfileIcon}
            style={{ width: wp('35'), height: wp('35'), alignSelf: 'center' }}
            resizeMode="contain"
          />
          <Text style={styles.headingStyle}>
            We are reviewing your information
          </Text>

          <Text style={styles.subHeading}>
            Thanks for sending us your info, our team is reviewing your ID, and
            we will let you know as soon as we are done
          </Text>

          <View style={{ paddingVertical: 50 }}></View>

          <View style={{ alignSelf: 'center' }}>
            <Btn
              label="OK"
              onClick={() => {
                props.navigation.navigate('userBottomTab');
              }}
              bgColor="#2C99C6"
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
    width: wp('70'),
    color: '#000000',
    fontSize: wp('7'),
    fontFamily: FONTS.SFBold,
    textAlign: 'center',
  },
  innerHeading: {
    width: wp('80'),
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
    textAlign: 'center',
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
