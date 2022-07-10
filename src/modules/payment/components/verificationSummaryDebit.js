/**
 * @format
 */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import Btn from '../../../common/meduimBtnSP';
import TNActivityIndicator from '../../../common/TNIndicator';
import { FONTS, ICONS, Url } from '../../../constant';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';
import Header from './header';



const verificationSummaryDebit = props => {
  const apiData = props.route.params.apiData
  const stripeToken = props.route.params.stripeToken
  const token = useSelector(state => state.user.token)
  const userDetail = useSelector(state => state.user.userDetail);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    return () => {
    }
  }, [])

  const doneClick = () => {
    setLoader(true)
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };

    let data = {
      stripeToken: stripeToken.id,
      country: "US",
      phone: "+18884521506",
      email: apiData.email,
      businessWebUrl: 'https://sfy.com',
      firstName: userDetail != null && userDetail.isOrganization ? apiData.businessName : apiData.firstName,
      lastName: userDetail != null && userDetail.isOrganization ? '' : apiData.lastName,
      gender: userDetail != null && userDetail.isOrganization ? 'male' : apiData.gender.toLowerCase(),
      dob: "1999-12-30T12:36:24.775+00:00",
      city: "Trentonlk",
      state: "New Jersey",
      line1: "742 Indiana Ave , NJ 08638",
      postal_code: "08638",
      ssnNumber: "0000",
    };


    axios.post(`${Url}api/payments/provider`, data, { headers: headers })
      .then(resp => {
        let response = resp.data
        console.log("response: ", response)
        showMessage("Payout method added successfully")
        setLoader(false)
        props.navigation.navigate("bottomTab")
      })
      .catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
        }
        setLoader(false)
        console.log("err doneClick: ", err.response.data.message)
      });

  }


  // let data = {
  //   stripeToken: stripeToken.id,
  //   country: "US",
  //   // country: apiData.country,
  //   // phone: apiData.phone,
  //   //tel:+18884521506
  //   phone: "+18884521506",
  //   email: apiData.email,
  //   businessWebUrl: apiData.businessWebUrl,
  //   firstName: apiData.firstName,
  //   lastName: apiData.lastName,
  //   // gender: "male",
  //   gender: apiData.gender.toLowerCase(),
  //   dob: apiData.dob,
  //   city: apiData.city,
  //   state: apiData.state,
  //   line1: apiData.line1,
  //   postal_code: apiData.postal_code,
  //   ssnNumber: apiData.ssnNumber,
  // businessWebUrl: apiData.businessWebUrl,
  // };


  return (
    <ScrollView>
      <View style={styles.container} >
        <Header
          navigation={props.navigation}
          label="Payout Method"
          progressCount={0.25}
        />
        <Text style={styles.headingStyle}>Verification Summary</Text>
        <Text style={styles.subHeading}>
          You're almost ready to start getting paid by Sporforya. Please confirm
          your information below.
        </Text>
        <Text style={styles.inputHeading}>Provider Details</Text>
        <View style={{ paddingVertical: 5 }} />
        <View style={styles.verificationInput}>
          {
            userDetail != null && userDetail.isOrganization
              ?
              <Text style={styles.verificationInputText}>{apiData.businessName}</Text>
              :
              <Text style={styles.verificationInputText}>{apiData.firstName} {apiData.lastName}</Text>
          }
        </View>

        <Text style={styles.inputHeading}>Payout Details</Text>
        <View style={{ paddingVertical: 5 }} />
        <View style={styles.verificationInput}>
          <View>
            <Text style={styles.verificationInputText}>Visa</Text>
            <Text style={styles.verificationInputSubText}>
              ***** **** **** {stripeToken.card.last4}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            <Image source={ICONS.greenTick} style={styles.buttonCheckMark} />
            <TouchableOpacity onPress={() => props.navigation.navigate("payoutDetails", { apiData: apiData })} >
              <Image source={ICONS.pencilBlue} style={{ width: 10, height: 10, marginRight: 5, }} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.inputSubHeading}>
          By clicking Done, you agree to the Connected Account Agreement, to
          receiving autodialled text messages from Stripe, and you certify that
          the information you have provided to Stripe is complete and correct.
          Stripe Inc. is a registered ISO of Wells Fargo Bank, N.A., Concord, CA
        </Text>

        <View style={{ paddingVertical: 20 }} />
        <View style={{ alignSelf: 'center' }}>
          <Btn
            label="Done"
            onClick={doneClick}
            bgColor="#2C99C6"
          />
        </View>
        {
          loader
            ?
            <TNActivityIndicator />
            :
            null
        }
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
  verificationInput: {
    width: wp('80'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: 1,
    height: 55,
  },
  verificationInputText: {
    paddingLeft: 20,
    fontFamily: FONTS.SFRegular,
    color: 'black',
  },
  verificationInputSubText: {
    fontFamily: FONTS.SFRegular,
    paddingLeft: 20,
    color: 'gray',
  },
  buttonCheckMark: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: '#65c51f',
    marginRight: 5,
  },
  checkMarkText: {
    color: 'white',
  },
});

export default verificationSummaryDebit;
