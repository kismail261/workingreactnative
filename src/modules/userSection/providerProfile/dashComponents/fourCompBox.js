import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {FONTS} from '../../../../constant';

export const FourCompBox = props => {
  const {title1, val1, title2, val2, title3, val3, title4, val4} = props;
  return (
    <View style={[styles.main]}>
      <View style={[styles.row, {marginBottom: 21}]}>
        <View style={styles.col}>
          <Text style={styles.valText}>{val1 ?? 'Value 1'}</Text>
          <Text style={styles.subText}>{title1 ?? 'Title 1'}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.valText}>{val2 ?? 'Value 2'}</Text>
          <Text style={styles.subText}>{title2 ?? 'Title 2'}</Text>
        </View>
      </View>
      <View style={[styles.row]}>
        <View style={styles.col}>
          <Text style={styles.valText}>{val3 ?? 'Value 3'}</Text>
          <Text style={styles.subText}>{title3 ?? 'Title 3'}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.valText}>{val4 ?? 'Value 4'}</Text>
          <Text style={styles.subText}>{title4 ?? 'Title 4'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    borderRadius: 7,
    minHeight: 147,
    borderWidth: 1,
    borderColor: '#70707026',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  valText: {
    fontFamily: FONTS.SFBold,
    fontSize: 22,
    color: 'black',
  },
  subText: {
    fontFamily: FONTS.SFRegular,
    fontSize: 12,
    color: 'black',
    opacity: 0.51,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    //borderWidth: 1,
  },
  col: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '40%',
  },
});
