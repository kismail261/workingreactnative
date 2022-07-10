import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ICONS} from '../../../constant';
const index = ({navigation}) => {
  return (
    <View style={styles.headerStyle}>
      <Image source={ICONS.logoSP} style={styles.logoStyle} />
      <View style={{width: wp('5')}} />
      <View style={styles.msgIconStyle} />
      <TouchableOpacity
        onPress={() => navigation.navigate('notificationsList')}>
        <Image
          source={ICONS.notificationIcon}
          style={styles.bellIconStyle}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  headerStyle: {
    width: wp('90'),
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS == 'ios' ? 30 : 0,
  },
  logoStyle: {
    marginLeft: wp('-2.5'),
    width: 183,
    height: 32,
  },
  msgIconStyle: {
    width: wp('9'),
    height: wp('5.7'),
  },
  bellIconStyle: {
    width: wp('5.7'),
    height: wp('7'),
  },
});
