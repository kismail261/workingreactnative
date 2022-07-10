import React from 'react';
import { Image, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import ButtonRegular from '../../common/meduimBtnSP';
import MeduimBtnBorder from '../../common/meduimBtnBorder';
import { FONTS, ICONS } from '../../constant';
import Header from '../../common/headerBLC';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


export const TwoStepVerificationStatus = (props) => {
  return (
    <SafeAreaView style={styles.main}>
      <Header navigation={props.navigation} label={"2 Step Verification"} />
      <View
        style={{
          width: '90%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 70,
        }}>
        <Image source={ICONS.lock} style={styles.img} resizeMode='contain' />
      </View>
      <View style={{ marginTop: 22, width: '70%' }}>
        <Text style={styles.title}>2 Step {"\n"} Verification is on</Text>
      </View>
      <View style={{ marginTop: 22, width: '60%' }}>
        <Text style={styles.desc}>
          We'll ask for a verification code via your security method if we
          notice a login from an unrecognised device or browser.
        </Text>
      </View>
      <View style={{ marginTop: 18 }}>
        <ButtonRegular
          label="Turn Off"
          onClick={() => props.navigation.navigate("profileSetting")}
          bgColor={"#2C99C6"}
        />
        <MeduimBtnBorder
          label="Use Different Phone Number"
          bgColor={"#2C99C6"}
          onClick={() => props.navigation.navigate("AddPhone")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  img: {
    width: 147.03,
    height: 155.77,
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('7'),
    textAlign: 'center',
    color: '#000000'
  },
  desc: {
    color: '#3D3D3D',
    fontSize: wp('4'),
    fontFamily: FONTS.SFRegular,
    textAlign: 'center',
  },
});
