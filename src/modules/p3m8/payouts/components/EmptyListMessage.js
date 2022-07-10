import React from 'react';
import {StyleSheet, Text} from 'react-native';

const EmptyListMessage = () => {
  // Flat List Item
  return <Text style={styles.emptyListStyle}>No Data Found</Text>;
};
const styles = StyleSheet.create({
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
  },
});
export default EmptyListMessage;
