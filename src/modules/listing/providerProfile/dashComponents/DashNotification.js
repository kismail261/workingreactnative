import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {FONTS, ICONS} from '../../../../constant';

export const DashNotification = props => {
  const {
    defaultIcon,
    customIconSource,
    customTitle,
    mainContainerStyle,
    onPress,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.main, mainContainerStyle]}>
      <View style={styles.outerViewIcon}>
        <View style={styles.iconCircle}>
          {defaultIcon && (
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Image source={ICONS.calendar} style={styles.icon} />
              <Image source={ICONS.notificationDot} style={styles.ndot} />
            </View>
          )}
          {!defaultIcon && (
            <Image source={customIconSource} style={styles.icon} />
          )}
        </View>
      </View>
      <Text style={styles.text}>
        {customTitle ?? "You've got two new bookings!"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    borderRadius: 7,
    height: 72,
    borderWidth: 1,
    borderColor: '#50BD00',
    backgroundColor: '#65C51FA3',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('4'),
    color: 'white',
    marginRight:8
  },
  icon: {
    width: 17,
    height: 17,
  },
  iconCircle: {
    width: 37,
    borderRadius: 37,
    height: 37,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerViewIcon: {
    marginRight: 11,
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#b7e39a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ndot: {
    height: 9,
    width: 9,
    marginLeft: -4,
  },
});
