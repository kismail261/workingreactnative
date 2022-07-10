import moment from 'moment';
import React, {useEffect} from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONTS, ICONS, ImageUrl} from '../../../../constant';

export const ListingsCard = ({data, navigation}) => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ListingDetail', {listId: data._id})}
      style={styles.main}>
      <View>
        <Image
          source={
            data.images.length > 0
              ? {uri: ImageUrl + data.images[0]}
              : ICONS.listingImage
          }
          style={{height: wp('32'), width: wp('32')}}
          borderRadius={wp('2')}
        />
      </View>
      <View style={{width: '61%', paddingVertical: 2}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            marginBottom: 2,
          }}>
          <Image
            source={ICONS.starBlue}
            style={{height: 12.5, width: 13.04, marginRight: 5}}
          />
          <Text style={[styles.boldText, {fontSize: wp('3')}]}>
            {data.avgRating}
          </Text>
          <Text style={[styles.semiBoldText, {fontSize: wp('1.8')}]}>/10</Text>
        </View>
        <Text
          numberOfLines={1}
          style={[styles.boldText, {fontSize: wp('5.5')}]}>
          {data.title ?? 'n/a'}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.mediumText, {fontSize: wp('3.4')}]}>
          {data.location == undefined ? 'n/a' : data.location.shortName}
        </Text>
        {data.schedules.length > 0 ? (
          <>
            <Text
              style={[
                styles.regularText,
                {fontSize: wp('2.2'), marginBottom: 4, marginTop: 4},
              ]}>
              {moment(data.schedules[0].duration.start).format(' DD MMM, YYYY')}{' '}
              - {moment(data.schedules[0].duration.end).format(' DD MMM, YYYY')}
            </Text>

            <Text style={[styles.boldText, {fontSize: wp('2.8')}]}>
              $ {data.schedules[0].pricing.price}
            </Text>
          </>
        ) : (
          <>
            <Text
              style={[
                styles.regularText,
                {fontSize: wp('2.2'), marginBottom: 4, marginTop: 4},
              ]}>
              n/a - n/a
            </Text>

            <Text style={[styles.boldText, {fontSize: wp('2.8')}]}>US n/a</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    width: wp('90'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 7,
  },
  boldText: {
    color: '#000000',
    fontFamily: FONTS.SFBold,
  },
  semiBoldText: {
    fontFamily: FONTS.SFSemiBold,
  },
  regularText: {
    color: '#000000',
    fontFamily: FONTS.SFRegular,
  },
  mediumText: {
    color: '#000000',
    fontFamily: FONTS.SFMedium,
  },
});
