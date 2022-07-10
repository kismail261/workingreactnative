import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import {FONTS, ICONS} from '../../../constant';

const sporforyaMsgItem = ({navigation, data}) => {
  const {message, createdAt} = data;

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.replace('chatWithSfy')}
      style={styles.container}>
      <View style={{width: wp('5')}} />
      <Image
        source={require('../../../assets/images/sfyChatLogo.png')}
        style={{width: wp('12'), height: wp('12')}}
      />
      <View style={{width: 10}} />
      <View style={{width: wp('73')}}>
        <View
          style={{
            width: wp('73'),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text numberOfLines={1} style={styles.nameStyle}>
            Sporforya Support
          </Text>
          <Text style={styles.timeStyle}>
            {moment(createdAt).format('hh:mm A')}
          </Text>
        </View>
        <View
          style={{
            width: wp('73'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 3,
            alignItems: 'center',
          }}>
          <Text style={styles.msgStyle}>{message}</Text>
          <Image
            source={ICONS.doneBlue}
            style={{width: 10, height: 10}}
            resizeMode={'contain'}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default sporforyaMsgItem;

const styles = StyleSheet.create({
  container: {
    width: wp('100'),
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    elevation: 3,
  },
  msgIndicator: {
    width: 11,
    height: 11,
    backgroundColor: '#FF7D7D',
    borderRadius: 6,
    position: 'absolute',
    top: -1,
    left: -1,
  },
  nameStyle: {
    width: '80%',
    color: '#000000',
    fontSize: wp('4.2'),
    fontFamily: FONTS.SFMedium,
  },
  timeStyle: {
    color: '#9A9A9A',
    fontSize: wp('2.5'),
    fontFamily: FONTS.SFRegular,
  },
  msgStyle: {
    width: '80%',
    color: '#B2B2B2',
    fontSize: wp('3'),
    fontFamily: FONTS.SFRegular,
    maxHeight: hp(4),
  },
  msgCount: {
    width: 16,
    height: 16,
    backgroundColor: '#67C621',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: '#FFFFFF',
    fontSize: wp('2'),
    fontFamily: FONTS.SFMedium,
  },
});
