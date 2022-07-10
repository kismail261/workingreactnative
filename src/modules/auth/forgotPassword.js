import React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {ButtonRegular} from '../../common/buttonRegular';
import {MyTextinput} from '../../common/textinput';
import TNActivityIndicator from '../../common/TNIndicator';
import {FONTS, ICONS} from '../../constant';
import {showMessage} from '../../helpers/replaceDigitsWithAesteriks';
import {setLoader} from '../../redux/loader/loader.action';

const ForgotPassword = ({navigation}) => {
  const dispatch = useDispatch();
  const {loader} = useSelector(state => state.loader);
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    dispatch(setLoader(false));
  }, [dispatch]);

  const getEmail = value => {
    const removeSpace = value.replace(/ /g, '');
    setEmail(removeSpace);
  };
  const handleSubmit = async () => {
    let validate = await validateEmail();
    if (email === '') {
      showMessage('Please provide an email.', 'warning');
    } else if (!validate) {
      showMessage('Wrong email format', 'warning');
    } else {
      dispatch(setLoader(true));
      setTimeout(() => {
        dispatch(setLoader(false));
      }, 1000);
      // TODO when api response success navigate to 'Email Sent' Screen(24)
      // dispatch(userForgotPassword({ email }, navigation))
      setEmail('');
    }
  };
  // TODO move it in utils folder in helper file
  const validateEmail = async () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <View style={styles.main}>
      {/* Back Icon */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBack}
      >
        <Icon name="chevron-back-outline" color="black" size={25} />
      </TouchableOpacity>
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            <View style={styles.imageContainer}>
              <Image
                source={ICONS.forgotPassword}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            {/* Title and subtitle */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Forgot your password?</Text>
              <Text style={styles.subtitle}>
                Don't worry! Please enter your email
              </Text>
              <Text style={styles.subtitle}>
                {' '}
                that you have used for signup
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <KeyboardAvoidingView
          style={styles.formContainer}
          behavior={Platform.OS === 'ios' ? 'height' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
        >
          {/* Input Form */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <MyTextinput
              value={email}
              onChangeText={getEmail.bind(this)}
              secureTextEntry={false}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={styles.alignCenter}>
        <ButtonRegular
          title="Submit"
          buttonStyle={styles.bottom}
          textStyle={styles.btnText}
          onClick={() => handleSubmit()}
        />
      </View>
      {loader ? <TNActivityIndicator /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  goBack: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    paddingLeft: 18,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  image: {
    height: 225,
    width: '100%',
  },
  formContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: -43,
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: 26,
    lineHeight: 29,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: '#3D3D3D',
    fontFamily: FONTS.SFRegular,
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
  },
  inputContainer: {
    width: '90%',
    marginTop: 39,
  },
  inputLabel: {
    fontSize: 14,
    lineHeight: 19,
    color: '#000000',
    fontFamily: FONTS.SFSemiBold,
    marginBottom: 11,
  },
  bottom: {
    width: '90%',
    height: 50,
    backgroundColor: '#2C99C6',
    marginBottom: 30,
  },
  btnText: {
    fontFamily: FONTS.SFMedium,
    fontSize: 16,
    lineHeight: 19,
  },
  alignCenter: {
    alignItems: 'center',
  },
});
export default ForgotPassword;
