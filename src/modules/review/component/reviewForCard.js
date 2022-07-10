import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONTS, ICONS } from '../../../constant';


export const ReviewForCard = ({ item, onClick }) => {
  //onClick(item.id)
  return (
    <>
      <TouchableOpacity style={styles.main} onPress={() => onClick(item.id)}>
          <Image source={ICONS.userIcon} style={styles.img} />
        <Text numberOfLines={1} style={styles.txt}>{item.name}</Text>
        <View style={styles.crossCont}>
          <Image source={ICONS.crossRed} style={styles.cross} />
        </View>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  main: {
    width: wp('22'),
    height: 35,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 3
  },
  img: {
    height: wp('5'),
    width: wp('5'),
    marginRight: 5,
    borderRadius: 20,
  },
  cross: {
    height: 12.3,
    width: 12.3,
    borderRadius: 12.3,
  },
  crossCont: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  txt: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('2.5'),
    color: '#373737',
  },
});
