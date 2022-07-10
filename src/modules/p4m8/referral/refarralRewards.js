import React from 'react';
import {StyleSheet, View, SafeAreaView, Image, Text} from 'react-native';
import {ButtonRegular} from '../../../common/btnRegular';
import {FONTS, ICONS} from '../../../constant';

export const ReferralRewards = () => {
  return (
    <SafeAreaView style={styles.main}>
      <View
        style={{
          width: '90%',
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={ICONS.gift} style={styles.img} />
      </View>
      <View style={styles.view}>
        <Text style={styles.title}>You have</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.points}>1000</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.title}>Sporty Points!</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.title18}>(Equals to $20)</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.desc}>
          See what you can spend your Sporty Points on
        </Text>
      </View>
      <View style={[styles.view, {marginTop: 20}]}>
        <ButtonRegular transparent title="Learn More About Sporty Points" />
      </View>
      <View style={[styles.view, {marginTop: 10}]}>
        <ButtonRegular blue title="OK" />
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
  desc: {
    fontSize: 16,
    fontFamily: FONTS.SFRegular,
    color: '#3D3D3D',
  },
  img: {
    width: 252.57,
    height: 235.75,
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: 26,
    color: 'black',
    textAlign: 'center',
  },
  title18: {
    fontFamily: FONTS.SFBold,
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  points: {
    fontFamily: FONTS.SFBold,
    fontSize: 58,
    color: '#2C99C6',
    textAlign: 'center',
  },
  view: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
});
