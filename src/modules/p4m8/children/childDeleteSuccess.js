import React from 'react';
import {StyleSheet, View, SafeAreaView, Image, Text} from 'react-native';
import {ButtonRegular} from '../../../common/btnRegular';
import {FONTS, ICONS} from '../../../constant';

export const ChildDeleteSuccess = () => {
  return (
    <SafeAreaView style={styles.main}>
      <Image source={ICONS.confirmedIcon} style={styles.img} />
      <View style={[styles.view, {marginTop: 20}]}>
        <Text style={styles.title}>Child deleted!</Text>
      </View>
      <View style={[styles.view, {marginTop: 10}]}>
        <Text style={styles.desc}>
          Clyde Doe deleted from your profile successfully.
        </Text>
      </View>
      <View style={[styles.view, styles.bottom]}>
        <ButtonRegular blue title="Done" />
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
  bottom: {
    position: 'absolute',
    bottom: 20,
  },
  img: {
    width: 88,
    height: 88,
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
  desc: {
    fontFamily: FONTS.SFRegular,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },

  view: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
});
