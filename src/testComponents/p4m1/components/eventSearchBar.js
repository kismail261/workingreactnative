import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FONTS} from '../../../../constant';

export const EventSearchbar = props => {
  const {style, ...rest} = props;
  function onFilterPress() {
    props.navigation.navigate("SportsFilter")
  }
  return (
    <View style={styles.main}>
      <TextInput
        style={[styles.ti, style]}
        {...rest}
        placeholderTextColor={'#707070'}
        onChangeText={(value) => props.getValue(value)}
        value={props.value}
      />
      <View style={styles.divider} />
      <TouchableOpacity onPress={onFilterPress} style={styles.iconCont}>
        <Icon color="#375A97" size={17} name="filter-outline" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 49,
    //justifyContent: 'space-between',
    borderRadius: 4,
    borderColor: '#15488F1A ',
  },
  ti: {
    //borderWidth: 1,
    width: '80%',
    backgroundColor: 'white',
    height: '100%',
    padding: 10,
    borderColor: '#15488F1A',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    fontFamily: FONTS.SFRegular,
  },
  iconCont: {
    width: '19%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
    backgroundColor: 'white',
    height: '100%',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderColor: '#15488F1A',
  },
  divider: {
    borderWidth: 0.5,
    borderColor: '#2C99C6',
    alignSelf: 'center',
    height: '80%',
  },
});
