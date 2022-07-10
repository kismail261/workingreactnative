import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const SnapButton = props => {
  const {onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.main}>
      <Icon name="camera-outline" color="white" size={25} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 69,
    width: 69,
    borderRadius: 69,
    backgroundColor: '#2C99C6',
    shadowColor: '#180DBD29',
    shadowOffset: {},
    justifyContent: 'center',
    alignItems: 'center',
  },
});
