import React from 'react';
import {StyleSheet, View, SafeAreaView, Image, Text} from 'react-native';
import {ButtonRegular} from '../../../common/btnRegular';
import {FONTS, ICONS} from '../../../constant';

export const ReferralInvitation = () => {
  return (
    <SafeAreaView style={styles.main}>
      <View
        style={{
          width: '90%',
          marginTop: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image style={styles.img} source={ICONS.invitationsent} />
      </View>
      <View style={{width: '90%', marginTop: 5}}>
        <Text style={styles.title}>
          Your Friend John Doe invited you to join Sporforya
        </Text>
      </View>
      <View style={{width: '90%', marginTop: 12}}>
        <Text style={styles.desc}>
          Sign up and get 1000 Sporty Points (Equals to $20) for FREE to spend
          on your next activity!
        </Text>
      </View>
      <View style={[styles.box, {marginTop: 12}]}>
        <View style={styles.boxRow}>
          <View style={{width: '30%', alignItems: 'center'}}>
            <Image source={ICONS.calenderTicked} style={styles.boxIcon} />
          </View>
          <Text
            style={[
              styles.title,
              {fontSize: 18, textAlign: 'left', width: '70%'},
            ]}>
            Make your First Booking using Sporforya
          </Text>
        </View>
      </View>
      <View style={{width: '90%', marginTop: 20}}>
        <ButtonRegular blue title="Sign up" />
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
    width: 165.81,
    height: 114.84,
    marginBottom: 32,
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: 32,
    color: 'black',
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    fontFamily: FONTS.SFRegular,
    color: '#3D3D3D',
  },
  box: {
    height: 103,
    alignItems: 'center',
    //width: '100%',
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: '#15488F26',
    borderWidth: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '90%',
  },
  boxRow: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
  },
  boxIcon: {
    width: 33.74,
    height: 33.9,
    marginRight: 15,
  },
});
