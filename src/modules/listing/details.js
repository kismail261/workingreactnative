import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';
import {FONTS, ICONS, ImageUrl, Url} from '../../constant';
import Icon from 'react-native-vector-icons/Ionicons';
import {ButtonRegular} from '../../common/buttonRegular';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import TNIndicator from '../../common/TNIndicator';
import axios from 'axios';
import moment from 'moment';
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';

export const ListingDetail = ({navigation, route}) => {
  const listId = route.params.listId;
  const width = Dimensions.get('window').width;
  const token = useSelector(state => state.user.token);
  const [loader, setLoader] = useState(true);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    getListingDetail();
    return () => {};
  }, []);

  const getListingDetail = () => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${Url}api/listing/by/${listId}`, {headers: headers})
      .then(resp => {
        let response = resp.data;
        console.log('here======   ', response);
        setDetail(response);

        setLoader(false);
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          showMessage(err.response.data.message, 'warning');
        }
        setLoader(false);
      });
  };

  const renderItem = ({item, index}) => {
    // if (detail.images.length > 0) {
    return (
      <ImageBackground
        source={{uri: ImageUrl + item}}
        style={{width: '100%', height: 268, alignItems: 'center'}}>
        <SafeAreaView style={{width: '90%', paddingTop: 20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={ICONS.backArrow}
              style={{width: wp('3.5'), height: wp('6')}}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    );
    // } else {
    //   return (
    //     <SafeAreaView style={{width: '90%', paddingTop: 20, paddingLeft: 15}}>
    //       <TouchableOpacity onPress={() => navigation.goBack()}>
    //         <Image
    //           source={ICONS.backArrow}
    //           style={{width: wp('3.5'), height: wp('6')}}
    //         />
    //       </TouchableOpacity>
    //     </SafeAreaView>
    //   );
    // }
  };

  const editListingClick = () => {
    if (detail.listingType == 'Service') {
      navigation.navigate('editAddServiceDetail', {listId: detail._id});
    } else if (detail.listingType == 'Event') {
      navigation.navigate('editEventDetail', {listId: detail._id});
    } else if (detail.listingType == 'Facility') {
      navigation.navigate('editFacilityDetail', {listId: detail._id});
    }
  };

  return (
    <>
      {loader ? (
        <TNIndicator />
      ) : (
        <View style={styles.main}>
          <ScrollView style={{width: '100%'}}>
            <View style={{width: '100%', alignItems: 'center'}}>
              {detail.images.length > 0 ? (
                <Carousel
                  data={detail.images}
                  renderItem={renderItem}
                  sliderWidth={width}
                  itemWidth={width}
                />
              ) : (
                <SafeAreaView
                  style={{width: '90%', paddingTop: 20, paddingLeft: 2}}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                      source={ICONS.backArrow}
                      style={{width: wp('2.5'), height: wp('4')}}
                    />
                  </TouchableOpacity>
                </SafeAreaView>
              )}
              <View style={styles.avatarCard}>
                <Image
                  source={ICONS.userIcon}
                  style={[styles.avatar, {marginRight: 6}]}
                />
                <View style={{alignItems: 'flex-start', width: wp('71')}}>
                  <Text style={styles.title}>{detail.title}</Text>
                  <Text numberOfLines={1} style={styles.place}>
                    {detail.location == undefined
                      ? 'n/a'
                      : detail.location.shortName}
                  </Text>
                  <Text numberOfLines={2} style={styles.address}>
                    {detail.location == undefined
                      ? 'n/a'
                      : detail.location.description}
                  </Text>
                </View>
              </View>
              <View style={styles.avatarCard}>
                <View style={{width: wp(17), marginRight: 6}} />
                {detail.schedules.length > 0 ? (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: wp('71'),
                      }}>
                      <Image
                        source={ICONS.calendar}
                        style={{width: wp(5), height: wp(5), marginRight: 6}}
                      />
                      <Text style={styles.date}>
                        {moment(detail.schedules[0].duration.start).format(
                          'ddd DD MMM',
                        )}{' '}
                        -{' '}
                        {moment(detail.schedules[0].duration.end).format(
                          'ddd DD MMM',
                        )}{' '}
                        {moment(detail.schedules[0].duration.end).format(
                          'YYYY',
                        )}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.time,
                        {marginLeft: wp(7.2), marginTop: 6},
                      ]}>
                      {moment(detail.schedules[0].duration.start).format(
                        'hh:mm A',
                      )}{' '}
                      -{' '}
                      {moment(detail.schedules[0].duration.end).format(
                        'hh:mm A',
                      )}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: wp('71'),
                      }}>
                      <Image
                        source={ICONS.calendar}
                        style={{width: wp(5), height: wp(5), marginRight: 6}}
                      />
                      <Text style={styles.date}>n/a - n/a</Text>
                    </View>
                    <Text
                      style={[
                        styles.time,
                        {marginLeft: wp(7.2), marginTop: 6},
                      ]}>
                      n/a - n/a
                    </Text>
                  </View>
                )}
              </View>

              <View style={{width: '90%', marginTop: 22}}>
                <Text style={styles.head}>Description</Text>
                <Text style={[styles.desc, {marginTop: 12}]}>
                  {detail.description == undefined ? 'n/a' : detail.description}
                </Text>
              </View>
              <View style={{width: '90%', marginTop: 27}}>
                <Text style={styles.head}>Event Details</Text>
                <Text style={[styles.greyTxt, {marginTop: 12}]}>
                  Sport or Activity
                </Text>
                <Text style={[styles.type, {marginTop: 5}]}>
                  {detail.sport}
                </Text>
                <Text style={[styles.greyTxt, {marginTop: 12}]}>
                  Type of Sport Activity
                </Text>
                <Text style={[styles.type, {marginTop: 5}]}>{detail.type}</Text>
                <Text style={[styles.greyTxt, {marginTop: 14}]}>
                  What's included
                </Text>
                <Text style={[styles.type, {marginTop: 5}]}>
                  {detail.aboutStaff}
                </Text>
              </View>
              <View style={{width: '90%', marginTop: 22}}>
                <Text style={styles.head}>Participant Particulars</Text>
              </View>
              <View style={{width: '90%', marginTop: 22}}>
                <Text style={styles.greyTxt}>Gender</Text>
                <Text style={[styles.type, {marginTop: 5}]}>
                  {detail.gender == undefined ? 'n/a' : detail.gender}
                </Text>
              </View>
              <View style={{width: '90%', marginTop: 22}}>
                <Text style={styles.greyTxt}>Age range</Text>
                {detail.age == undefined ? (
                  <Text style={[styles.type, {marginTop: 5}]}>
                    From n/a - n/a
                  </Text>
                ) : (
                  <Text style={[styles.type, {marginTop: 5}]}>
                    From: {detail.age.from} {' - '} {detail.age.to}
                  </Text>
                )}
              </View>
              <View style={{width: '90%', marginTop: 22}}>
                <Text style={styles.greyTxt}>Suitable for</Text>
                <Text style={[styles.type, {marginTop: 5}]}>
                  {detail.suitable == undefined ? 'n/a' : detail.suitable}
                </Text>
              </View>
              <View style={{width: '90%', marginTop: 22}}>
                <Text style={styles.greyTxt}>Ability Level</Text>
                <Text style={[styles.type, {marginTop: 5}]}>
                  {detail.abilityLevel == undefined
                    ? 'n/a'
                    : detail.abilityLevel}
                </Text>
              </View>
              <View style={{width: '90%', marginTop: 22}}>
                <Text style={styles.greyTxt}>Good for</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}>
                  {detail.goodfor.map((item, index) => {
                    return (
                      <Text key={index} style={[styles.type, {marginTop: 5}]}>
                        {item},{' '}
                      </Text>
                    );
                  })}
                </View>
              </View>
              <View style={{width: '90%', marginTop: 22}}>
                <Text style={styles.head}>Location</Text>
                <Text style={[styles.type, {marginTop: 5}]}>
                  Insert Map here
                </Text>
              </View>
              <View style={{width: '90%', marginTop: 22}}>
                <Text style={styles.head}>
                  Facilities, Amenities and Preparation
                </Text>
              </View>
              <View style={{width: '90%', marginTop: 22}}>
                <Text style={styles.greyTxt}>
                  Facilities Used for this event
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}>
                  {detail.facilites.map((item, index) => {
                    return (
                      <Text key={index} style={[styles.type, {marginTop: 5}]}>
                        {item}
                      </Text>
                    );
                  })}
                </View>
              </View>
              <View style={{width: '90%', marginTop: 22}}>
                <Text style={styles.greyTxt}>
                  Amenities Available for this event
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}>
                  {detail.amenities.map((item, index) => {
                    return (
                      <Text key={index} style={[styles.type, {marginTop: 5}]}>
                        {item}
                      </Text>
                    );
                  })}
                </View>
              </View>
              <View style={{width: '90%', marginTop: 22}}>
                <Text style={styles.greyTxt}>How to Prepare</Text>
                <Text style={[styles.type, {marginTop: 5}]}>
                  {detail.instructions == undefined
                    ? 'n/a'
                    : detail.instructions}
                </Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.bottom}>
            <View style={[styles.bottomBtn]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={ICONS.starBlue}
                  style={{height: 13.51, width: 14.1, marginRight: 7}}
                />
                <Text style={styles.gainedRating}>{detail.avgRating}</Text>
                <Text style={styles.totalRating}>/10</Text>
                <Text style={[styles.totalRating, {marginLeft: 5}]}>(18)</Text>
              </View>
              <View>
                <Text style={styles.amount}>{detail.pricing}</Text>
              </View>
            </View>
            <View style={styles.bottomBtn}>
              <ButtonRegular
                onClick={editListingClick}
                title="Edit Listing"
                buttonStyle={{
                  backgroundColor: '#2C99C6',
                  width: '80%',
                  alignSelf: 'center',
                }}
                textStyle={{color: 'white'}}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  bottom: {
    shadowColor: '#0343CB1C',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    height: 75,
    alignItems: 'center',
    width: '100%',
    //borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    //alignSelf: 'center',
    backgroundColor: 'white',
  },
  bottomBtn: {
    width: '45%',
    height: '80%',
    alignSelf: 'center',
    //borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gainedRating: {
    fontFamily: FONTS.SFBold,
    fontSize: 13,
    color: 'black',
  },
  amount: {
    fontFamily: FONTS.SFBold,
    fontSize: 16,
    color: 'black',
  },
  totalRating: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 8,
    color: 'black',
  },
  avatar: {
    height: wp('17'),
    width: wp('17'),
    borderRadius: 74,
  },
  title: {
    fontSize: wp('6.5'),
    fontFamily: FONTS.SFBold,
    color: 'black',
  },
  place: {
    fontSize: wp('4.5'),
    fontFamily: FONTS.SFSemiBold,
    color: 'black',
  },
  address: {
    fontSize: wp('3'),
    fontFamily: FONTS.SFRegular,
    color: 'black',
  },
  avatarCard: {
    width: '90%',
    marginTop: 28,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontFamily: FONTS.SFMedium,
    fontSize: wp('3.5'),
    color: '#000000',
  },
  time: {
    fontFamily: FONTS.SFMedium,
    fontSize: wp('3'),
    color: '#707070',
  },
  head: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('6'),
    color: 'black',
  },
  desc: {
    fontFamily: FONTS.SFRegular,
    color: '#707070',
    fontSize: wp('3.5'),
  },
  greyTxt: {
    fontFamily: FONTS.SFMedium,
    fontSize: wp('3'),
    color: '#000000',
    opacity: 0.42,
  },
  type: {
    fontSize: wp('4'),
    fontFamily: FONTS.SFRegular,
    color: 'black',
  },
});
