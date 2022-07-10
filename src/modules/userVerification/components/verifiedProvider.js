/**
 * @format
 */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import Btn from '../../../common/meduimBtnSP';
import { FONTS } from '../../../constant';
import { getBadgeEnabled } from '../../../redux/user/user.action';
import Header from './header';


const verifiedProvider = props => {
  const dispatch = useDispatch();
  const badgeEnabled = useSelector(state => state.user.badgeEnabled)
  const token = useSelector(state => state.user.token)

  useEffect(() => {
    dispatch(getBadgeEnabled(token))
    return () => {
    }
  }, [])

  const onContinueClick = () => {
    if (badgeEnabled == "pending") {
      props.navigation.navigate("front");
    } else {
      props.navigation.navigate("reviewAgain");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header
        navigation={props.navigation}
        label="Verification Badge"
        progressCount={0}
      />
      <Text style={styles.headingStyle}>Get your Verification Badge</Text>
      <Text style={styles.subHeading}>
        As part of our commitment to Trust and Safety, we are always working on making our community as secure as possible for everyone. That's why when joining Sporforya, we ask for a certain amount of information to help us verify your identification.
      </Text>

      <View style={{ paddingVertical: 5 }}></View>

      <Text style={styles.subHeading}>
        All individuals using Sporforya are asked to confirm their identity by uploading a photo of a Government issued ID (ex: Drivers License).
      </Text>

      <Text style={styles.subHeading}>
        Thank you! 
      </Text>
      <Text style={styles.subHeading}>
        For more info visit our{' '}
        <Text
          onPress={() => { props.navigation.navigate("support") }}
          style={{
            textDecorationColor: '#49a6ce',
            color: '#49a6ce',
            fontWeight: 'bold',
          }}>
          Support Center
        </Text>
      </Text>

      <View style={{ height: Platform.OS == 'ios' ? hp('40') : hp('22') }} />

      <View style={{ alignSelf: 'center' }}>
        <Btn
          label="Continue"
          onClick={onContinueClick}
          bgColor="#2C99C6"
        />
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
    width: wp('82'),
    color: '#000000',
    fontSize: wp('6.5'),
    fontFamily: FONTS.SFBold,
    marginTop: Platform.OS == 'android' ? 18 : 28,
  },
  subHeading: {
    width: wp('82'),
    color: '#707070',
    fontSize: wp('4'),
    fontFamily: FONTS.SFRegular,
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

export default verifiedProvider;
