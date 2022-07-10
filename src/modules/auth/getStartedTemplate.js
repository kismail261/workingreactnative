import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {FONTS, ICONS} from '../../constant';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  loginByFacebook,
  loginByGoogle,
  setCurrentUser,
  setUserDetail,
} from '../../redux/user/user.action';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from '../../helpers/replaceDigitsWithAesteriks';
import {Divider} from './components/divider';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import TNIndicator from '../../common/TNIndicator';
import {setLoader} from '../../redux/loader/loader.action';

GoogleSignin.configure({
  iosClientId:
    '479328453795-6g32lq9o9vfnluih2eqo2n8p2mjl0s35.apps.googleusercontent.com',
  scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
  webClientId:
    '479328453795-989qqiob8q2ccoh3qjhc1jcevq4tpd9c.apps.googleusercontent.com',
  offlineAccess: true,
});
const SocialLoginTemp = ({social, img, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.socialButtonContainer}>
      <Image source={img} style={styles.socialButtonIcon} />
      <Text style={styles.socialButtonText}>Continue with {social}</Text>
    </TouchableOpacity>
  );
};

export const GetStartedTemplate = props => {
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader);

  useEffect(() => {
    dispatch(setUserDetail(null));
    dispatch(setCurrentUser(null));
    return () => {};
  }, [dispatch]);

  const googleSignIn = async () => {
    dispatch(setLoader(true));
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn()
      .then(data => {
        console.log(data);
        GoogleSignin.getTokens().then(res => {
          console.log('currentUser: ', res.accessToken);
          let data = {
            token: res.accessToken,
          };
          dispatch(loginByGoogle(data, props.navigation));
        });
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          showMessage(err.response.data.message, 'warning');
          console.log('googleSignIn: ', err.response.data);
        }
        console.log('error googleSignIn: ', err);
        dispatch(setLoader(false));
      });
  };

  const onFacebookButtonPress = async () => {
    dispatch(setLoader(true));
    LoginManager.logOut();
    await LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(async result => {
        const fbData = await AccessToken.getCurrentAccessToken();
        dispatch(loginByFacebook(fbData.accessToken, props.navigation));
        return true;
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          showMessage(err.response.data.message, 'warning');
        }
        console.log('onFacebookButtonPress: ', error);
        dispatch(setLoader(false));
      });
  };

  function onSigninPress() {
    props.navigation.navigate('login');
  }

  const onGuestBtnClick = () => {
    props.navigation.navigate('mainRoutes', {screen: 'userAppRoutes'});
  };
  return (
    <SafeAreaView style={[styles.mainContainer]}>
      <ImageBackground style={styles.bg} source={ICONS.images1}>
        <View>
          <View style={styles.headerContainer}>
            <Image
              source={ICONS.getstarted1}
              height={30}
              width={30}
              style={{marginVertical: 15}}
            />
            <Text style={styles.head}>Let's get started!</Text>
          </View>

          <View style={styles.btnContainer}>
            <SocialLoginTemp
              social="Facebook"
              img={ICONS.facebookIcon}
              onPress={onFacebookButtonPress}
            />
            <SocialLoginTemp
              social="Google"
              img={ICONS.googleIcon}
              onPress={googleSignIn}
            />
            <View style={styles.divider1}>
              <Divider text="OR" />
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('register')}
              style={styles.btnEmail}>
              <Text style={styles.txtEmail}>Continue with Email</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.termsContainer}>
            <Text style={styles.tosText}>By continuing, you agree to our</Text>

            <View style={{flexDirection: 'row', marginTop: 5}}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Terms')}>
                <Text
                  style={[styles.tosText, {textDecorationLine: 'underline'}]}>
                  Terms of Service
                </Text>
              </TouchableOpacity>

              <Text style={styles.tosText}> and our </Text>

              <TouchableOpacity
                onPress={() => props.navigation.navigate('PrivacyPolicy')}>
                <Text
                  style={[styles.tosText, {textDecorationLine: 'underline'}]}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={[styles.tosCont2]}>
          <Text style={styles.tosText}>Already have an account? </Text>

          <TouchableOpacity onPress={onSigninPress}>
            <Text style={[styles.txtSignIn, styles.tosText]}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {loader ? <TNIndicator /> : null}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  btnContainer: {
    marginVertical: 20,
    width: '80%',
  },
  termsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  width100: {
    width: '100%',
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  bg: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headView: {
    width: '90%',
    marginTop: hp('2%'),
  },
  head: {
    fontSize: wp('8'),
    color: 'white',
    fontFamily: FONTS.SFBold,
    textAlign: 'center',
  },
  txt: {
    fontSize: wp('4.5'),
    color: 'white',
    fontFamily: FONTS.SFRegular,
    textAlign: 'center',
  },
  guestText: {
    color: '#FFFFFF',
    fontFamily: FONTS.SFRegular,
    fontWeight: '700',
    fontSize: wp('3.5'),
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  tosText: {
    fontSize: wp('3.5'),
    color: 'white',
    fontFamily: FONTS.SFRegular,
  },
  tosCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btnEmail: {
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#65C51F',
    marginVertical: 7,
    justifyContent: 'center',
  },
  txtEmail: {
    color: 'white',
    fontFamily: FONTS.SFBold,
    fontSize: wp('3.5'),
  },
  txtSignIn: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  btnSocial: {
    height: 45,
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    // justifyContent: 'center',
    marginVertical: 5,
  },
  imgSocial: {
    width: wp('5.5'),
    height: wp('5.5'),
    marginTop: '1%',
    marginLeft: wp(6),
  },
  txtSocial: {
    color: 'black',
    fontFamily: FONTS.SFBold,
    fontSize: wp('3.5'),
    width: '65%',
    marginLeft: wp(6),
  },
  tosCont2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('5'),
    marginBottom: 8,
    width: '80%',
    position: 'absolute',
    bottom: 45,
  },
  socialContainer: {
    width: '80%',
    marginTop: hp('2.5'),
  },
  socialButtonContainer: {
    height: 46,
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    // justifyContent: 'center',
    marginVertical: 5,
  },
  socialButtonIcon: {
    width: wp('5.5'),
    height: wp('5.5'),
    marginTop: '1%',
    marginLeft: wp(6),
  },
  socialButtonText: {
    color: 'black',
    fontFamily: FONTS.SFBold,
    fontSize: wp('3.5'),
    width: '65%',
    marginLeft: wp(6),
  },
  divider1: {
    width: '100%',
    marginTop: hp('4'),
  },
  divider2: {
    width: '80%',
    marginTop: hp('2'),
  },
  emailButtonView: {
    width: '80%',
    marginTop: hp('1.5'),
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: '#65C51F',
  },
  emailButtonContainer: {
    width: '88%',
    height: 43,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  continue: {
    width: '90%',
    marginTop: hp('17'),
    alignItems: 'center',
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
  account: {
    width: '80%',
    marginTop: hp('5'),
    marginBottom: 8,
  },
  accountText: {
    fontSize: wp('4.5'),
    fontFamily: FONTS.SFRegular,
  },
});
