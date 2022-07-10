import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FONTS, ICONS, ImageUrl} from '../../../../constant';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import moment from 'moment';
import {
  addFavourite,
  getfavouriteList,
} from '../../../../redux/favourite/favourite.action';

export const SportsEventCard = ({listings, navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const currentUser = useSelector(state => state.user.currentUser);
  const favouriteList = useSelector(state => state.favourite.favouriteList);
  const [favouriteLocal, setFavouriteLocal] = useState([]);

  useEffect(() => {
    if (token != null) {
      dispatch(getfavouriteList(token, 'listing', currentUser._id));
    }
    return () => {};
  }, []);

  useEffect(() => {
    let tempFav = [];
    favouriteList.map((item, index) => {
      tempFav.push(item._id);
    });
    setFavouriteLocal(tempFav);
    return () => {};
  }, [favouriteList]);

  const onFavClick = detail => {
    if (token == null) {
      navigation.navigate('authRoute');
    } else {
      let data = {
        likerId: currentUser._id,
        likeeId: detail._id,
        likeType: 'listing',
      };
      dispatch(addFavourite(token, data));
    }
  };

  return (
    <TouchableOpacity>
      {listings && listings.length > 0 ? (
        listings.map(listing => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SportsEventDetails', {listId: listing._id});
            }}
            style={styles.main}
            key={listing._id}>
            <ImageBackground
              borderRadius={4}
              source={
                listing.images.length > 0
                  ? {uri: ImageUrl + listing.images[0]}
                  : ICONS.listingImage
              }
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
                <TouchableOpacity onPress={() => onFavClick(listing)}>
                  {favouriteLocal.includes(listing._id) ? (
                    <Icon name="heart" size={20} color="red" />
                  ) : (
                    <Icon name={'heart-outline'} size={20} color="#FFFFFFD9" />
                  )}
                </TouchableOpacity>
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
            <View style={{marginTop: 10, width: '100%'}}>
              <Text style={styles.title}>{listing.title}</Text>
            </View>
            <View style={{marginTop: 4, width: '100%'}}>
              <Text style={styles.address}>
                {listing.location ? listing.location.shortName : 'n/a'}
              </Text>
            </View>
            <View style={{marginTop: 4, width: '100%'}}>
              <Text style={styles.date}>
                {listing.schedules.length > 0
                  ? moment(listing.schedules[0].duration.start).format(
                      'DD MMMM YYYY',
                    )
                  : 'n/a'}{' '}
                -{' '}
                {listing.schedules.length > 0
                  ? moment(listing.schedules[0].duration.end).format(
                      'DD MMMM YYYY',
                    )
                  : 'n/a'}
              </Text>
            </View>
            <View style={{marginTop: 9, width: '100%'}}>
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
        <View
          style={{
            flex: 1,

            //   backgroundColor: 'yellow',
            // justifyContent: 'center',
            // alignContent: 'center',
            alignItems: 'center',
            marginTop: '50%',
          }}>
          <Text style={{color: 'black', fontSize: 20, opacity: 0.4}}>
            No Listing Found
          </Text>
        </View>
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
