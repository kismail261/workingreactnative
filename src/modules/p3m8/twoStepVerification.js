import React from 'react';
import { Image, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { ButtonRegular } from '../../common/btnRegular';
import { FONTS, ICONS } from '../../constant';
import Header from '../../common/headerBL';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


export const TwoStepVerification = (props) => {
  return (
    <View style={styles.main}>
      <Header navigation={props.navigation} label={"2 Step Verification"} />
      <View
        style={{
          width: '90%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 70,
        }}>
        <Image source={ICONS.twofactor} style={styles.img} />
      </View>
      <View style={{ marginTop: 22, width: '80%' }}>
        <Text style={styles.title}>2 Step Verification</Text>
      </View>
      <View style={{ marginTop: 22, width: '60%' }}>
        <Text style={styles.desc}>
          We'll ask for a verification code via your security method if we notice a login from an unrecognised device or browser.
        </Text>
      </View>
      <View style={{ marginTop: 22, }}>
        <ButtonRegular onClick={() => props.navigation.navigate("AddPhone")} blue title="Turn 2 Step Verification On" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  img: {
    width: 204.57,
    height: 165.3,
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('7'),
    textAlign: 'center',
    color:'#000000'
  },
  desc: {
    color: '#3D3D3D',
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFRegular,
    textAlign: 'center',
  },
});
