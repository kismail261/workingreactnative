import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {FONTS} from '../constant';

export const ButtonRegular = props => {
  return (
    <TouchableOpacity
      onPress={props.onClick}
      style={[styles.btnMain, props.buttonStyle]}>
      <Text style={[styles.txt, props.textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnMain: {
    backgroundColor: '#65C51F',
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  txt: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('3.5'),
    color: 'white',
  },
});
