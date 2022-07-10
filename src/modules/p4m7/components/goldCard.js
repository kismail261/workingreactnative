import React from 'react';
import {ImageBackground, StyleSheet, View, Text, Image} from 'react-native';
import {FONTS, ICONS} from '../../../constant';
import { useSelector } from 'react-redux';

export const GoldCard = () => {
  const userDetail = useSelector(state => state.user.userDetail)


  return (
    <ImageBackground source={ICONS.goldCard} style={styles.main}>
      <View style={styles.row1}>
        <View style={styles.col1}>
          <View
            style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
            <Text style={[styles.small10, {marginBottom: 5}]}>You have</Text>
            <Text style={[styles.big28, { marginBottom: 5 }]}>{userDetail != null ? userDetail.sportyPoints : 0}</Text>
            <Text style={[styles.small10]}>Sporty Points</Text>
          </View>
        </View>
        <View style={[styles.divider, {width: '0%'}]} />
        <View style={styles.col1}>
          <View
            style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
            <Text style={[styles.small10, {marginBottom: 5}]}>You have</Text>
            <Text style={[styles.big28, {marginBottom: 5}]}>$15</Text>
            <Text style={[styles.small10]}>In Sporforya Wallet</Text>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', width: '70%', alignItems: 'center'}}>
        <Image source={ICONS.crown} style={[styles.icon, {marginRight: 10}]} />
        <View style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.big13}>Gold Member: </Text>
            <Text style={styles.small12}>$1 = Double Points!</Text>
          </View>
          {/* <Text style={styles.small12}>become a Gold Member</Text> */}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 183,
    width: '100%',
    alignItems: 'center',
  },
  small10: {
    fontSize: FONTS.SFRegular,
    color: 'white',
    fontSize: 10,
  },
  small12: {
    fontSize: FONTS.SFRegular,
    color: 'white',
    fontSize: 12,
  },
  big28: {
    fontSize: FONTS.SFBold,
    color: 'white',
    fontSize: 28,
  },
  big13: {
    fontSize: FONTS.SFBold,
    color: 'white',
    fontSize: 13,
  },
  icon: {
    height: 24,
    width: 24,
  },
  divider: {
    height: 52,
    borderColor: '#FFFFFF',
    opacity: 0.35,
    borderWidth: 1,
    width: 0,
  },
  row1: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    width: '90%',
  },
  col1: {
    alignItems: 'center',
    //justifyContent: 'flex-start',
    width: '45%',
    justifyContent: 'center',
  },
});
