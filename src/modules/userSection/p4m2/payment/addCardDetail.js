/**
 * @format
 */
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useStripe, CardField} from '@stripe/stripe-react-native';
import Btn from '../../../../common/meduimBtnSP';
import {FONTS, ICONS} from '../../../../constant';
import Header from '../../../../common/headerBL';
import { showMessage } from '../../../../helpers/replaceDigitsWithAesteriks';

export const CardDetails = props => {
  const apiData = props.route.params.apiData;
  const {createToken} = useStripe();
  const [isBank, setIsBank] = useState(false);
  const [loader, setLoader] = useState(false);
  const [cardDetail, setCardDetail] = useState('');

  const onContinue = async () => {
    if (cardDetail == '') {
      showMessage('Enter call detail');
      return;
    }
    setLoader(true);

    await createToken(cardDetail)
      .then(function (result) {
        setLoader(false);
        if (result.error) {
          showMessage('Your card information is not valid please check it again');
        } else {
          props.navigation.navigate('PaymentSuccessful', {
            apiData: apiData,
            stripeToken: result.token,
          });
          setLoader(false);
        }
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
      });
  };

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} label="Add Card" />
      {loader ? (
        <ActivityIndicator />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{width: '92%', marginBottom: 15, alignSelf: 'center'}}>
            <Text style={styles.headingStyle}>Enter Card Details</Text>
            <Text style={styles.subHeading}></Text>

            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={styles.buttonChecked}
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
            <CardField
              postalCodeEnabled={true}
              placeholder={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
                fontSize: 10,
                borderRadius: 4,
              }}
              style={{
                height: 50,
                marginVertical: 20,
              }}
              onCardChange={cardDetails => {
                setCardDetail(cardDetails);
              }}
              onFocus={focusedField => {}}
            />

            <View style={{paddingVertical: 20}} />
            <View style={{alignSelf: 'center'}}>
              <Btn label="Continue" onClick={onContinue} bgColor="#2C99C6" />
            </View>
          </View>
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
});
