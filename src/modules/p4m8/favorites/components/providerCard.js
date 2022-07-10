import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Text} from 'react-native';
import {View} from 'react-native';
import {FONTS, ICONS} from '../../../../constant';
import {Avatar} from './avatar';
import Icon from 'react-native-vector-icons/Ionicons';

export const ProviderCard = () => {
  return (
    <View style={styles.main}>
      <View style={{width: '22%'}}>
        <Avatar />
      </View>
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '74%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text style={[styles.name, {marginBottom: 5}]}>John Die</Text>
          <Icon name="heart" color="#FC204A" size={20} />
        </View>
        <Text style={[styles.skills, {marginBottom: 5}]}>
          Skill Sharer | Trainer / Coach / Instructor
        </Text>
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            },
          ]}>
          <Image
            source={ICONS.starBlue}
            style={[styles.star, {marginRight: 5}]}
          />
          <Text style={[styles.rbig]}>9.8</Text>
          <Text style={[styles.rsmall]}>/10</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: FONTS.SFBold,
  },
  skills: {
    fontSize: 14,
    fontFamily: FONTS.SFMedium,
  },
  rbig: {
    fontFamily: FONTS.SFBold,
    fontSize: 16,
  },
  rsmall: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 8,
  },
  star: {
    width: 17.48,
    height: 16.75,
  },
});
