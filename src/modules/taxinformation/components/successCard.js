import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {FONTS, ICONS} from '../../../constant';

export const SuccessCard = props => {
  const {onPress, title} = props;
  return (
    <View onPress={onPress} style={styles.main}>
      <Image source={ICONS.confirmed_white} style={styles.icon} />
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity onPress={onPress} style={styles.crossView}>
        <Image source={ICONS.crossRed} style={styles.cross} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#21D17F',
    borderWidth: 1,
    borderColor: '#15488F26',
    height: 42,
    padding: 10,
    borderRadius: 4,
  },
  text: {
    fontFamily: FONTS.SFRegular,
    fontSize: 14,
    color: 'white',
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 7,
  },
  cross: {
    height: 23.51,
    width: 23.51,
  },
  crossView: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
});
