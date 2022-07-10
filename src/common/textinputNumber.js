import React from 'react';
import { StyleSheet, TextInput, } from 'react-native';

export const MyNumberTextinput = props => {
  return (
    <TextInput
      maxLength={props.maxLength}
      style={[styles.ti2, props.styles]}
      value={props.value}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureTextEntry}
      keyboardType={'phone-pad'}
    />
  );
};

const styles = StyleSheet.create({
  ti: {
    height: 46,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',

  },
  ti2: {
    width: '100%',
    height: 46,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#70707026',
    borderRadius: 4,
    color: '#707070',
    paddingLeft: 6
  },
});
