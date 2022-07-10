/**
 * @format
 */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

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
        label="Verified Provider"
        progressCount={0}
      />
      <Text style={styles.headingStyle}>Become a Verified Provider.</Text>
      <Text style={styles.subHeading}>
        As part of our commitment to Trust and Safety, we are always working on
        making our community as secure as possible for everyone. That's why,
        when becoming a Provider with Sporforya, we require a certain amount of
        information to help us verify the Organization or Individual
      </Text>

      <View style={{ paddingVertical: 5 }}></View>

      <Text style={styles.subHeading}>
        Individuals who become Providers are asked to confirm their identity by
        uploading a photo of a government ID.
      </Text>

      <Text style={styles.subHeading}>
        Organizations who become Providers are asked to confirm their identity
        by entering their legal entity credentials and EIN{' '} {''} {''} {''}                                   {''}
        <Text>Refer to our </Text>
        <Text
          onPress={() => { props.navigation.navigate("support") }}
          style={{
            textDecorationColor: '#49a6ce',
            color: '#49a6ce',
            fontWeight: 'bold',
            textDecorationLine:'underline'
            
          }}>
          Support
        </Text>
        <Text> for further information </Text>
      </Text>

      <View style={{ paddingVertical: 20 }}></View>

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
    width: wp('80'),
    color: '#000000',
    fontSize: wp('7.5'),
    fontFamily: FONTS.SFBold,
    marginTop: Platform.OS == 'android' ? 18 : 28,
    fontWeight:'700',
   
  },
  subHeading: {
    width: wp('80'),
    color: '#707070',
    fontSize: wp('4'),
    fontFamily: FONTS.SFRegular,
    marginTop: 8,
    marginBottom: Platform.OS == 'android' ? 8 : 8,
    lineHeight:25
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
