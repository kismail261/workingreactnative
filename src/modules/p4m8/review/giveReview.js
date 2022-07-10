import React from 'react';
import {StyleSheet, View, SafeAreaView, Image, Text} from 'react-native';
import {ButtonRegular} from '../../../common/btnRegular';
import {FONTS, ICONS} from '../../../constant';

export const GiveAReview = () => {
  return (
    <SafeAreaView style={styles.main}>
      <View
        style={{
          width: '90%',
          marginTop: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image style={styles.img} source={ICONS.reviewbg} />
      </View>
      <View style={{width: '90%', marginTop: 5}}>
        <Text style={styles.title}>You are all caught up!</Text>
      </View>
      <View style={{width: '90%', marginTop: 12}}>
        <Text style={styles.desc}>
          You have no bookings to review right now. Please book and use any
          service, event or facility to review them
        </Text>
      </View>

      <View style={{width: '90%', marginTop: 20}}>
        <ButtonRegular blue title="Book Now" />
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
    width: 169.52,
    height: 239.89,
    marginBottom: 32,
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: 26,
    color: 'black',
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: FONTS.SFMedium,
    color: '#3D3D3D',
  },
});
