import React from 'react';
import {StyleSheet, View, SafeAreaView, Image, Text} from 'react-native';
import {ButtonRegular} from '../../../common/btnRegular';
import {FONTS, ICONS} from '../../../constant';
import {CheckBox} from '../../taxinformation/components/checkbox';
import {ContactCard} from './components/contactCard';

export const AddContact = () => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.view}>
        <Text style={styles.title}>Add from Facebook</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.desc}>
          Please add contacts from your facebook friend list
        </Text>
      </View>
      <View
        style={[
          styles.view,
          styles.row,
          {
            borderBottomWidth: 1,
            borderColor: 'grey',
            paddingVertical: 10,
            marginTop: 20,
          },
        ]}>
        <CheckBox />
        <Text style={[styles.desc, {marginLeft: 5}]}>Select All Friends</Text>
      </View>
      <View style={styles.view}>
        <ContactCard addMode />
        <ContactCard addMode />
        <ContactCard addMode />
        <ContactCard addMode />
      </View>
      <View style={[styles.view, styles.bottom]}>
        <ButtonRegular blue title="Add add selected contacts" />
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
    fontSize: 14,
    fontFamily: FONTS.SFRegular,
    color: '#3D3D3D',
  },
  img: {
    width: 252.57,
    height: 235.75,
  },
  title: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 26,
    color: 'black',
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
    // alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 20,
  },
});
