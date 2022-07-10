/**
 * @format
 */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import qs from 'qs';
import Btn from '../../../common/meduimBtnSP';
import DatePicker from 'react-native-date-picker';
import {FONTS, ICONS} from '../../../constant';
import Header from './header';
import axios from 'axios';
import {useSelector} from 'react-redux';
import moment from 'moment';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';

const payoutDetails = props => {
  const apiData = props.route.params.apiData;
  const [isBank, setIsBank] = useState(false);
  const [loader, setLoader] = useState(false);
  const [cardNo, setCardNo] = useState('');
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState(new Date());
  const [open, setOpen] = useState(false);
  const userDetail = useSelector(state => state.user.userDetail);

  useEffect(() => {
    return () => {};
  }, []);

  const onContinue = async () => {
    let cardLength = cardNo.replace(/\s+/g, '');
    if (cardNo == '' || cardLength.length < 16) {
      showMessage('Please enter valid card number');
    } else if (cvc == '' || cvc.length < 3) {
      showMessage('Please enter valid cvc number');
    } else {
      setLoader(true);
      var data = qs.stringify({
        'card[cvc]': cvc,
        'card[exp_month]': moment(expiry).format('MM'),
        'card[exp_year]': moment(expiry).format('YYYY'),
        'card[name]':
          userDetail != null && userDetail.isOrganization
            ? apiData.businessName
            : apiData.firstName,
        'card[number]': cardNo.replace(/\s+/g, ''),
        'card[currency]': 'usd',
      });
      var config = {
        method: 'post',
        url: 'https://api.stripe.com/v1/tokens',
        headers: {
          Authorization: 'Bearer pk_test_l3zfS6QogXpJbCv2pNFyEh4F00zW84dE12',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          let jsonRes = response.data;
          setLoader(false);
          props.navigation.navigate('verificationSummaryDebit', {
            apiData: apiData,
            stripeToken: jsonRes,
          });
        })
        .catch(function (error) {
          const err = error;
          if (err.response) {
            showMessage('Provided card detail is incorrect');
          }
          console.log('err: ', err);
          setLoader(false);
        });
    }
  };

  const getCard = value => {
    let final = value
      .replace(/[^\dA-Z]/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
    setCardNo(final);
  };

  return (
    <View style={styles.container}>
      <Header
        navigation={props.navigation}
        label="Payout Method"
        progressCount={0.25}
      />
      {loader ? (
        <ActivityIndicator />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{padding: 0.5, marginBottom: 15, alignSelf: 'center'}}>
            <Text style={styles.headingStyle}>Payout Details</Text>
            <Text style={styles.subHeading}>
              Tell us where you'd like to receive your payouts.
            </Text>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                // disabled
                onPress={() => {
                  setIsBank(true);
                }}
                style={[isBank ? styles.buttonChecked : styles.button]}>
                <Image source={ICONS.bankIcon} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Bank Account</Text>
                {isBank ? (
                  <Image
                    source={ICONS.greenTick}
                    style={styles.buttonCheckMark}
                  />
                ) : null}
              </TouchableOpacity>
              <View style={{padding: 1}} />
              <TouchableOpacity
                style={!isBank ? styles.buttonChecked : styles.button}
                onPress={() => {
                  setIsBank(false);
                }}>
                <Image
                  source={ICONS.cardIcon}
                  style={styles.buttonIcon}
                  resizeMode="contain"
                />
                <Text style={styles.buttonText}>Debit Card</Text>
                {!isBank ? (
                  <Image
                    source={ICONS.greenTick}
                    style={styles.buttonCheckMark}
                  />
                ) : null}
              </TouchableOpacity>
            </View>
            <View style={{height: 12}} />
            <Text style={styles.inputHeading}>Card Number</Text>
            <TextInput
              maxLength={19}
              style={styles.inputStyle}
              onChangeText={value => {
                getCard(value);
              }}
              placeholder={'4000 0566 5566 5556'}
              placeholderTextColor="rgba(112, 112, 112, 0.5)"
              value={cardNo}
              keyboardType="phone-pad"
            />
            <Text style={styles.inputHeading}>CVC</Text>
            <TextInput
              maxLength={3}
              style={styles.inputStyle}
              onChangeText={value => {
                setCvc(value);
              }}
              placeholder={'123'}
              placeholderTextColor="rgba(112, 112, 112, 0.5)"
              value={cvc}
              keyboardType="phone-pad"
            />

            <Text style={styles.inputHeading}>Expiry Date</Text>
            <TouchableOpacity
              style={{
                width: wp('80%'),
                height: 46,
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#70707026',
                justifyContent: 'center',
                paddingLeft: 10,
                borderRadius: 4,
              }}
              onPress={() => setOpen(true)}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: wp('3.5'),
                  fontFamily: FONTS.SFRegular,
                }}>
                {moment(expiry).format('MM/YY')}
              </Text>
            </TouchableOpacity>

            <View style={{padding: 1}} />

            <View style={{paddingVertical: 20}} />

            <Btn label="Continue" onClick={onContinue} bgColor="#2C99C6" />
          </View>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={expiry}
            onConfirm={date => {
              setOpen(false);
              setExpiry(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </ScrollView>
      )}
    </View>
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
    fontSize: wp('6.5'),
    fontFamily: FONTS.SFBold,
    marginTop: Platform.OS == 'android' ? 18 : 28,
  },
  subHeading: {
    width: wp('80'),
    color: '#707070',
    fontSize: wp('4'),
    fontFamily: FONTS.SFRegular,
    marginTop: 8,
    marginBottom: Platform.OS == 'android' ? 8 : 8,
  },
  inputHeading: {
    width: wp('80'),
    color: '#000000',
    fontSize: wp('4'),
    fontFamily: FONTS.SFBold,
    marginTop: Platform.OS == 'android' ? 10 : 18,
  },
  inputSubHeading: {
    width: wp('80'),
    color: '#707070',
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFRegular,
    marginTop: 8,
    marginBottom: Platform.OS == 'android' ? 8 : 8,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: wp('38'),
    height: 60,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: 'lightgray',
    backgroundColor: 'white',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  buttonChecked: {
    width: wp('38'),
    height: 60,
    borderRadius: 2,
    borderWidth: 0,
    borderColor: 'lightgray',
    backgroundColor: 'white',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('3.5'),
  },
  buttonCheckMark: {
    width: wp('4'),
    height: wp('4'),
    borderRadius: wp('5'),
    backgroundColor: '#65c51f',
    alignSelf: 'flex-start',
    position: 'absolute',
    right: 5,
    top: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMarkText: {
    color: 'white',
  },
  buttonIcon: {
    width: 22,
    height: 22,
    marginRight: 6,
  },
  inputStyle: {
    width: wp('80'),
    height: 46,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#70707026',
    borderRadius: 4,
    color: '#000000',
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFRegular,
    paddingLeft: 13,
    marginTop: 5,
  },
});

export default payoutDetails;

{
  /* <CardField
                  postalCodeEnabled={true}
                  placeholder={{
                    number: '4242 4242 4242 4242',
                  }}
                  cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                    fontSize: 10,
                    borderRadius: 4
                  }}
                  style={{
                    height: 50,
                    marginVertical: 20,
                  }}
                  onCardChange={(cardDetails) => {
                    setCardDetail(cardDetails)
                  }}
                  onFocus={(focusedField) => {
                  }}
                /> */
}
{
  /* <CreditCardInput
                  requiresPostalCode={true}
                  requiresName={true}
                  cardScale={0.94}
                  onChange={_onChange}
                  cardFontFamily={FONTS.SFMedium}
                  labelStyle={{ fontSize: wp('2.3'), color: '#000000', fontFamily: FONTS.SFMedium }}
                  inputStyle={{ fontSize: wp('5'), color: '#000000', fontFamily: FONTS.SFRegular }}
                  placeholderColor="#707070"
                /> */
}
