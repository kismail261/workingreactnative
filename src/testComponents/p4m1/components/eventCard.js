import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FONTS, ICONS, ImageUrl } from '../../../../constant';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import moment from 'moment';

export const SportsEventCard = ({ listings, navigation }) => {
  const nth = d => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const formatDate = rawDate => {
    const date = new Date(rawDate);

    const month = new Array(12);
    month[0] = 'January';
    month[1] = 'February';
    month[2] = 'March';
    month[3] = 'April';
    month[4] = 'May';
    month[5] = 'June';
    month[6] = 'July';
    month[7] = 'August';
    month[8] = 'September';
    month[9] = 'October';
    month[10] = 'November';
    month[11] = 'December';

    const day = date.getDay();
    const monthName = month[date.getMonth()];
    const year = date.getFullYear();
    const suffix = nth(day);

    return `${day}${suffix} ${monthName} ${year}`;
  };

  //AsyncStorage.setItem('eventCardId', listing._id);
  // navigation.navigate('AddChild');

  return (
    <TouchableOpacity>
      {listings ? (
        listings.map(listing => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SportsEventDetails', { listId: listing._id });
            }}
            style={styles.main}
            key={listing._id}>
            <ImageBackground
              borderRadius={4}
              source={listing.images.length > 0 ? { uri: ImageUrl + listing.images[0] } : ICONS.listingImage}
              style={styles.img}>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Image
                  source={ICONS.verifiedBadge}
                  style={styles.verifiedImg}
                />
                <Icon name="heart-outline" size={20} color="#FFFFFFD9" />
              </View>
            </ImageBackground>
            <View
              style={{
                marginTop: 13,
                flexDirection: 'row',
                alignItems: 'flex-end',
                width: '100%',
              }}>
              <Image source={ICONS.starBlue} style={styles.startIcon} />
              <Text style={styles.gainedRating}>{listing.avgRating}</Text>
              <Text style={styles.totalRating}>/10</Text>
            </View>
            <View style={{ marginTop: 10, width: '100%' }}>
              <Text style={styles.title}>{listing.title}</Text>
            </View>
            <View style={{ marginTop: 4, width: '100%' }}>
              <Text style={styles.address}>
                {listing.location
                  ? listing.location.shortName
                  : 'n/a'}
              </Text>
            </View>
            <View style={{ marginTop: 4, width: '100%' }}>
              <Text style={styles.date}>
                {listing.schedules.length > 0
                  ? moment(listing.schedules[0].duration.start).format('DD MMMM YYYY')
                  : 'n/a'}{' '}
                -{' '}
                {listing.schedules.length > 0
                  ? moment(listing.schedules[0].duration.end).format('DD MMMM YYYY')
                  : 'n/a'}
              </Text>
            </View>
            <View style={{ marginTop: 9, width: '100%' }}>
              <Text style={styles.amount}>
                ${' '}
                {listing.schedules.length > 0
                  ? listing.schedules[0].pricing.price
                    ? listing.schedules[0].pricing.price
                    : 'n/a'
                  : 'n/a'}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View></View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 11,
  },
  img: {
    height: 171,
    width: '100%',
    alignItems: 'center',
  },
  verifiedImg: {
    height: 20.79,
    width: 16.86,
  },
  startIcon: {
    height: 16.75,
    width: 17.48,
    marginRight: 5,
  },
  gainedRating: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('3.5'),
    color: 'black',
  },
  totalRating: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('2'),
    color: 'black',
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('6'),
    color: 'black',
  },
  address: {
    fontFamily: FONTS.SFMedium,
    fontSize: wp('3.5'),
    color: 'black',
  },
  date: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('2.8'),
    color: 'black',
  },
  amount: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('4.5'),
    color: 'black',
  },
});
