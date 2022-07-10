import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import {FONTS, ICONS} from '../../../../constant';
import {CheckBox} from '../../../taxinformation/components/checkbox';

export const ContactCard = props => {
  const {deleteMode, addMode} = props;
  return (
    <View style={styles.main}>
      <View style={styles.row1}>
        {addMode && <CheckBox />}
        <Image
          source={ICONS.userIcon}
          style={[styles.dp, addMode && {marginLeft: 5}]}
        />
        <Text style={[styles.txt]}>{props.name ?? 'John Doe'}</Text>
      </View>
      <TouchableOpacity onPress={props.onPress}>
        {deleteMode && <Image source={ICONS.bin} style={styles.bin} />}
        {addMode && (
          <View style={styles.btn}>
            <Text style={styles.btnTxt}>Add</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.4,
  },
  bin: {
    width: 26,
    height: 26,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dp: {
    height: 49,
    width: 49,
    borderRadius: 49,
    marginRight: 9,
  },
  txt: {
    fontFamily: FONTS.SFRegular,
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#BEBEBE',
    borderColor: '#70707026',
    height: 22,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
  },
  btnTxt: {
    fontSize: 10,
    fontFamily: FONTS.SFRegular,
    color: 'black',
  },
});
