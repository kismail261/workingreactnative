import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { FONTS } from '../../../../constant';
import { setSearchText } from '../../../../redux/listing/listing.action';


export const Searchbar = props => {
  const { style, ...rest } = props;
  const dispatch = useDispatch()
  const [input, setInput] = useState('');

  const onSubmit = () => {
    dispatch(setSearchText(input))
    props.navigation.navigate("userBottomTab")
    setInput('')
  }

  return (
    <View style={styles.main}>
      <TextInput
        style={[styles.ti]}
        {...rest}
        placeholderTextColor={'rgba(112, 112, 112, 0.5)'}
        onSubmitEditing={onSubmit}
        onChangeText={(value) => setInput(value)}
        value={input}
      />
      <TouchableOpacity onPress={onSubmit} style={styles.iconCont}>
        <Icon color="#375A97" size={17} name="search-outline" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 49,
    borderRadius: 7,
    borderColor: '#15488F1A',
  },
  ti: {
    width: '83%',
    backgroundColor: 'white',
    height: '100%',
    padding: 10,
    paddingLeft: 15,
    borderColor: '#15488F1A',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    fontFamily: FONTS.SFRegular,
  },
  iconCont: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderColor: '#15488F1A',
  },
});
