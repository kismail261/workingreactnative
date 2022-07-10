import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import { widthPercentageToDP as  wp } from 'react-native-responsive-screen';
import Header from '../../common/headerBLC';
import {FONTS, ICONS} from '../../constant';



export const StripeSupport = (props) => {
  var supportTxt =
    'For general queries, including partnership opportunities, please email';
  var phoneTxt = 'Call our toll-free number for 24/7 support at ';
  return (
    <SafeAreaView style={styles.main}>
      <Header navigation={props.navigation} label="Stripe Support" />
      <View style={{width: '80%', marginTop: 20, marginBottom: 32}}>
        <Text style={styles.branding}>stripe</Text>
      </View>
      <View style={styles.infoCont}>
        <Image
          source={ICONS.support}
          style={{width: 37.79, height: 37.78, marginRight: 13, marginTop:3}}
        />
        <Text style={styles.desc}>{supportTxt} <Text style={{fontFamily: FONTS.SFBold}} >info@stripe.com</Text></Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.infoCont}>
        <Image
          source={ICONS.phoneblue}
          style={{ width: 32.25, height: 32.25, marginRight: 13, marginTop: 3}}
        />
        <Text style={styles.desc}>{phoneTxt} <Text style={{ fontFamily: FONTS.SFBold }} >1234556</Text></Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  branding: {
    fontSize: 42,
    color: '#359AD5',
    fontFamily: FONTS.SFBold,
  },
  infoCont: {
    flexDirection: 'row',
    width: '80%',
    marginBottom: 25,
    alignItems: 'flex-start',
  },
  divider: {
    height: 1,
    backgroundColor: '#707070',
    width: '85%',
    marginBottom: 36,
    opacity: 0.1,
  },
  desc: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('4'),
    color: '#000000',
    width: '80%',
  },
  descbold: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('4'),
    color: '#000000',
  },
});
