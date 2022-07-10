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
  TextInput,
} from 'react-native';
import {FONTS, ICONS} from '../../constant';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import {ButtonRegular} from '../../common/buttonRegular';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {MyTextinput} from '../../common/textinput';
import {createAccount} from '../../redux/user/user.action';
import TNIndicator from '../../common/TNIndicator';
import {setLoader} from '../../redux/loader/loader.action';
import {showMessage} from '../../helpers/replaceDigitsWithAesteriks';
import TextField from '../../common/textfield';

export const Register = props => {
  const loader = useSelector(state => state.loader.loader);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  var hasNumber = /\d/;
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const [hidePass, setHidePass] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    return () => {};
  }, []);

  const getEmail = value => {
    let removeSpace = value.replace(/ /g, '');
    setEmail(removeSpace);
  };
  const getPassword = value => {
    if (error) {
      setError('');
    }
    setPassword(value);
  };

  function onSigninPress() {
    props.navigation.navigate('login');
  }

  const createUser = async () => {
    let validate = await validateEmail();
    if (email == '') {
      showMessage('Please enter email address', 'warning');
    } else if (!validate) {
      showMessage('Wrong email format', 'warning');
    } else if (password == '') {
      showMessage('Please enter password', 'warning');
    }
    // else if (password != confirmPassword) {
    // }
    else {
      if (!passwordValidation(password)) {
        setError('Password must contain atleast 1 uppercase and a number');
        return;
      }

      dispatch(setLoader(true));
      let data = {
        email: email,
        password: password,
      };
      dispatch(createAccount(data, props.navigation));
    }
  };

  function passwordValidation(myString) {
    return /(?=.*\d)(?=.*[A-Z])/.test(myString);
  }

  const validateEmail = async () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  function isLetter(str) {
    return str.match(/[a-zA-Z]/g);
  }
  const toggleShowPassword = () => {
    setHidePass(pass => !pass);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, width: '100%', alignItems: 'center'}}
      behavior={Platform.OS === 'ios' ? 'height' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
      <ImageBackground style={styles.bg} source={ICONS.getStartedBG}>
        {/* <LinearGradient
          colors={['#3B5998', '#0D6B93']}
          style={styles.linearGradient}> */}
        <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{width: '100%', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{
              position: 'absolute',
              top: Platform.OS == 'ios' ? 50 : 20,
              left: wp('3.5'),
            }}>
            <Icon name="chevron-back-outline" color="white" size={25} />
          </TouchableOpacity>
          <View
            style={{
              width: '90%',
              marginTop: Platform.OS == 'ios' ? 96 : 60,
              alignItems: 'center',
            }}>
            <Image source={ICONS.signinLogo} style={{height: 69, width: 96}} />
          </View>
          <View style={{marginTop: 33}}>
            <Text style={styles.head}>Sign up</Text>
          </View>
          <View style={{width: '90%', marginTop: 39}}>
            <Text style={styles.field}>Email address</Text>
            <MyTextinput
              value={email}
              onChangeText={getEmail.bind(this)}
              secureTextEntry={false}
            />
          </View>
          <View style={{width: '90%', marginTop: 23}}>
            <Text style={styles.field}>Password</Text>

            <TextField value={password} onChangeText={getPassword.bind(this)} />
          </View>
          <View style={{width: '90%', marginTop: 20, flexDirection: 'row'}}>
            <Image
              source={ICONS.tick}
              style={{
                height: 16,
                width: 16,
                resizeMode: 'contain',
                tintColor: isLetter(password) ? '#65C51F' : '#fff',
              }}
            />
            <Text
              style={[
                styles.validateField,
                {
                  color: isLetter(password) ? '#65C51F' : '#fff',
                },
              ]}>
              Must include a letter
            </Text>
          </View>
          <View style={{width: '90%', marginTop: 5, flexDirection: 'row'}}>
            <Image
              source={ICONS.tick}
              style={{
                height: 16,
                width: 16,
                resizeMode: 'contain',
                tintColor: hasNumber.test(password) ? '#65C51F' : '#fff',
              }}
            />
            <Text
              style={[
                styles.validateField,
                {color: hasNumber.test(password) ? '#65C51F' : '#fff'},
              ]}>
              Must include numbers
            </Text>
          </View>
          <View style={{width: '90%', marginTop: 5, flexDirection: 'row'}}>
            <Image
              source={ICONS.tick}
              style={{
                height: 16,
                width: 16,
                resizeMode: 'contain',
                tintColor: specialChars.test(password) ? '#65C51F' : '#fff',
              }}
            />
            <Text
              style={[
                styles.validateField,
                {color: specialChars.test(password) ? '#65C51F' : '#fff'},
              ]}>
              Must include a special character
            </Text>
          </View>
          <View style={{width: '90%', marginTop: 5, flexDirection: 'row'}}>
            <Image
              source={ICONS.tick}
              style={{
                height: 16,
                width: 16,
                resizeMode: 'contain',
                tintColor:
                  password.length >= 8 && password.length <= 30
                    ? '#65C51F'
                    : '#fff',
              }}
            />
            <Text
              style={[
                styles.validateField,
                {
                  color:
                    password.length >= 8 && password.length <= 30
                      ? '#65C51F'
                      : '#fff',
                },
              ]}>
              Must be 8-30 characters
            </Text>
          </View>
          <View style={{width: '90%', marginTop: 23}}>
            <Text style={styles.field}>Confirm Password</Text>
            <MyTextinput
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword.bind(this)}
            />

            {/* <TextInput
              value={email}
              onChangeText={getEmail.bind(this)}
              secureTextEntry={false}
              style={{ borderWidth: 1, borderColor: 'red', backgroundColor: 'white' }}
            /> */}
          </View>
          {/* <View style={{height: Platform.OS == 'ios' ? hp('16') : hp('6')}} />
          <View style={styles.bottom}>
            <ButtonRegular
              title="Done"
              onClick={() => {
                createUser();
              }}
            />
          </View>
          <View style={{height: 30}} /> */}
        </ScrollView>
        {loader ? <TNIndicator /> : null}
        {/* </LinearGradient> */}
      </ImageBackground>
      <View style={styles.bottom}>
        <ButtonRegular
          title="Done"
          onClick={() => {
            createUser();
          }}
        />
      </View>
      <View
        style={[
          styles.tosCont,
          {width: '80%', marginTop: hp('5'), marginBottom: 8},
        ]}>
        <Text
          style={[
            styles.tosText,
            {fontSize: wp('4.5'), fontFamily: FONTS.SFRegular},
          ]}>
          Already have an account?{' '}
        </Text>
        <Text
          onPress={onSigninPress}
          style={[
            styles.tosText,
            {textDecorationLine: 'underline'},
            {fontSize: wp('4.5'), fontFamily: FONTS.SFRegular},
          ]}>
          SignIn
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  main: {},
  // linearGradient: {
  //   flex: 1,
  //   width: '100%',
  //   alignItems: 'center',
  // },
  bg: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  head: {
    fontFamily: FONTS.SFBold,
    fontSize: 36,
    color: 'white',
  },
  field: {
    fontSize: 14,
    fontFamily: FONTS.SFBold,
    color: 'white',
    marginBottom: 11,
  },
  validateField: {
    fontSize: 14,
    fontFamily: FONTS.SFBold,
    color: 'white',
    marginLeft: 5,
  },
  bottom: {
    width: '90%',
    position: 'absolute',
    bottom: 90,
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
    position: 'absolute',
    bottom: 45,
  },
});
