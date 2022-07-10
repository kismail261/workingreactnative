import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONTS, ICONS, ImageUrl} from '../../../../constant';
import {getUserDetail} from '../../../../redux/user/user.action';

export const ProviderProfileHeadCard = props => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const userDetail = useSelector(state => state.user.userDetail);
  const specificUserList = useSelector(state => state.listing.specificUserList);
  const reviewsList = useSelector(state => state.profile.reviewsList);

  useEffect(() => {
    dispatch(getUserDetail(currentUser._id));
    return () => {};
  }, []);

  return (
    <>
      {console.log('reviewList', userDetail.rating)}
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
                <Image source={ICONS.verifiedBadge} style={styles.verified} />
              )}
            </View>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                marginBottom: 20,
              }}>
              <Text style={[styles.skills, {marginTop: 2.5}]}>
                {props.mainTitle} |{' '}
              </Text>
              <View
                style={{
                  width: '65%',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginBottom: 20,
                }}>
                <Text style={[styles.skills, {marginTop: 2.5}]}>
                  {props.mainTitle} |{' '}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}>
                  {userDetail.organizationInfo.providerType.map(
                    (item, index) => (
                      <Text key={index} style={styles.skills}>
                        {item}{' '}
                        {index + 1 !==
                          userDetail.organizationInfo.providerType.length &&
                          '/ '}{' '}
                      </Text>
                    ),
                  )}
                </View>
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
                    <Text style={styles.bigNum}>{userDetail.rating}</Text>
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
                <Image source={ICONS.verifiedBadge} style={styles.verified} />
              )}
            </View>

            <View
              style={{
                width: '75%',
                justifyContent: 'center',
                flexDirection: 'row',
                marginBottom: 20,
                alignItems: 'center'
              }}>
                <Text style={[styles.skills, { marginTop: 2.5 }]}>
                  {`${props.mainTitle} | ${userDetail.providerInfo.providerType.map((val, index) => `${val} ${(index + 1) !== userDetail.providerInfo.providerType.length ? ' / ' : ''}`).join('')}`}
                </Text>
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
                    width: 90,
                  }}>
                  <Image
                    source={ICONS.star}
                    style={{height: 19.27, width: 20.11}}
                  />
                  <View
                    style={{
                      alignItems: 'baseline',
                      flexDirection: 'row',
                      marginLeft: 4,
                    }}>
                    <Text style={styles.bigNum}>{userDetail.rating}</Text>
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
    marginTop: Platform.OS == 'ios' ? 20 : 5,
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
    fontFamily: FONTS.SFMedium,
    color: 'white',
    textAlign: 'center'
    // textAlign:'center'
    // alignSelf:'center'
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
