import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {FONTS} from '../../../constant';
import {Avatar} from '../components/avatar';

export const ReviewCard = props => {
  var desc =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.';
  return (
    <View style={[styles.main, props.style]}>
      <View style={styles.row}>
        <Avatar notEditable small />
        <View style={{marginLeft: 10}}>
          <Text style={[styles.name, {}]}>{props.name ?? 'John Doe'}</Text>
          <Text style={styles.days}>
            {props.days ?? '0'} {'days ago'}
          </Text>
        </View>
      </View>
      <View style={{marginTop: 17, width: '90%'}}>
        <Text style={styles.desc}>{props.desc ?? desc}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    minHeight: 193,
    borderColor: '#15488F26',
    borderWidth: 1,
    backgroundColor: 'white',
    width: 249,
    alignItems: 'center',
    borderRadius: 7,
  },
  row: {
    marginTop: 17,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  name: {
    fontFamily: FONTS.SFMedium,
    fontSize: 16,
    color: 'black',
  },
  days: {
    fontFamily: FONTS.SFMedium,
    fontSize: 14,
    color: 'black',
    opacity: 0.42,
  },
  desc: {
    fontFamily: FONTS.SFRegular,
    fontSize: 14,
    color: 'black',
  },
});
