import React from 'react';
import {StyleSheet, View, SafeAreaView, Image, Text} from 'react-native';
import {ButtonRegular} from '../../../common/btnRegular';
import {FONTS, ICONS} from '../../../constant';

export const NoContacts = () => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.view}>
        <Image source={ICONS.contacts1} style={styles.img} />
      </View>
      <View style={styles.view}>
        <Text style={styles.title}>No Contacts Added</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.desc}>
          You have not added any contact. Please add contacts to share activity
          with your contacts.
        </Text>
      </View>
      <View style={[styles.view, styles.bottom]}>
        <ButtonRegular blue title="Add Contacts" />
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
  desc: {
    fontSize: 17,
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
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  bottom: {
    position: 'absolute',
    bottom: 20,
  },
});
