import React from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONTS, ICONS } from '../../../../constant';


const Avatar = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
      <Image source={ICONS.userIcon} style={styles.avatar} />
      <Image source={ICONS.edit} style={styles.edit} />
    </TouchableOpacity>
  );
};

export const ProfileHead = props => {

  return (
    <SafeAreaView style={styles.main}>
      <View style={{ marginLeft: 26 }}>
        <Avatar />
      </View>
      <View style={{ alignItems: 'flex-start', marginLeft: 23 }}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.editProfile}>
          Edit Profile
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 33,
    backgroundColor: 'transparent',
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 60,
  },
  edit: {
    height: 21,
    width: 21,
    marginLeft: -15,
  },
  name: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('8'),
    color: 'black',
  },
  editProfile: {
    fontFamily: FONTS.SFMedium,
    fontSize: wp('3.5'),
    color: '#288DB6',
    textDecorationLine: 'underline',
    marginTop: 7,
  },
});
