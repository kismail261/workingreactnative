import React from 'react';
import {StyleSheet, View, SafeAreaView, Image, Text} from 'react-native';
import {ButtonRegular} from '../../../common/btnRegular';
import {FONTS, ICONS} from '../../../constant';
import {ContactCard} from './components/contactCard';

export const Contacts = () => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.view}>
        <ContactCard deleteMode />
        <ContactCard deleteMode />
        <ContactCard deleteMode />
        <ContactCard deleteMode />
        <ContactCard deleteMode />
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
    width: 276,
    height: 290.59,
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
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
});
