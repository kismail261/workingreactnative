import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FONTS } from '../../../constant';

export const Divider = props => {
  return (
    <View style={styles.main}>
      <View style={styles.line}></View>
      <Text style={styles.txt}>{props.text}</Text>
      <View style={styles.line}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center'
  },
  line: {
    height: 1,
    backgroundColor: '#FFFFFF',
    width: '35%',
    opacity: 0.5,
  },
  txt: {
    fontFamily: FONTS.SFRegular,
    fontSize: 14,
    color: 'white',
    width: '30%',
    textAlign: 'center',
  },
});
