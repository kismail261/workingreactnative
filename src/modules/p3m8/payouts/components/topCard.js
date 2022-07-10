import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import {FONTS} from '../../../../constant';



export const PaymentTopCard = () => {
  const pymentStats = useSelector(state => state.booking.pymentStats)


  return (
    <View style={styles.main}>
      <View style={[styles.row, {marginVertical:18}]}>
        <View style={styles.col1}>
          <Text style={styles.value}>${pymentStats != null ? pymentStats.monthly : 0}</Text>
          <Text style={styles.name}>Earnings September</Text>
        </View>
        <View style={styles.col2}>
          <Text style={styles.value}>${pymentStats != null ? pymentStats.annually : 0}k</Text>
          <Text style={styles.name}>Earnings 12 Months</Text>
        </View>
      </View>
      <View style={[styles.row,{marginBottom:18}]}>
        <View style={styles.col1}>
          <Text style={styles.value}>${pymentStats != null ? pymentStats.pending : 0}</Text>
          <Text style={styles.name}>Pending Payout</Text>
        </View>
        <View style={styles.col2}>
          <Text style={styles.value}>${pymentStats != null ? pymentStats.available : 0}</Text>
          <Text style={styles.name}>Available</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    borderColor: '#70707026',
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
    alignSelf: 'center',
  },
  value: {
    fontFamily: FONTS.SFSemiBold,
    color: '#000000',
    fontSize: wp(5.5),
  },
  name: {
    fontFamily: FONTS.SFRegular,
    color: '#000000',
    fontSize: wp('3'),
    opacity: 0.51,
  },
  row: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  col1: {
    width: '45%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  col2: {
    width: '45%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
