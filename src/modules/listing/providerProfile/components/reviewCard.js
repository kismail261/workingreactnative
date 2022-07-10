import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {FONTS, ICONS, ImageUrl} from '../../../../constant';

export const ReviewCard = ({data}) => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          marginBottom: 10,
        }}>
        <View
          style={{
            width: '12%',
            //borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '2%',
            marginLeft: '2%',
          }}>
          <Image
            source={
              data.sender.Profile.avatar != undefined
                ? {uri: ImageUrl + data.sender.Profile.avatar}
                : ICONS.userIcon
            }
            style={styles.dp}
          />
        </View>
        <View
          style={{justifyContent: 'center', width: '64%', marginRight: '1%'}}>
          <Text style={styles.name}>{data.sender.Profile.name}</Text>
          <Text style={styles.reviewOn}>Review on : {data.listing.title}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            width: '10%',
          }}>
          <Image
            source={ICONS.starBlue}
            style={{height: 12.5, width: 13.04, marginRight: 5}}
          />
          <Text style={[styles.boldText, {fontSize: 12}]}>
            {data.ratingScore.toFixed(2)}
          </Text>
          <Text style={[styles.semiBoldText, {fontSize: 6}]}>/10</Text>
        </View>
      </View>
      <View style={styles.divider}></View>
      <View style={{width: '90%', marginVertical: 10}}>
        <Text style={styles.desc}>{data.comments}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    minHeight: 140,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#70707026',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    alignItems: 'center',
  },
  name: {
    fontFamily: FONTS.SFBold,
    fontSize: 16,
  },
  name: {
    fontFamily: FONTS.SFBold,
    fontSize: 16,
  },
  reviewOn: {
    fontFamily: FONTS.SFRegular,
    fontSize: 11,
  },
  totalRating: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 6,
  },
  desc: {
    fontFamily: FONTS.SFRegular,
    fontSize: 12,
    opacity: 0.69,
  },
  divider: {
    backgroundColor: '#70707026',
    height: 1,
    width: '100%',
  },
  dp: {
    height: 34,
    width: 34,
    borderRadius: 34,
  },
});
