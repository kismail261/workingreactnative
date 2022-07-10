import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FONTS} from '../../../constant';

export const SliderCounter = props => {
  const {current} = props;
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <View style={styles.main}>
      {nums.map(num => {
        return (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.line}></View>
            <Text style={[styles.numNormal, current === num && styles.numBold]}>
              {num}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 9.6,
    borderColor: '#EBEBEB',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 5,
  },
  numNormal: {
    fontFamily: FONTS.SFMedium,
    fontSize: 7,
    color: '#6B6B6B',
  },
  numBold: {
    fontFamily: FONTS.SFMedium,
    fontSize: 13,
    color: '#6B6B6B',
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
