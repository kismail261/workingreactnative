import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import TNActivityIndicator from '../../common/TNIndicator';
import {FONTS, ImageUrl} from '../../constant';
import {getListBookings} from '../../redux/booking/booking.action';
import {setLoader} from '../../redux/loader/loader.action';
import BookingItem from './components/bookingItem';
import Header from './components/header';
import Item from './components/item';

const bookings = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const loader = useSelector(state => state.loader.loader);
  const listBookings = useSelector(state => state.booking.listBookings);
  const listingdDetail = props.route.params.listingId;
  const [activeTab, setActiveTab] = useState(1);
  const [booking, setBooking] = useState([]);
  const [bookingCancel, setBookingCancel] = useState([]);

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(getListBookings(token, listingdDetail._id));
    return () => {};
  }, []);
  useEffect(() => {
    sortBookings();
    return () => {};
  }, [listBookings, activeTab]);

  const sortBookings = () => {
    let tempBooking = [];
    let tempBookingCancel = [];
    listBookings.forEach(element => {
      if (element.status == 'active') {
        tempBooking.push(element);
      }
      if (element.status == 'partial-cancel') {
        tempBookingCancel.push(element);
      }
    });
    setBooking(tempBooking);
    setBookingCancel(tempBookingCancel);
  };

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} label="Bookings" />
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <BookingItem navigation={props.navigation} detail={listingdDetail} />
          <View style={styles.tabRow}>
            <TouchableOpacity
              onPress={() => setActiveTab(1)}
              style={activeTab == 1 ? styles.tab : styles.tabInactibe}>
              <Text
                style={
                  activeTab == 1
                    ? styles.activeLabelStyle
                    : styles.inactiveLabelStyle
                }>
                Active Bookings{' '}
              </Text>
              <View style={styles.countBox}>
                <Text style={styles.countText}>{booking.length}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab(2)}
              style={activeTab == 2 ? styles.tab : styles.tabInactibe}>
              <Text
                style={
                  activeTab == 2
                    ? styles.activeLabelStyle
                    : styles.inactiveLabelStyle
                }>
                Cancel Requests{' '}
              </Text>
              <View style={styles.countBox}>
                <Text style={styles.countText}>{bookingCancel.length}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{height: 15}} />
          {activeTab == 1 ? (
            <>
              {booking === undefined ? (
                booking.map((item, index) => {
                  return (
                    <Item
                      key={index}
                      navigation={props.navigation}
                      type={activeTab}
                      detail={item}
                      listingdDetail={listingdDetail}
                    />
                  );
                })
              ) : (
                <Image
                  style={{
                    width: wp(60),
                    height: hp(30),
                  }}
                  source={require('../../assets/images/nothingIcon.png')}></Image>
              )}
            </>
          ) : (
            <>
              {bookingCancel === undefined ? (
                bookingCancel.map((item, index) => {
                  return (
                    <Item
                      key={index}
                      navigation={props.navigation}
                      type={activeTab}
                      detail={item}
                      listingdDetail={listingdDetail}
                    />
                  );
                })
              ) : (
                <Image
                  style={{
                    width: wp(60),
                    height: hp(30),
                  }}
                  source={require('../../assets/images/nothingIcon.png')}></Image>
              )}
            </>
          )}
        </View>
      </ScrollView>
      {loader ? <TNActivityIndicator /> : null}
    </View>
  );
};

export default bookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  tabRow: {
    width: wp('100'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  tab: {
    width: wp('50'),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#2C99C6',
    borderBottomWidth: 2,
    justifyContent: 'center',
    padding: 8,
    borderBottomColor: '#2C99C6',
    borderBottomWidth: 2,
  },
  tabInactibe: {
    width: wp('50'),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#2C99C6',
    borderBottomWidth: 2,
    justifyContent: 'center',
    padding: 8.5,
    borderBottomColor: '#D5D5D5',
    borderBottomWidth: 1,
  },
  activeLabelStyle: {
    color: '#000000',
    fontSize: wp('4.5'),
    fontFamily: FONTS.SFMedium,
  },
  inactiveLabelStyle: {
    color: '#D5D5D5',
    fontSize: wp('4.5'),
    fontFamily: FONTS.SFMedium,
  },
  countBox: {
    width: 15,
    height: 15,
    backgroundColor: '#2C99C6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: '#FFFFFF',
    fontSize: 7,
  },
});
