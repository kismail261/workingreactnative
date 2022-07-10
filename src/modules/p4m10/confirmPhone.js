import React from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ButtonRegular} from '../../common/btnRegular';
import {MyTextinput} from '../../common/textinput';
import {FONTS} from '../../constant';
import {Dropdown} from '../p3m8/components/dropdown';

export const ConfirmPhone = () => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '90%', marginTop: 20}}>
        <Text style={[styles.title, {marginBottom: 8}]}>
          Confirm your phone number{' '}
        </Text>
        <Text style={[styles.desc, {marginBottom: 0}]}>
          Enter the four-digit code we sent to your phoneto confirm your number
        </Text>
      </View>

      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 40,
        }}>
        <View style={{width: '20%'}}>
          <MyTextinput />
        </View>
        <View style={{width: '20%'}}>
          <MyTextinput />
        </View>
        <View style={{width: '20%'}}>
          <MyTextinput />
        </View>
        <View style={{width: '20%'}}>
          <MyTextinput />
        </View>
      </View>
      <View style={{width: '90%', marginTop: 23, alignSelf: 'center'}}>
        <ButtonRegular blue title="Next" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  title: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 26,
  },
  desc: {
    fontFamily: FONTS.SFMedium,
    color: '#707070',
  },
  field: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 14,
    marginBottom: 5,
  },
});
