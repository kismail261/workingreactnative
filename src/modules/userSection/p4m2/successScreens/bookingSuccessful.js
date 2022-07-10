import React, {useState, useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import ButtonRegular from '../../../../common/meduimBtnSP';
import {FONTS, Url} from '../../../../constant';
import {ICONS} from '../../../../constant/icons';
import {BookingCard} from './components/bookingCard';
import TNIndicator from '../../../../common/TNIndicator';
import axios from 'axios';
import headerBL from '../../../../common/headerBL';
import { showMessage } from '../../../../helpers/replaceDigitsWithAesteriks';
export const BookingSuccessful = props => {
  const apiData = props.route.params.apiData;
  const stripeToken = props.route.params.stripeToken;
  const token = useSelector(state => state.user.token);
  const currentUser = useSelector(state => state.user.currentUser);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // submitForm()
    // setLoader(false)
    // console.log(apiData);
    // console.log(currentUser);
    console.log(stripeToken);
    console.log(stripeToken.id);
    return () => {};
  }, []);

  const submitForm = async () => {
    setLoader(true);
    const data = {
      listingId: apiData.listing._id,
      scheduleId: apiData.scheduleDetail[0]._id,
      totalPrice: 10,
      userId: currentUser._id,
      childIds: apiData.childIds,
      start: apiData.scheduleDetail[0].duration.start,
      end: apiData.scheduleDetail[0].duration.end,
      insuranceDocument: ['file/hdmsjwuokashwrw'],
      stripeToken: stripeToken.id,
    };
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${Url}api/booking`, data, {headers: headers})
      .then(resp => {
        setLoader(false);
        let response = resp?.data;
        console.log('submitForm: ', response);
        props.navigation.navigate('Bookings');
      })
      .catch(error => {
        const err = error;
        setLoader(false);
        if (err.response) {
          showMessage(err?.response?.data?.message);
        }
      });
    // console.log("submitForm: ", body)
    // "totalPrice": apiData.scheduleDetail[0].pricing.price,
    // "userId": apiData.listing.provider._id,
    // await fetch(`https://api2.sporforya.com/api/booking`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify(body),
    // }).then(response => response.json())
    //   .then(res => {
    //     const data = res;
    //     console.log("response: ", data)
    //     setLoader(false)
    //     props.navigation.navigate("Bookings")
    //   })
    //   .catch(error => {
    //     const err = error
    //     if (err.response) {
    //     }
    //     console.log("error: ", error)
    //     setLoader(false)
    //   });
  };

  return (
    <SafeAreaView style={styles.main}>
      <headerBL label={"Succesful Booking"}/>
      <Image source={ICONS.confirmedIcon} style={styles.img} />
      <View style={{marginTop: 24}}>
        <Text style={styles.title}>Booking Successful!</Text>
      </View>
      <View style={{marginTop: 22}}></View>
      <BookingCard detail={apiData} />
      <View style={{marginTop: 95}}>
        <ButtonRegular label="Done" onClick={submitForm} bgColor={'#2C99C6'} />
      </View>
      {loader ? <TNIndicator /> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
    justifyContent: 'center',
  },
  img: {
    height: wp('30'),
    width: wp('30'),
  },
  title: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('6'),
    color: 'black',
  },
  buttonStyle: {
    backgroundColor: '#2C99C6',
  },
});
