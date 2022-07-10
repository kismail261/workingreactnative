import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONTS, ICONS} from '../../../constant';
import {FieldTitle} from './dashComponents/fieldTitle';
import {FourCompBox} from './dashComponents/fourCompBox';
import {OptionCard} from './dashComponents/optionCard';
import {DashTodo} from './dashComponents/todo';
import Header from '../../../common/headerLogoBI';
import {
  getBookingStats,
  getPaymentStats,
} from '../../../redux/booking/booking.action';

const card1Icons = [
  {icon: ICONS.ball, style: {height: 30.92, width: 30.92}},
  {icon: ICONS.tanis, style: {height: 35.42, width: 35.42}},
  {icon: ICONS.cycle, style: {height: 34.2, width: 45.47}},
];
const card2Icons = [
  {icon: ICONS.bank, style: {height: 32.97, width: 40.62}},
  {icon: ICONS.atmcard, style: {height: 30.33, width: 47.46}},
];
const card3Icons = [
  {icon: ICONS.verifiedBadge, style: {height: 38.29, width: 31.05}},
];

const ProviderDashA = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token)
  const currentUser = useSelector(state => state.user.currentUser)
  const userDetail = useSelector(state => state.user.userDetail)
  const bookingStats = useSelector(state => state.booking.bookingStats)
  const pymentStats = useSelector(state => state.booking.pymentStats)

  useEffect(() => {
    dispatch(getPaymentStats(token, currentUser != null ? currentUser._id : ''))
    dispatch(getBookingStats(token, currentUser != null ? currentUser._id : ''))
    return () => {
    };
  }, []);

  return (
    <View style={styles.main}>
      <Header navigation={navigation} />
      <ScrollView style={styles.width100}>
        <View style={[styles.width100, styles.alignItemsCenter]}>
          <View
            style={styles.welcomeContainer}>
            {userDetail != null && userDetail.isOrganization ? (
              <Text style={styles.welcome}>
                Welcome{' '}
                <Text style={[styles.welcome, styles.nameColor]}>
                  {userDetail.organizationInfo.orgName != undefined
                    ? userDetail.organizationInfo.orgName
                        .charAt(0)
                        .toUpperCase() +
                      userDetail.organizationInfo.orgName.slice(1)
                    : ''}
                  !
                </Text>
              </Text>
            ) : (
              <Text style={styles.welcome}>
                Welcome{' '}
                <Text style={[styles.welcome, styles.nameColor]}>
                  {userDetail != null
                    ? userDetail.firstName.charAt(0).toUpperCase() +
                      userDetail.firstName.slice(1)
                    : ''}
                  !
                </Text>
              </Text>
            )}
          </View>
          <View style={styles.dashNotification}>
            {/* <DashNotification defaultIcon /> */}
          </View>
          <View style={styles.fieldTitleContainer}>
            <FieldTitle
              imageSource={ICONS.moneybag}
              imageStyles={styles.fieldImage}
              name="Financials"
            />
            <FourCompBox
              title1="Earnings September"
              val1={pymentStats != null ? pymentStats.monthly : 0}
              title2="Earnings 12 Months"
              val2={pymentStats != null ? pymentStats.annually : 0}
              title3="Pending Payout"
              val3={pymentStats != null ? pymentStats.pending : 0}
              title4="Available"
              val4={pymentStats != null ? pymentStats.available : 0}
            />
          </View>
          <View style={styles.fieldTitleContainer}>
            <FieldTitle
              imageSource={ICONS.rocket}
              imageStyles={styles.todoImage}
              name="Performance"
            />
            <FourCompBox
              isCurrency={false}
              title1="Bookings September"
              val1={bookingStats != null ? bookingStats.monthlyBooking : 0}
              title2="Booking 12 Months"
              val2={bookingStats != null ? bookingStats.annuallyBookings : 0}
              title3="Active Listings"
              val3={bookingStats != null ? bookingStats.activeListings : 0}
              title4="Rating Average"
              val4={bookingStats != null ? bookingStats.avgRating : 0}
            />
          </View>
          <View style={styles.fieldTitleContainer}>
            <FieldTitle
              imageSource={ICONS.calendar}
              imageStyles={styles.todoImage}
              name="To-Do"
            />
            {/* <DashTodo /> */}
          </View>
          <View style={styles.optionCardContainer}>
            <OptionCard
              icons={card1Icons}
              name={'Create New Listing'}
              desc="Add more choice, get more customers, make more money"
              onPress={() => navigation.navigate('Create New Listing')}
            />
            <OptionCard
              icons={card2Icons}
              name={'Add your Payout Method'}
              desc="Get paid by adding your Payout details"
              onPress={() => navigation.navigate('paymentStack')}
            />
            <OptionCard
              icons={card3Icons}
              name={'Become a Verified Provider'}
              desc="Trust & Safety is our priority, verify your identity to help us keep the community secure for everyone"
              onPress={() => navigation.navigate('Profile Verification')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProviderDashA;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  width100: {
    width: '100%',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  welcomeContainer:{
    marginTop: 25,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  welcome: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('7'),
    color: 'black',
  },
  nameColor: {
    color: '#2C99C6',
  },
  dashNotification: {marginTop: 9, width: '90%'},
  fieldTitleContainer: {marginTop: 18, width: '90%'},
  fieldImage: {width: 15.22, height: 20},
  todoImage: {width: 18.74, height: 18.74},
  optionCardContainer: {marginTop: 9, width: '90%', paddingBottom: 20},
});
