import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONTS} from '../../../constant';

const infoItemEmergency = ({img, label, value}) => {
  return (
    <View style={styles.container}>
      <Image
        source={img}
        // style={{width: wp('8'), height: wp('8')}}
        style={{width: 20, height: 20}}
        resizeMode="contain"
      />
      <View style={{width: '87%'}}>
        <Text style={styles.labelStyle}>{label}</Text>
        <View style={styles.subLabelRows}>
          <Text style={[styles.labelStyle, {fontSize: wp('4')}]}>Name :</Text>
          <Text style={{width: 12}}></Text>
          <Text style={styles.valueStyle}>{value.name}</Text>
        </View>
        <View style={styles.subLabelRows}>
          <Text style={[styles.labelStyle, {fontSize: wp('4')}]}>
            Relation :
          </Text>
          <Text style={{width: 12}}></Text>
          <Text style={styles.valueStyle}>{value.position}</Text>
        </View>
        <View style={styles.subLabelRows}>
          <Text style={[styles.labelStyle, {fontSize: wp('4')}]}>Cell :</Text>
          <Text style={{width: 12}}></Text>
          <Text style={styles.valueStyle}>{value.phone}</Text>
        </View>
        <View style={styles.subLabelRows}>
          <Text style={[styles.labelStyle, {fontSize: wp('4')}]}>Email :</Text>
          <Text style={{width: 12}}></Text>
          <Text style={styles.valueStyle}>{value.email}</Text>
        </View>
      </View>
    </View>
  );
};

export default infoItemEmergency;

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
  subLabelRows: {
    width: '87%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
});
