import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONTS} from '../../../constant';

const infoItem = ({img, label, value}) => {
  return (
    <View style={styles.container}>
      <Image
        source={img}
        // style={{width: wp('8'), height: wp('8'), marginTop: 6}}
        style={{width: 20, height: 20}}
        resizeMode="contain"
      />
      <View style={{width: '87%'}}>
        <Text style={styles.labelStyle}>{label}</Text>
        <Text style={styles.valueStyle}>{value}</Text>
      </View>
    </View>
  );
};

export default infoItem;

const styles = StyleSheet.create({
  container: {
    width: wp('90'),
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  labelStyle: {
    color: '#6B6B6B',
    fontSize: wp('3.7'),
    fontFamily: FONTS.SFMedium,
  },
  valueStyle: {
    color: '#000000',
    fontSize: wp('5'),
    fontFamily: FONTS.SFSemiBold,
  },
});
