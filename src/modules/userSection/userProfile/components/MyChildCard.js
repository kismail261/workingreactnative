import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONTS, ICONS, ImageUrl } from '../../../../constant';


export const MyChildCard = props => {
  const { _id, avatar, firstName, lastName } = props.detail
  return (
    <View style={styles.main}>
      <View style={styles.row1}>
        <Image source={avatar != undefined ? { uri: ImageUrl + avatar } : ICONS.userIcon} style={[styles.dp]} />
        <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <Text style={[styles.txt]}>{firstName} {lastName}</Text>
          <Text style={[styles.rel]}>Child</Text>
        </View>
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
    color:'#000000'
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
