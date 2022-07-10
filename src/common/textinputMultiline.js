import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const MyTextinputMultiline = props => {
  return (
    <TextInput
      maxLength={1000}
      numberOfLines={4}
      multiline={true}
      style={[styles.ti, props.styles]}
      value={props.value}
      placeholder={props.placeholder}
      placeholderTextColor={'rgba(112, 112, 112, 0.5)'}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  ti: {
    minHeight: 92,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    color: '#707070',
    fontSize: wp('3.2'),
    textAlignVertical: 'top',
    width: '100%',
  },
});
