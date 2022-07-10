import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../../../constant';

export const CancellationPolicy = () => {
  var desc =
    'Users can cancel and receive a refund up to “24 hours” before the start date (excluding processing fees).';
  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '80%', marginTop: 20}}>
        <Text style={[styles.head, {marginBottom: 20}]}>
          {'Please read the cancellation policy'}
        </Text>
        <Text style={styles.desc}>{desc}</Text>
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
  desc: {
    fontFamily: FONTS.SFRegular,
    color: 'black',
    fontSize: 16,
  },
  head: {
    fontFamily: FONTS.SFSemiBold,
    color: 'black',
    fontSize: 24,
  },
  divider: {
    borderWidth: 0.25,
    color: 'black',
    marginTop: 20,
  },
});
