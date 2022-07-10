import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONTS, ICONS} from '../../../constant';

const headerCross = ({navigation, label,}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ICONS.backArrow} style={{ width: wp('3.5'),
        height: wp('6')}} resizeMode='contain' />
        </TouchableOpacity>
        <Text style={styles.labelStyle}>{label}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ICONS.blackCross} style={{width: wp('4.5'),
        height: wp('8')}} resizeMode='contain' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default headerCross;

const styles = StyleSheet.create({
  container: {
    width: wp('100'),
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#0343CB1C',
    borderBottomWidth: 1,
    marginTop: Platform.OS == 'ios' ? 30 : 0,
  },
  labelRow: {
    width: wp('85'),
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
