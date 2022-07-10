import React from 'react';
import {Image, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {ButtonRegular} from '../../../common/btnRegular';
import {FONTS} from '../../../constant';
import {ICONS} from '../../../constant/icons';

export const Thankyou = () => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.imgCont}>
        <Image source={ICONS.confirmed_lightGreen} style={styles.img} />
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.title}>Thank You</Text>
      </View>
      <View style={{marginTop: 5, width: '40%'}}>
        <Text style={styles.desc}>Review Submitted Successfully</Text>
      </View>
      <View style={styles.bottomBtn}>
        <ButtonRegular title="OK" buttonStyle={styles.buttonStyle} />
      </View>
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
    height: 82,
    width: 82,
  },
  imgCont: {
    height: 124,
    width: 124,
    // backgroundColor: '#e8f7e2',
    // borderRadius: 124,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: 24,
    color: 'black',
  },
  desc: {
    fontFamily: FONTS.SFBold,
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: '#2C99C6',
  },
  bottomBtn: {
    marginTop: 95,
    width: '90%',
    position: 'absolute',
    bottom: 30,
  },
});
