import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {FONTS} from '../../../constant';

const FAQ = props => {
  return (
    <View style={{marginTop: 30}}>
      <Text style={[styles.que, {marginBottom: 8}]}>{props.que ?? ''}</Text>
      <Text style={[styles.ans]}>
        {props.ans ??
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
      </Text>
      <View style={styles.div} />
    </View>
  );
};

export const FAQS = () => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '80%'}}>
        <FAQ que="How can I reach to location?" />
        <FAQ que="What should you carry in training?" />
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
  que: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 19,
    color: '#000000',
  },
  ans: {
    fontFamily: FONTS.SFRegular,
    color: '#707070',
    fontSize: 14,
  },
  div: {
    borderWidth: 0.3,
    borderColor: 'black',
    marginTop: 15,
  },
});
