import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';
import { FONTS, ICONS } from '../constant';

const headerBLC = ({ navigation, label }) => {
  return (
    <View style={styles.container}>
      <View />
      <View style={styles.labelRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ICONS.backArrow} style={{ width: wp('3.5'),
        height: wp('6') }} resizeMode='contain' />
        </TouchableOpacity>

        <Text style={styles.labelStyle}>{label}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ICONS.blackCross} style={{ width: wp('4.5'),
        height: wp('8'), }} resizeMode='contain' />
        </TouchableOpacity>
      </View>
      <View style={{ width: wp('100'), height: 1, backgroundColor: '#7B9CFE4D' }} />
    </View>
  );
};

export default headerBLC;

const styles = StyleSheet.create({
  container: {
    width: wp('100'),
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelRow: {
    width: wp('80'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelStyle: {
    color: '#000000',
    fontSize: wp('5'),
    fontFamily: FONTS.SFBold,
  },
});
