import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {FONTS} from '../../../constant';
import Icon from 'react-native-vector-icons/Ionicons';

export const PolicyCard = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.main}>
      <View style={{width: '79%', alignItems: 'flex-start'}}>
        <Text style={[styles.title, {marginBottom: 6}]}>
          {props.name ?? 'Name'}
        </Text>
        <Text style={[styles.desc, {marginBottom: 6}]}>
          {props.desc ?? 'Some description'}
        </Text>
      </View>
      <View
        style={{width: '20%', alignItems: 'center', justifyContent: 'center'}}>
        <Icon name="chevron-forward-outline" size={20} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#666666',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 21,
  },
  desc: {
    fontFamily: FONTS.SFRegular,
    fontSize: 15,
  },
});
