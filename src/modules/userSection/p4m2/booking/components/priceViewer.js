import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { FONTS } from '../../../../../constant';

const Item = props => {
  return (
    <View style={[styles.row, props.bold && { borderBottomWidth: 0 }]}>
      <Text style={[styles.name, props.bold && styles.nameBold]}>
        {props.name}
      </Text>
      <Text style={[styles.name, props.bold && styles.nameBold]}>
        ${props.amount}
      </Text>
    </View>
  );
};

export const PriceViewer = props => {
  const renderItem = ({ item }) => {
    return <Item name={item.name} amount={item.amount} />;
  };
  return (
    <View style={styles.main}>
      <View style={{ width: '90%' }}>
        <FlatList
          nestedScrollEnabled={true}
          renderItem={renderItem} data={props.data} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    borderRadius: 4,
    backgroundColor: '#D7F0FD',
    alignItems: 'center',
    paddingVertical: 10,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    paddingVertical: 5,
    width: '100%',
    flexDirection: 'row',
  },
  nameBold: {
    fontFamily: FONTS.SFBold,
    fontSize: 14,
  },
  name: {
    fontFamily: FONTS.SFRegular,
    fontSize: 14,
  },
});
