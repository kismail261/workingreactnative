import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONTS, ICONS, ImageUrl, Url} from '../../../../constant';
import Icon from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import axios from 'axios';
import { showMessage } from '../../../../helpers/replaceDigitsWithAesteriks';

export const ProviderProfileHeadCard = props => {
  const userId = props.userId;
  // const userDetail = useSelector(state => state.user.userDetail)
  const token = useSelector(state => state.user.token);
  const specificUserList = useSelector(state => state.listing.specificUserList);
  const reviewsList = useSelector(state => state.profile.reviewsList);
  const [userDetail, setDetail] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getCurrentUserDetail();
    return () => {};
  }, []);

  const getCurrentUserDetail = () => {
    let headers = {
      'Content-Type': 'application/json',
    };
    axios
      .get(`${Url}api/users/me/${userId}`, {headers: headers})
      .then(resp => {
        let response = resp.data;
        setDetail(response);
        setLoader(false);
      })
      .catch(err => {
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
          showMessage("Provider shared successfully")
        })
        .catch(err => {
          err && console.log(err);
        });
    } catch (error) {
      showMessage(error.message);
    }
  };

  const onFavClick = () => {
    if (token == null) {
      props.navigation.navigate('authRoute');
    } else {
      // let data = {
      //   "likerId": currentUser._id,
      //   "likeeId": detail.user._id,
      //   "likeType": "provider"
      // }
      // dispatch(addFavourite(token, data))
    }
  };

  return (
    <>
      {loader ? (
        <View style={{alignSelf: 'center'}}>
          <ActivityIndicator size={'small'} color={'#000000'} />
        </View>
      ) : (
        <View>
          {userDetail != null && userDetail.isOrganization ? (
            <LinearGradient
              colors={['#3B5998', '#0D6B93']}
              style={styles.linearGradient}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Image
                  source={
                    userDetail.organizationInfo.avatar != undefined
                      ? {uri: ImageUrl + userDetail.organizationInfo.avatar}
                      : ICONS.userIcon
                  }
                  style={styles.dp}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 6,
                    marginBottom: 4,
                  }}>
                  <Text style={styles.name}>
                    {userDetail.organizationInfo.orgName != undefined
                      ? userDetail.organizationInfo.orgName
                      : 'n/a'}
                  </Text>
                  {props.verified && (
                    <Image
                      source={ICONS.verifiedBadge}
                      style={styles.verified}
                    />
                  )}
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 20,
                  }}>
                  <Text style={styles.skills}>{props.mainTitle} | </Text>
                  <View style={{}}>
                    <FlatList
                      data={[]}
                      horizontal
                      renderItem={({item, index}) => (
                        <Text style={styles.skills}>
                          {item}{' '}
                          {index + 1 !==
                            userDetail.providerInfo.providerType.length &&
                            '/ '}{' '}
                        </Text>
                      )}
                    />
                  </View>
                </View>
                <View style={styles.ratingCont}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.bigNum}>{specificUserList.length}</Text>
                    <Text style={styles.smallText}>Total Listings</Text>
                  </View>
                  <View style={styles.divider}></View>
                  <View style={{alignItems: 'center'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: 90,
                      }}>
                      <Image
                        source={ICONS.star}
                        style={{height: 19.27, width: 20.11}}
                      />
                      <View
                        style={{
                          alignItems: 'baseline',
                          justifyContent: 'flex-end',
                          flexDirection: 'row',
                        }}>
                        <Text style={styles.bigNum}>{3.5}</Text>
                        <Text style={styles.smallNum}>/10</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}>
                      <Text style={[styles.bigNum, {fontSize: 10}]}>
                        {reviewsList.length}
                      </Text>
                      <Text style={styles.smallText}> User Rating</Text>
                    </View>
                  </View>
                </View>
              </View>
            </LinearGradient>
          ) : (
            <LinearGradient
              colors={['#3B5998', '#0D6B93']}
              style={styles.linearGradient}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Image
                  source={
                    userDetail.providerInfo.avatar != undefined
                      ? {uri: ImageUrl + userDetail.providerInfo.avatar}
                      : ICONS.userIcon
                  }
                  style={styles.dp}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 6,
                    marginBottom: 4,
                  }}>
                  <Text style={styles.name}>
                    {userDetail.firstName != undefined
                      ? userDetail.firstName
                      : 'n/a'}
                  </Text>
                  {props.verified && (
                    <Image
                      source={ICONS.verifiedBadge}
                      style={styles.verified}
                    />
                  )}
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 20,
                  }}>
                  <Text style={styles.skills}>{props.mainTitle} | </Text>
                  <View style={{}}>
                    <FlatList
                      data={userDetail.providerInfo.providerType}
                      horizontal
                      renderItem={({item, index}) => (
                        <Text style={styles.skills}>
                          {item}{' '}
                          {index + 1 !==
                            userDetail.providerInfo.providerType.length &&
                            '/ '}{' '}
                        </Text>
                      )}
                    />
                  </View>
                </View>
                <View style={styles.ratingCont}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.bigNum}>{specificUserList.length}</Text>
                    <Text style={styles.smallText}>Total Listings</Text>
                  </View>
                  <View style={styles.divider}></View>
                  <View style={{alignItems: 'center'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: 90,
                      }}>
                      <Image
                        source={ICONS.star}
                        style={{height: 19.27, width: 20.11}}
                      />
                      <View
                        style={{
                          alignItems: 'baseline',
                          justifyContent: 'flex-end',
                          flexDirection: 'row',
                        }}>
                        <Text style={styles.bigNum}>{3.5}</Text>
                        <Text style={styles.smallNum}>/10</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}>
                      <Text style={[styles.bigNum, {fontSize: 10}]}>
                        {reviewsList.length}
                      </Text>
                      <Text style={styles.smallText}> User Rating</Text>
                    </View>
                  </View>
                </View>
              </View>
            </LinearGradient>
          )}
          <View
            style={{
              width: wp('90'),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'absolute',
              alignSelf: 'center',
              top: Platform.OS == 'ios' ? 40 : 15,
            }}>
            <Icon
              onPress={() => props.navigation.goBack()}
              name="chevron-back-outline"
              color="#FFFFFF"
              size={20}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={onShare}>
                <Image
                  source={ICONS.shareGrey}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onFavClick}>
                <Image
                  source={ICONS.favGrey}
                  style={{width: 30, height: 30, marginLeft: 10}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: hp('3'),
    paddingBottom: hp('3'),
  },
  dp: {
    height: wp('22'),
    width: wp('22'),
    borderRadius: wp('22'),
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 20,
  },
  name: {
    fontFamily: FONTS.SFBold,
    fontSize: 28,
    color: 'white',
  },
  verified: {
    width: 18.8,
    height: 23.19,
    marginLeft: 5,
  },
  skills: {
    // textAlign:'center',
    fontFamily: FONTS.SFMedium,
    color: 'white',
  },
  divider: {
    height: 44,
    backgroundColor: '#D5D5D5',
    width: 2,
    borderRadius: 3,
  },
  ratingCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
  },
  bigNum: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 30,
    color: 'white',
  },
  smallNum: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 13,
    color: 'white',
  },
  smallText: {
    fontFamily: FONTS.SFRegular, //Font need to be changed to light
    fontSize: 10,
    color: 'white',
  },
});
