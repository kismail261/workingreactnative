import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../../../../constant';

export const Avatar = props => {
  return (
    <View style={[styles.main, props.mainContainerStyles]}>
      <Image
        source={ICONS.userIcon}
        style={[styles.img]}
      />
      <View style={styles.edit}>
        <Image style={{height: 21, width: 15}} source={ICONS.verifiedBadge} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 67,
    width: 67,
    borderRadius: 67,
  },
  img: {
    height: 67,
    width: 67,
    borderRadius: 67,
  },
  edit: {
    height: 21,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -20,
  },
  small: {
    width: 35,
    height: 35,
    borderRadius: 35,
  },
});
