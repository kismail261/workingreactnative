import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {View} from 'react-native-animatable';
import {FONTS} from '../../../../constant';

export const FieldTitle = props => {
  const {imageSource, imageStyles, name} = props;
  return (
    <View style={styles.main}>
      <Image source={imageSource} style={[{marginRight: 6}, imageStyles]} />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontFamily: FONTS.SFSemiBold,
  },
});
