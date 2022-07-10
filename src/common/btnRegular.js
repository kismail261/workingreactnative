import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONTS} from '../constant';

export const ButtonRegular = props => {
  return (
    <TouchableOpacity
      onPress={props.onClick}
      style={[
        props.buttonStyle,
        styles.btnMain,
        props.blue && styles.blue,
        props.white && styles.white,
      ]}>
      <Text style={[props.textStyle, styles.txt, props.txts && styles.txts]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnMain: {
    width: wp('80'),
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
  blue: {
    backgroundColor: '#2C99C6',
  },
  white: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2C99C6',
  },
  txts: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('3.5'),
    color: '#2C99C6',
  },
});
