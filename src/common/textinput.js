import React from 'react';
import {StyleSheet, TextInput,} from 'react-native';

export const MyTextinput = props => {
  return (
    <TextInput
      style={[styles.ti2, props.styles]}
      value={props.value}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureTextEntry}
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
    paddingLeft:6
  },
});
