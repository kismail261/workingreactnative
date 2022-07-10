import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONTS, ICONS } from '../constant';
import Share from 'react-native-share';
import { showMessage } from '../helpers/replaceDigitsWithAesteriks';

const headerBLC = ({ navigation, label }) => {

  const onShare = async () => {
    const options = {
      title: 'Sporforya Booking',
      message:
        'Check out this booking on Sporforya , Booking :https://dev.sporforya.com',
    };
    try {
      Share.open(options)
        .then(res => {
          hideMenu();
          showMessage('Booking shared successfully', 'success', 'top')
        })
        .catch(err => {
          err && console.log(err);
        });
    } catch (error) {
      showMessage(error.message, 'warning', 'top');
    }
  };

  return (
    <View style={styles.container}>
      <View />
      <View style={styles.labelRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ICONS.backArrow} style={{ width: wp('3.5'),
        height: wp('6') }} resizeMode='contain' />
        </TouchableOpacity>

        <Text style={styles.labelStyle}>{label}</Text>
        <TouchableOpacity style={{ width: 20, height: 20, backgroundColor: '#2C99C6', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} onPress={onShare}>
          <Image source={ICONS.shareWhite} style={{ width: wp('3.5'),
        height: wp('6') }} resizeMode='contain' />
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
    marginTop: Platform.OS == 'ios' ? 30 : 0,
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
