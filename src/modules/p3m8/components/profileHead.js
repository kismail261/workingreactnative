import React from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {FONTS, ICONS} from '../../../constant';

const Avatar = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{flexDirection: 'row', alignItems: 'flex-end'}}>
      <Image source={ICONS.userIcon} style={styles.avatar} />
      <Image source={ICONS.edit} style={styles.edit} />
    </TouchableOpacity>
  );
};

// interface ProfileHead {
//   name?: string;
//    onEditProfilePress?():void
// }

export const ProfileHead = props => {
  function onEditProfilePress() {
    props.navigation.navigate('editContactInfo');
  }
  return (
    <SafeAreaView style={styles.main}>
      <View style={{marginLeft: 26}}>
        <Avatar />
      </View>
      <View style={{alignItems: 'flex-start', marginLeft: 23}}>
        <Text style={styles.name}>{props.name ?? 'John Doe'}</Text>
        <Text onPress={onEditProfilePress} style={styles.editProfile}>
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
    fontSize: 32,
    color: 'black',
  },
  editProfile: {
    fontFamily: FONTS.SFMedium,
    fontSize: 14,
    color: '#288DB6',
    textDecorationLine: 'underline',
    marginTop: 7,
  },
});
