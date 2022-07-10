import React from 'react';
import {View, Text, StyleSheet,FlatList} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {FONTS} from '../../../../constant';



export const PaymentDetails = props => {
  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        <Text style={styles.head}>{props.type ?? 'Type'}</Text>
        <Text style={styles.val}>${props.payment ?? '0'}</Text>
      </View>
      <Text style={styles.date}>{props.date ?? '24 Nov, 2021'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginBottom: 30,
  },
  head: {
    fontFamily: FONTS.SFMedium,
    color: '#000000',
    fontSize: wp('4'),
  },
  date: {
    fontFamily: FONTS.SFRegular,
    color: '#3D3D3D',
    fontSize: wp('3.5'),
  },
  val: {
    fontFamily: FONTS.SFSemiBold,
    color: '#000000',
    fontSize: wp('4'),
  },
});
