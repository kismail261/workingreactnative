import React from 'react';
import {Image, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {ButtonRegular} from '../../../common/btnRegular';
import {FONTS} from '../../../constant';
import {ICONS} from '../../../constant/icons';

export const CancelBookingRequest = () => {
  return (
    <SafeAreaView style={styles.main}>
      <Image source={ICONS.confirmedIcon} style={styles.img} />
      <View style={{marginTop: 24}}>
        <Text style={styles.title}>Cancel Booking Request</Text>
      </View>
      <View style={{marginTop: 22, width: '90%'}}>
        <Text style={styles.desc}>
          We have received your request to cancel the event Soccer Basics for
          Children.
        </Text>
      </View>
      <View style={{marginTop: 22, width: '90%'}}>
        <Text style={styles.desc}>
          You will hear back from us once we have confirmation from the Provider
        </Text>
      </View>
      <View style={{marginTop: 95, width: '90%'}}>
        <ButtonRegular title="Done" buttonStyle={styles.buttonStyle} />
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
    height: 124,
    width: 124,
  },
  title: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 26,
    color: 'black',
  },

  desc: {
    fontFamily: FONTS.SFRegular,
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },

  buttonStyle: {
    backgroundColor: '#2C99C6',
  },
});
