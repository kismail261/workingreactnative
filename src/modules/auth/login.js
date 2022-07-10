import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FONTS, ICONS, ASYNC_STORAGE_KEY} from '../../constant';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import {ButtonRegular} from '../../common/buttonRegular';
import {CheckBox} from '../taxinformation/components/checkboxBox';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyTextinput} from '../../common/textinput';
import {userLogin} from '../../redux/user/user.action';
import TNIndicator from '../../common/TNIndicator';
import {setLoader} from '../../redux/loader/loader.action';
import {showMessage} from '../../helpers/replaceDigitsWithAesteriks';

const {AUTH_USER} = ASYNC_STORAGE_KEY;

export const Login = props => {
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const handleInitial = React.useCallback(async () => {
    try {
      // get user credentials from cache
      const user = await AsyncStorage.getItem(AUTH_USER);
      const {
        email: savedEmail,
        password: savedPassword,
        remember: savedRemember,
      } = JSON.parse(user) ?? {};
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRemember(savedRemember);
    } catch (error) {
      // Handle error
    }
  }, []);
  useEffect(() => {
    dispatch(setLoader(false));
    handleInitial();
    return () => {};
  }, [dispatch, handleInitial]);

  const getEmail = value => {
    let removeSpace = value.replace(/ /g, '');
    setEmail(removeSpace);
  };
  const getPassword = value => {
    setPassword(value);
  };

  const loginUser = async () => {
    let validate = await validateEmail();
    if (email === '') {
      showMessage('Please provide a username or password.', 'warning');
    } else if (!validate) {
      showMessage('Wrong email format', 'warning');
    } else if (password === '') {
      showMessage('Please provide a username or password.', 'warning');
    } else {
      dispatch(setLoader(true));
      let data = {
        email: email,
        password: password,
      };
      if (remember) {
        await AsyncStorage.setItem(
          AUTH_USER,
          JSON.stringify({...data, remember}),
        );
      }
      if (!remember) {
        await AsyncStorage.removeItem(AUTH_USER);
      }
      dispatch(userLogin(data, props.navigation));
      setEmail('');
      setPassword('');
    }
  };
  const validateEmail = async () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <KeyboardAvoidingView
      style={styles.main}
      behavior={Platform.OS === 'ios' ? 'height' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
      <ImageBackground style={styles.bg} source={ICONS.getStartedBG}>
        {/* <LinearGradient
        style={styles.linearGradient}
        colors={['#3B5998', '#0D6B93']} >*/}
        <ScrollView
          style={styles.width100}
          contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={[styles.navigationBack, styles.scrollView]}
            contentContainerStyle={styles.scrollViewContainer}>
            <Icon name="chevron-back-outline" color="white" size={25} />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image source={ICONS.signinLogo} style={styles.logo} />
          </View>
          <View style={styles.signin}>
            <Text style={styles.head}>Sign In</Text>
          </View>
          <View style={styles.emailContainer}>
            <Text style={styles.field}>Email address</Text>
            <MyTextinput
              value={email}
              onChangeText={getEmail.bind(this)}
              secureTextEntry={false}
            />
          </View>
          <View style={styles.passwordContainer}>
            <Text style={styles.field}>Password</Text>
            <MyTextinput
              secureTextEntry={true}
              value={password}
              onChangeText={getPassword.bind(this)}
            />
          </View>
          <View style={styles.rememberMeContainer}>
            <TouchableOpacity
              onPress={() => setRemember(!remember)}
              style={styles.rememberMeTouchable}>
              <View style={styles.rememberMeCheckBox}>
                <CheckBox value={remember} getValue={setRemember.bind(this)} />
              </View>
              <View style={styles.rememberMeText}>
                <Text style={styles.rememberLabel}>Remember me</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('forgotPassword')}>
              <Text style={styles.rememberLabel}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: Platform.OS === 'ios' ? hp('16') : hp('9')}} />
          <View style={styles.bottom}>
            <ButtonRegular title="Done" onClick={() => loginUser()} />
          </View>
        </ScrollView>
        {loader ? <TNIndicator /> : null}
        {/* </LinearGradient> */}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  bg: {
    width: '100%',
    height: '100%',
  },
  scrollView: {width: '100%'},
  scrollViewContainer: {width: '100%', alignItems: 'center'},
  navigationBack: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: wp('3.5'),
  },
  logo: {height: 69, width: 96},
  linearGradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  scrollContainer: {
    width: '100%',
    alignItems: 'center',
  },
  signin: {marginTop: 33},
  emailContainer: {width: '90%', marginTop: 39},
  passwordContainer: {width: '90%', marginTop: 23},
  rememberMeContainer: {
    width: '90%',
    marginTop: 23,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rememberMeTouchable: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
  },
  rememberMeCheckBox: {width: '5%', marginRight: 12},
  head: {
    fontFamily: FONTS.SFBold,
    fontSize: 36,
    color: 'white',
    marginTop: 33,
    marginBottom: 16,
  },
  logoContainer: {
    width: '90%',
    marginTop: 96,
    alignItems: 'center',
  },
  inputContainer: {
    width: '90%',
    marginTop: 23,
  },
  field: {
    fontSize: 14,
    fontFamily: FONTS.SFBold,
    color: 'white',
    marginBottom: 11,
  },
  rememberForgotContainer: {
    width: '90%',
    marginTop: 23,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rememberContainer: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
  },
  checkbox: {
    width: '5%',
    marginRight: 12,
  },
  rememberLabelCont: {
    width: '93%',
  },
  rememberMeText: {width: '93%'},
  bottom: {
    width: '90%',
  },
  width100: {
    width: '100%',
  },
  rememberLabel: {
    fontSize: 14,
    fontFamily: FONTS.SFBold,
    color: 'white',
  },
});
