import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { FONTS } from '../../../../../constant';
import { CheckBox } from '../../../../taxinformation/components/checkbox';


export const ScheduleCard = ({ value, data, getSelection }) => {
  const onClick = () => {
    getSelection(data._id)
  }

  return (
    <TouchableOpacity onPress={onClick} style={styles.main}>
      <View style={[{ width: '90%', marginTop: 13 }, styles.row]}>
        <Text style={styles.name}>{data.name}</Text>
        <CheckBox value={value == data._id} />
      </View>
      <View style={[{ width: '90%', marginTop: 8 }]}>
        <Text style={styles.date}>
          Date: {moment(data.duration.start).format('ddd DD MMM')} - {moment(data.duration.end).format('ddd DD MMM')} {moment(data.duration.end).format('YYYY')}
        </Text>
      </View>
      <View style={[{ width: '90%', marginTop: 4 }]}>
        <Text style={styles.date}>
          Time: {moment(data.duration.start).format('hh:mm A')} - {moment(data.duration.end).format('hh:mm A')}
        </Text>
      </View>
      <View
        style={[
          {
            width: '90%',
            marginTop: 22,
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}>
        <Text style={styles.price}>US ${data.pricing.price}</Text>
        <Text style={styles.type}>/{data.pricing.per}</Text>

      </View>
      <View style={{ height: 13 }} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    borderColor: '#15488F26',
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 6,
    backgroundColor: 'white',
  },
  name: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 16,
    color: 'black',
  },
  date: {
    fontFamily: FONTS.SFRegular,
    fontSize: 13,
    color: '#707070',
  },
  price: {
    fontFamily: FONTS.SFBold,
    fontSize: 14,
    color: 'black',
  },
  type: {
    fontFamily: FONTS.SFBold,
    fontSize: 12,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
