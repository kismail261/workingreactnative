import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { FONTS, ICONS, ImageUrl } from '../../../../constant';

export const MyChildCard = ({ data, navigation, deleteChild }) => {
  return (
    <View style={styles.main}>
      <View style={styles.row1}>
        <Image source={data.avatar != undefined ? { uri: ImageUrl + data.avatar } : ICONS.userIcon} style={[styles.dp]} />
        <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <Text numberOfLines={1} style={[styles.txt]}>{data.firstName} {data.lastName}</Text>
          <Text style={[styles.rel]}>{data.firstName}</Text>
        </View>
      </View>
      <View style={styles.row1}>
        <TouchableOpacity onPress={() => deleteChild(data._id)} >
          <Image source={ICONS.bin} style={[styles.bin, { marginRight: 5 }]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("UpdateChlid", { data: data })} >
          <Image source={ICONS.editableIconBlue} style={styles.bin} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 67,
    borderRadius: 4,
    backgroundColor: 'white',
    marginBottom: 10,
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
  rel: {
    fontFamily: FONTS.SFRegular,
    fontSize: 13,
    color: '#707070',
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
