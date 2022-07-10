import React from 'react';
import {Image, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {ButtonRegular} from '../../../common/btnRegular';
import {FONTS} from '../../../constant';
import {ICONS} from '../../../constant/icons';

export const InvitationSent = (props) => {
  return (
    <SafeAreaView style={styles.main}>
      <Image source={ICONS.invitationsent} style={styles.img} />
      <View style={{marginTop: 24}}>
        <Text style={styles.title}>Invitation Sent!</Text>
      </View>
      <View style={{marginTop: 22, width: '80%'}}>
        <Text style={styles.desc}>
          When your friend accept the invite and book, than you finally will be
          able to book with discount
        </Text>
      </View>
      <View style={{marginTop: 95, width: '90%'}}>
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
    width: 165.81,
    height: 114.8,
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: 32,
    color: 'black',
  },

  desc: {
    fontFamily: FONTS.SFRegular,
    fontSize: 16,
    color: '#3D3D3D',
    textAlign: 'center',
  },

  buttonStyle: {
    backgroundColor: '#2C99C6',
  },
});
