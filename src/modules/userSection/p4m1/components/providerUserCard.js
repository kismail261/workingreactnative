import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONTS, ICONS} from '../../../../constant';

export const ProviderUserCard = props => {
  const navigation = props.navigation;
  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={{
          marginTop: 18,
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          marginBottom: 20.5,
        }}
        onPress={() => navigation.navigate('userProfileDetail')}>
        <Image source={props.img} style={[styles.dp, {marginRight: wp('3')}]} />
        <View>
          <Text style={styles.name}>{props.name ?? 'n/a'}</Text>
          <Text style={styles.email}>{props.email ?? 'n/a'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    borderColor: '#15488F1A',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    width: '100%',
  },
  divider: {
    borderWidth: 1,
    borderColor: '#707070',
    opacity: 0.08,
  },
  name: {
    fontSize: wp('5'),
    fontFamily: FONTS.SFSemiBold,
    color: 'black',
  },
  email: {
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFMedium,
    color: '#707070',
  },
  steps: {
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFMedium,
    color: 'black',
  },
  complete: {
    fontSize: wp('3'),
    fontFamily: FONTS.SFRegular,
    color: '#707070',
    marginBottom: 18,
  },
  dp: {
    height: wp('11'),
    width: wp('11'),
    borderRadius: wp('11'),
  },
});
