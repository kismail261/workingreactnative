import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {FONTS, ICONS, ImageUrl} from '../../../constant';
import {ExpandableView} from '../../p3m8/components/expandable';
import {ExpandableOption} from '../../p3m8/components/expandableOption';
import {ProviderUserCard} from './components/providerUserCard';
import Header from '../../../common/headerLogoU';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import {
  setAuthToken,
  setCurrentUser,
  setUserMode,
} from '../../../redux/user/user.action';
import ReferralSection from './components/referralSection';
import {useSelector} from 'react-redux';
import {deleteToken, deleteUser} from '../../../helpers/user.helper';

export const UserAccount = ({navigation}) => {
  const dispatch = useDispatch();
  const userDetail = useSelector(state => state.user.userDetail);
  const currentUser = useSelector(state => state.user.currentUser);
  const badgeEnabled = useSelector(state => state.user.badgeEnabled);

  function onSwapPress() {
    dispatch(setUserMode(false));
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'mainRoutes'}],
      }),
    );
  }

  const verificationClick = () => {
    if (badgeEnabled == 'pending') {
      navigation.navigate('accountVerificationStack');
    } else {
      navigation.navigate('accountVerificationStack', {screen: 'reviewAgain'});
    }
  };

  const logout = () => {
    dispatch(setAuthToken(null));
    dispatch(setCurrentUser(null));
    deleteToken();
    deleteUser();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'authRoute'}],
      }),
    );
  };

  return (
    <View style={styles.main}>
      <View style={{height: 8}} />
      <Header navigation={navigation} />
      <View
        style={{
          width: '100%',
          height: 0.7,
          backgroundColor: '#707070',
          opacity: 0.5,
        }}
      />
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'center', marginTop: 10}}>
          <View style={{width: '85%', marginBottom: 21}}>
            <Text style={styles.title1}>User Account</Text>
          </View>
          <View style={{width: '85%', marginBottom: 18}}>
            {userDetail == null ? (
              <ProviderUserCard
                hideInfo
                img={ICONS.userIcon}
                name={'n/a'}
                email={currentUser.email}
                navigation={navigation}
              />
            ) : (
              <>
                {userDetail.isOrganization ? (
                  <ProviderUserCard
                    hideInfo
                    img={
                      userDetail.organizationInfo.avatar != undefined
                        ? {uri: ImageUrl + userDetail.organizationInfo.avatar}
                        : ICONS.userIcon
                    }
                    name={
                      userDetail.organizationInfo.orgName != undefined
                        ? userDetail.organizationInfo.orgName
                        : 'n/a'
                    }
                    email={currentUser.email}
                    navigation={navigation}
                  />
                ) : (
                  <ProviderUserCard
                    hideInfo
                    img={
                      userDetail.providerInfo.avatar != undefined
                        ? {uri: ImageUrl + userDetail.providerInfo.avatar}
                        : ICONS.userIcon
                    }
                    name={
                      userDetail.firstName != undefined
                        ? userDetail.firstName
                        : 'n/a' + ' ' + userDetail != null &&
                          userDetail.lastName != undefined
                        ? userDetail.lastName
                        : 'n/a'
                    }
                    email={currentUser.email}
                    navigation={navigation}
                  />
                )}
              </>
            )}
          </View>
          <View style={{width: '85%'}}>
            <Text style={[styles.mode]}>You are currently in User Mode</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '85%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={styles.head}>Switch to Provider</Text>
            <TouchableOpacity onPress={onSwapPress}>
              <Image
                source={ICONS.swap}
                style={{height: 15.02, width: 14.64}}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.divider, {marginVertical: 10}]} />
          <ReferralSection navigation={navigation} />
          <View style={[styles.divider, {marginVertical: 10}]} />
          <View style={{width: '90%', alignSelf: 'flex-end'}}>
            <ExpandableView title="Bookings">
              <ExpandableOption
                onPress={() => navigation.navigate('BookingsList')}
                name="Bookings"
              />
              <ExpandableOption
                name="Give a Review"
                onPress={() => navigation.navigate('rateandGiveReview')}
              />
              <ExpandableOption
                name="Receive a Review"
                onPress={() => navigation.navigate('recieveReview')}
              />
            </ExpandableView>
            <ExpandableView title="Profile">
              <ExpandableOption
                name="Account Verification"
                onPress={verificationClick}
              />
              <ExpandableOption
                name="My Profile"
                onPress={() => navigation.navigate('userProfileDetail')}
              />
              <ExpandableOption
                name="Add a Child / My Children"
                onPress={() => navigation.navigate('childStack')}
              />
            </ExpandableView>
            <ExpandableView title="Payments">
              <ExpandableOption
                name="Payment Methods"
                onPress={() => navigation.navigate('NoPaymentMethod')}
              />
            </ExpandableView>

            <ExpandableView title="Network & Sharing">
              <ExpandableOption
                name="Refer a Friend"
                onPress={() => navigation.navigate('ReferAFriend')}
              />
              <ExpandableOption
                name="Share a Listing"
                onPress={() => navigation.navigate('home')}
              />
              <ExpandableOption
                name="Share a Provider Page"
                onPress={() => navigation.navigate('home')}
              />
              <ExpandableOption
                name="Share Your Bookings"
                onPress={() => navigation.navigate('BookingsList')}
              />
              <ExpandableOption name="See Friends Activity" comingsoon={true} />
              <ExpandableOption
                name="Add Your Contacts"
                onPress={() => navigation.navigate('AddContact')}
              />
              <ExpandableOption name="Leaderboard Rankings" comingsoon={true} />
            </ExpandableView>

            <ExpandableView title="Inbox & Messages">
              <ExpandableOption
                name="Message"
                onPress={() => navigation.navigate('Message')}
              />
            </ExpandableView>
            <TouchableOpacity
              style={styles.header}
              onPress={() =>
                navigation.navigate(
                  userDetail != null && userDetail.sportyPoints >= 1000
                    ? 'SportClubGold'
                    : 'SportyClub',
                )
              }>
              <Text style={styles.title}>Sporty Club</Text>
            </TouchableOpacity>
            <View
              style={{
                borderBottomWidth: 0.7,
                borderBottomColor: 'rgba(112, 112, 112, 0.3)',
                marginBottom: 9,
              }}
            />

            <ExpandableView title="Tools">
              <ExpandableOption
                name="Favorites"
                onPress={() => navigation.navigate('FavoritesTopTabs')}
              />
              <ExpandableOption name="Olympia Membership" comingsoon={true} />
              <ExpandableOption
                name="Linked Accounts"
                onPress={() => navigation.navigate('Linked Accounts')}
              />
              <ExpandableOption
                name="Give Us Feedback"
                onPress={() => navigation.navigate('Give Us Feedback')}
              />
              <ExpandableOption
                name="Change Language"
                onPress={() => navigation.navigate('Change Language')}
              />
              <ExpandableOption
                name="Notifications"
                onPress={() => navigation.navigate('NotificationSetting')}
              />
            </ExpandableView>
            <ExpandableView title="Security">
              <ExpandableOption
                name="Password"
                onPress={() => navigation.navigate('Password')}
              />
              <ExpandableOption
                name="2 Step Verification"
                onPress={() => navigation.navigate('2 Step Verification')}
              />
              <ExpandableOption
                name="Account Management"
                onPress={() => navigation.navigate('AccountOffline')}
              />
            </ExpandableView>
            <TouchableOpacity
              style={styles.header}
              onPress={() => navigation.navigate('Trust & Safety')}>
              <Text style={styles.title}>Trust & Safety</Text>
            </TouchableOpacity>
            <View
              style={{
                borderBottomWidth: 0.7,
                borderBottomColor: 'rgba(112, 112, 112, 0.3)',
                marginBottom: 9,
              }}
            />
            <ExpandableView title="Support">
              <ExpandableOption name="Find Help" />
              <ExpandableOption name="Community & Resources" />
              <ExpandableOption
                name="Contact Us"
                onPress={() => navigation.navigate('Contact Us')}
              />
            </ExpandableView>
            <ExpandableView title="Legal">
              <ExpandableOption
                name="Terms of Service"
                onPress={() => navigation.navigate('Terms of Service')}
              />
            </ExpandableView>
            <TouchableOpacity style={styles.header} onPress={logout}>
              <Text style={styles.title}>Logout</Text>
            </TouchableOpacity>
            {/*
            <ExpandableOption name="Account Offline" /> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  title1: {
    fontFamily: FONTS.SFBold,
    color: 'black',
    fontSize: wp('5'),
  },
  title: {
    fontFamily: FONTS.SFBold,
    color: 'black',
    fontSize: wp('4.5'),
  },
  mode: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('3'),
    color: 'black',
    opacity: 0.56,
  },
  head: {
    fontFamily: FONTS.SFBold,
    color: 'black',
    fontSize: wp('4.5'),
  },
  divider: {
    backgroundColor: '#707070',
    height: 1,
    opacity: 0.1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
