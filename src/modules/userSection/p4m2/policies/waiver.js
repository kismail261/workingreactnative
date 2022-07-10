import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../../../constant';

export const Waiver = () => {
  var desc =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '80%', marginTop: 20}}>
        <Text style={styles.desc}>{desc}</Text>
        <View style={styles.divider} />
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
    fontFamily: FONTS.SFRegular,
    color: 'black',
    fontSize: 16,
  },
  divider: {
    borderWidth: 0.25,
    color: 'black',
    marginTop: 20,
  },
});
