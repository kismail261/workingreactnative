import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
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
        style={[styles.ti, style]}
        {...rest}
        placeholderTextColor={'#707070'}
        onSubmitEditing={onSubmit}
        onChangeText={(value) => setInput(value)}
        value={input}
      />
      <View style={styles.iconCont}>
        <Icon color="#375A97" size={17} name="search-outline" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 49,
    //justifyContent: 'space-between',
    borderRadius: 7,
    borderColor: '#15488F1A',
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
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
    backgroundColor: 'white',
    height: '100%',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderColor: '#15488F1A',
  },
});
