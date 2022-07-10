import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const CheckBox = ({value, getValue, pageName}) => {
  function onStateSet() {
    getValue(!value);
  }
  return (
    <TouchableOpacity
      disabled={value}
      onPress={onStateSet}
      style={[styles.main, !value && styles.inactive, value && styles.active]}>
      <Icon name="checkmark-outline" size={10} color={'white'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    width: 14,
    height: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactive: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#15488F26',
  },
  active: {
    backgroundColor: '#64C41E',
  },
});
