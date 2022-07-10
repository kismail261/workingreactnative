import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {ICONS} from '../constant';
import React from 'react';
import {useSelector} from 'react-redux';

const HeaderLogoBI = ({navigation, pageName}) => {
  const token = useSelector(state => state.user.token);
  return (
    <View style={styles.headerStyle}>
      <Image source={ICONS.logoSP} style={styles.logoStyle} />
      <View style={{width: wp('5')}} />
      <Image style={styles.msgIconStyle} resizeMode="contain" />
      {pageName !== 'SportsExplore' ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(token == null ? 'authRoute' : 'Notifications');
          }}>
          <Image
            source={ICONS.notificationIcon}
            style={styles.bellIconStyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default HeaderLogoBI;

const styles = StyleSheet.create({
  headerStyle: {
    width: wp('90'),
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 35 : 0,
    borderBottomColor: '#70707026',
    borderBottomWidth: 0.7,
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
