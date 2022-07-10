import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FONTS} from '../../../constant';

// interface Props {
//   name?: string;
//   onPress?():void
// }

export const Dropdown = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.main}>
      <Text style={styles.text}>{props.name}</Text>
      <Icon name="chevron-down-outline" size={10} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    borderColor: '#70707026',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    height: 46,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#707070',
    fontFamily: FONTS.SFRegular,
    fontSize: 14,
  },
});
