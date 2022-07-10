import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONTS, ICONS } from '../../../../constant';

export const ExploreEventCard = props => {
  const { name, listings, img, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.main}>
      <Image source={img} style={styles.img} />
      <View style={styles.col}>
        <Text numberOfLines={2} style={styles.name}>{name}</Text>
        <Text style={styles.listing}>{listings + ' listings'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
    marginVertical: 6,
  },
  img: {
    width: wp('25'),
    height: wp('25'),
    borderRadius: 7,
    marginRight: 8,
  },
  col: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 85,
  },
  name: {
    width: wp('33'),
    fontFamily: FONTS.SFBold,
    fontSize: wp('5'),
    color: 'black',
    marginBottom: 5,
  },
  listing: {
    width: wp('33'),
    fontFamily: FONTS.SFRegular,
    color: '#595959',
    fontSize: wp('2.5'),
  },
});
