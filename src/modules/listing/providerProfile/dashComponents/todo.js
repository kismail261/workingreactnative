import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { FONTS } from '../../../../constant';
import { showMessage } from '../../../../helpers/replaceDigitsWithAesteriks';

export const DashTodo = props => {
  const { name, quantity } = props;
  return (
    <TouchableOpacity onPress={() => showMessage("Comming soon in version 2")} style={styles.main}>
      <View style={styles.inner}>
        <Text style={styles.name}>{name ?? 'Unread Messages'}</Text>
        <View style={styles.qCard}>
          <Text style={styles.text}>{quantity ?? 0}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    borderColor: '#70707026',
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  text: {
    color: '#2C99C6',
    fontSize: 14,
    fontFamily: FONTS.SFSemiBold,
  },
  name: {
    color: 'black',
    fontSize: 14,
    fontFamily: FONTS.SFMedium,
  },
  qCard: {
    borderRadius: 30,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7FC1DC',
  },
});
