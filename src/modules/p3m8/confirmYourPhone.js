import React, {useState, useEffect, useCallback} from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {FONTS} from '../../constant';
import Header from '../../common/headerBLC';
import {Url} from '../../constant/baseURL';
import axios from 'axios';
import TNIndicator from '../../common/TNIndicator';
import {useSelector} from 'react-redux';
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';

const confirmYourPhone = ({navigation, route}) => {
  const token = useSelector(state => state.user.token);
  const phoneNo = route.params.phoneNo;
  const [progress, setProgress] = useState(0.3);
  const [loader, setLoader] = useState(false);

  const [value, setValue] = useState('');
  const codeContainer = useBlurOnFulfill({value, cellCount: 4});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    value.length === 4 && handlerOnFulfill(value);
  }, [handlerOnFulfill, value]);

  const handlerOnFulfill = useCallback(async verificationCode => {
    setLoader(true);
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${Url}api/users/verifyphone/${verificationCode}`, {
        headers: headers,
      })
      .then(resp => {
        let response = resp.data;
        setLoader(false);
        if (response) {
          navigation.navigate('TwoStepVerificationStatus');
        } else {
          showMessage('Wrong code try again');
        }
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          showMessage(err.response.data.message);
        }
        setLoader(false);
        console.log('err handlerOnFulfill: ', err, verificationCode);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {}, 100);
    return () => {};
  }, []);

  const resendCode = () => {
    setLoader(true);
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    let data = {
      phone: phoneNo,
    };
    axios
      .post(`${Url}api/users/resend-verification`, data, {headers: headers})
      .then(resp => {
        let response = resp.data;
        setLoader(false);
        // showMessage(`code is sent on ${phoneNo}`);
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          showMessage(err.response.data.message);
        }
        setLoader(false);
        console.log('err resendCode: ', err.response.data.message);
      });
  };

  const getCode1 = value => {
    setCode1(value);
  };
  const getCode2 = value => {
    setCode2(value);
  };
  const getCode3 = value => {
    setCode3(value);
  };
  const getCode4 = value => {
    setCode4(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} label="2 Step Verification" />
      <ScrollView
        contentContainerStyle={{width: wp('100'), alignItems: 'center'}}>
        <View
          style={{
            alignItems: 'center',
            marginTop: Platform.OS == 'android' ? 20 : 35,
          }}>
          <Text style={styles.headingStyle}>Confirm your phone number</Text>
          <Text style={styles.subheadingStyle}>
            Enter the four-digit code we sent to your phoneto confirm your
            number
          </Text>
        </View>
        <View style={{height: 20}} />
        <View style={styles.inputRow}>
          <CodeField
            ref={codeContainer}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={4}
            rootStyle={styles.codeFiledRoot}
            keyboardType="number-pad"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>

        <View style={{height: 50}} />
        <View style={styles.footerRow}>
          <Text style={styles.codeStyle}>Didn't receive code? </Text>
          <TouchableOpacity onPress={resendCode}>
            <Text style={styles.resendStyle}> Resend</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loader ? <TNIndicator /> : null}
    </SafeAreaView>
  );
};

export default confirmYourPhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
  },
  headingStyle: {
    width: wp('80'),
    color: '#000000',
    fontSize: wp('6.5'),
    fontFamily: FONTS.SFSemiBold,
  },
  subheadingStyle: {
    width: wp('80'),
    color: '#707070',
    fontSize: wp('3.2'),
    fontFamily: FONTS.SFMedium,
    marginTop: 6,
  },
  codeStyle: {
    color: '#707070',
    fontSize: wp('3.2'),
    fontFamily: FONTS.SFRegular,
  },
  resendStyle: {
    color: '#2C99C6',
    fontSize: wp('3.2'),
    fontFamily: FONTS.SFMedium,
  },
  optionContainer: {
    width: wp('80'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputRow: {
    width: wp('80%'),
    // flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between'
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeFiledRoot: {marginTop: 20},
  cell: {
    backgroundColor: '#0343CB05',
    borderWidth: 1,
    borderColor: '#4040401A',
    //borderColor: '#00000030',
    borderRadius: 4,
    width: wp('18.5'),
    //height: 78,
    paddingTop: 22,
    paddingBottom: 22,
    fontSize: 24,
    margin: 4,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
