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
  Platform,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import FontAw from 'react-native-vector-icons/dist/FontAwesome';
import GetLocation from 'react-native-get-location';
import {useDispatch, useSelector} from 'react-redux';
import {FONTS, ICONS, ImageUrl, Url} from '../../../constant';
import Icon from 'react-native-vector-icons/Ionicons';
import {ButtonRegular} from '../../../common/buttonRegular';
import MeduimBtnBorder from '../../../common/largeBtnBorder';
import AdLocation from '../../../common/adLocation';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import TNIndicator from '../../../common/TNIndicator';
import axios from 'axios';
import moment from 'moment';
import Share from 'react-native-share';
import {addFavourite} from '../../../redux/favourite/favourite.action';
import {ReviewSection} from './components/reviewSection';
import {OtherDetail} from './components/otherDetail';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';

export const SportsEventDetails = ({navigation, route}) => {
  const dispatch = useDispatch();
  const listId = route.params.listId;
  const width = Dimensions.get('window').width;
  const [liked, setliked] = useState(false);
  const token = useSelector(state => state.user.token);
  const currentUser = useSelector(state => state.user.currentUser);
  const [loader, setLoader] = useState(true);
  const [detail, setDetail] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });

  useEffect(() => {
    GetCurrentLocation();
    getListingDetail();
    return () => {};
  }, []);

  const GetCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        setCurrentLocation(location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const getListingDetail = () => {
    let headers = {
      'Content-Type': 'application/json',
      // "Authorization": `Bearer ${token}`
    };
    axios
      .get(`${Url}api/listing/by/${listId}`, {headers: headers})
      .then(resp => {
        let response = resp.data;
        console.log('getListingDetail: ', response);
        setDetail(response);
        setLoader(false);
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          showMessage(err.response.data.message);
        }
        setLoader(false);
      });
  };

  const onShare = async () => {
    const options = {
      title: 'Sporforya Provider',
      message:
        'Check out this Provider on Sporforya , Provider :https://dev.sporforya.com',
    };
    try {
      Share.open(options)
        .then(res => {
          hideMenu();
          showMessage('Provider shared successfully');
        })
        .catch(err => {
          err && console.log(err);
        });
    } catch (error) {
      showMessage(error.message);
    }
  };

  const onFavClick = () => {
    // if (token == null) {
    //   navigation.navigate("authRoute")
    // } else {
    let data = {
      likerId: currentUser._id,
      likeeId: detail._id,
      likeType: 'listing',
    };
    dispatch(addFavourite(token, data));
    if (liked == false) {
      setliked(true);
    } else {
      setliked(false);
    }
    // }
  };

  const renderItem = ({item, index}) => {
    return (
      <ImageBackground
        source={{uri: ImageUrl + item}}
        style={{width: '100%', height: 268, alignItems: 'center'}}>
        <SafeAreaView style={{width: '90%', paddingTop: 20}}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Icon
              onPress={() => navigation.goBack()}
              name="chevron-back-outline"
              color="black"
              size={20}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={onShare}>
                <Image
                  source={ICONS.shareGrey}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  marginLeft: 10,
                  backgroundColor: 'rgba(0,0,0,0.15)',
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={onFavClick}>
                <Icon
                  name="heart"
                  size={22}
                  style={{alignSelf: 'center'}}
                  color={liked == false ? 'white' : 'red'}
                />
                {/* <Image source={ICONS.favGrey}  style={{ width: 30, height: 30, marginLeft: 10 }} /> */}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  };

  const contactUsClick = () => {
    navigation.navigate('chatHistory', {
      recieverId: detail.userId,
      recieverDetail: detail.provider,
    });
  };

  return (
    <>
      {loader ? (
        <TNIndicator />
      ) : (
        <SafeAreaView style={styles.main}>
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
                <SafeAreaView style={{width: '90%', paddingTop: 20}}>
                  <Icon
                    onPress={() => navigation.goBack()}
                    name="chevron-back-outline"
                    color="black"
                    size={20}
                  />
                </SafeAreaView>
              )}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('providerDetail', {userId: detail.userId})
                }
                style={styles.avatarCard}>
                {detail.provider.isOrganization ? (
                  <Image
                    source={
                      detail.provider.organizationInfo.avatar == undefined
                        ? ICONS.userIcon
                        : {
                            uri:
                              ImageUrl +
                              detail.provider.organizationInfo.avatar,
                          }
                    }
                    style={[styles.avatar, {marginRight: 6}]}
                  />
                ) : (
                  <Image
                    source={
                      detail.provider.providerInfo.avatar == undefined
                        ? ICONS.userIcon
                        : {uri: ImageUrl + detail.provider.providerInfo.avatar}
                    }
                    style={[styles.avatar, {marginRight: 6}]}
                  />
                )}

                <View style={{alignItems: 'flex-start', width: wp('71')}}>
                  <Text style={styles.title}>{detail.title}</Text>
                  {detail.provider.isOrganization ? (
                    <Text numberOfLines={1} style={styles.place}>
                      {detail.provider.organizationInfo.orgName == undefined
                        ? 'n/a'
                        : detail.provider.organizationInfo.orgName}
                    </Text>
                  ) : (
                    <Text numberOfLines={1} style={styles.place}>
                      {detail.provider.firstName == undefined
                        ? 'n/a'
                        : detail.provider.firstName}
                    </Text>
                  )}

                  <Text numberOfLines={2} style={styles.address}>
                    {detail.location == undefined
                      ? 'n/a'
                      : detail.location.description}
                  </Text>
                </View>
              </TouchableOpacity>
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
                {/* {detail.age == undefined ? (
                  <Text style={[styles.type, {marginTop: 5}]}>
                    From n/a - n/a
                  </Text>
                ) : (
                  <Text style={[styles.type, {marginTop: 5}]}>
                    From: {detail.age.from} {' - '}
                     {detail.age.to}
                  </Text>
                )} */}
                {detail.age == undefined ? (
                  <Text style={[styles.type, {marginTop: 5}]}>
                    From n/a - n/a
                  </Text>
                ) : (
                  <Text style={[styles.type, {marginTop: 5}]}>
                    From:{detail.age.from + ' - ' + 'To:' + detail.age.to}
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
                <View style={{height: 5}} />
                <AdLocation currentLocation={currentLocation} />
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
                        {item},{' '}
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
                        {item},{' '}
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
              <ReviewSection navigation={navigation} userId={detail.userId} />
              <View style={{height: 50}} />
              {detail.faq.length > 0 ? (
                <OtherDetail
                  label={'Frequently Asked Questions'}
                  subLable={detail.faq[0].question}
                  onClick={() =>
                    navigation.navigate('ViewFaq', {detail: detail.faq})
                  }
                />
              ) : null}
              {detail.cancelPolicy != undefined ? (
                <OtherDetail
                  label={'Cancellation Policy'}
                  subLable={detail.cancelPolicy.description}
                  onClick={() =>
                    navigation.navigate('ViewPolicies', {
                      detail: detail.cancelPolicy.description,
                    })
                  }
                />
              ) : null}
              {detail.waiver != undefined ? (
                <OtherDetail
                  label={'Waiver, Release of Liability'}
                  subLable={detail.waiver}
                  onClick={() =>
                    navigation.navigate('ViewLiability', {
                      detail: detail.waiver,
                    })
                  }
                />
              ) : null}
              <View style={{width: '90%', marginTop: 22}}>
                <Text style={styles.head}>Question about this event?</Text>
                <View style={{marginBottom: -13}} />
                <MeduimBtnBorder
                  label={'Contact Us'}
                  // bgColor={"#2C99C6"}
                  onClick={contactUsClick}
                />
              </View>
            </View>
          </ScrollView>
          <View style={styles.bottom}>
            <View style={[styles.bottomBtn, {paddingLeft: '5%'}]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={ICONS.starBlue}
                  style={{height: 13.51, width: 14.1, marginRight: 7}}
                />
                <Text style={styles.gainedRating}>{detail.avgRating}</Text>
                <Text style={styles.totalRating}>/10</Text>
                <Text style={[styles.totalRating, {marginLeft: 5}]}>
                  ({detail.reviewCount})
                </Text>
              </View>
              <View>
                <Text style={styles.amount}>
                  US $
                  {detail.schedules.length > 0
                    ? detail.schedules[0].pricing.price
                    : 'n/a'}
                </Text>
              </View>
            </View>
            <View style={styles.bottomBtn}>
              <ButtonRegular
                onClick={() =>
                  navigation.navigate(
                    token == null ? 'authRoute' : 'SelectSchedule',
                    {listDetail: detail},
                  )
                }
                title="Book Now"
                buttonStyle={{
                  backgroundColor: '#2C99C6',
                  width: '80%',
                  alignSelf: 'center',
                }}
                textStyle={{color: 'white'}}
              />
            </View>
          </View>
        </SafeAreaView>
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
    marginBottom: Platform.OS == 'ios' ? 10 : 0,
  },
  bottomBtn: {
    width: '45%',
    height: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
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
    fontFamily: FONTS.SFMedium,
    color: 'black',
  },
});
