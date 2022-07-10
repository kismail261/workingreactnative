import React from 'react';
import {View, FlatList, StyleSheet, Image, Text} from 'react-native';
import {ButtonRegular} from '../../../common/buttonRegular';
import {FONTS, ICONS} from '../../../constant';
import {ReviewCard} from './reviewCard';

export const ReviewComponent = () => {
  const data = [1, 2, 3];
  const renderItem = ({item}) => {
    return <ReviewCard style={{marginRight: 10}} />;
  };
  return (
    <View style={styles.main}>
      <View style={styles.row}>
        <Image
          source={ICONS.starBlue}
          style={[styles.star, {marginRight: 6}]}
        />
        <Text style={styles.totalReviews}>9.5</Text>
        <Text style={[styles.smallReviews, {marginRight: 11}]}>/10</Text>
        <Text style={styles.totalReviews}>(18 Reviews)</Text>
      </View>
      <FlatList data={data} renderItem={renderItem} horizontal />
      <View style={{alignSelf: 'center', width: '90%', marginTop: 38}}>
        <ButtonRegular
          buttonStyle={styles.btn}
          textStyle={styles.btnText}
          title="View All Reviews"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {},
  btn: {
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'transparent',
  },
  btnText: {
    color: '#000000',
  },
  totalReviews: {
    fontSize: 21,
    fontFamily: FONTS.SFBold,
    color: 'black',
  },
  smallReviews: {
    fontSize: 12,
    fontFamily: FONTS.SFBold,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
  },
  star: {
    width: 16.46,
    height: 15.77,
  },
});
