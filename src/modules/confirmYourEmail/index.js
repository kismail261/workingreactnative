import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, Platform} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS, ICONS} from '../../constant';
import LargeBtn from '../../common/largeBtnSP';
import {useDispatch, useSelector} from 'react-redux';
import {setAuthToken, setCurrentUser} from '../../redux/user/user.action';
import {showMessage} from '../../helpers/replaceDigitsWithAesteriks';

const ConfirmYourEmail = props => {
  const [responce, setResponce] = useState('');
  const {currentUser} = useSelector(state => state.user);
  const {email, user, access_token} = props.route.params;

  const dispatch = useDispatch();

  const btnClick = async () => {
    let resp = await getEmailconfirmation();
    let isVerified = resp.isEmailVerified;
    // console.log(currentUser._id)
    // console.log(responce)
    if (isVerified == true) {
      dispatch(setCurrentUser(user));
      dispatch(setAuthToken(access_token));

      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'mainRoutes'}],
        }),
      );
    } else {
      showMessage('Please confirm you email first');
    }
    // props.navigation.navigate("becomeProvider")
    // 624a24de4a28179f29ab39a8
  };

  const getEmailconfirmation = async () => {
    try {
      const response = await fetch(
        'https://api2.sporforya.com//api/users/me/' + user._id,
        // 'https://api2.sporforya.com/api/auth/email-confirm'
      );
      const json = await response.json();
      setResponce(json.isEmailVerified);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={[COLORS.G1Color, COLORS.G3Color, COLORS.G2Color]}
      style={styles.container}>
      <View />
      <View style={{alignItems: 'center'}}>
        <Image
          source={ICONS.emailIcon}
          style={{width: wp('35'), height: wp('30')}}
          resizeMode={'contain'}
        />
        <Text style={styles.headingStyle}>Confirm Your Email</Text>
        <Text style={styles.descStyle}>
          We sent an email to {email}. Please click the link in the message to
          confirm your email.
        </Text>
      </View>
      <View style={{bottom: Platform.OS == 'ios' ? 30 : 0}}>
        <LargeBtn
          label="OK"
          onClick={() => {
            btnClick();
          }}
          bgColor="#65C51F"
        />
      </View>
    </LinearGradient>
  );
};

export default ConfirmYourEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
  },
  headingStyle: {
    color: '#FFFFFF',
    fontSize: wp('6'),
    fontFamily: FONTS.SFBold,
    marginTop: 25,
  },
  descStyle: {
    width: wp('65'),
    color: '#FFFFFF',
    fontSize: wp('4'),
    fontFamily: FONTS.SFRegular,
    marginTop: 13,
    textAlign: 'center',
  },
});
