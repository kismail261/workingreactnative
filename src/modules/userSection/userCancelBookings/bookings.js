import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView } from 'react-native';
import { BookingCard } from './components/bookingCardNext';
import { CustomCalendar } from './components/calendar';
import Header from '../../../common/headerBL';
import { useSelector, useDispatch } from 'react-redux';
import TNIndicator from '../../../common/TNIndicator'
import { getUsersBookingList } from '../../../redux/booking/booking.action'
import { setLoader } from '../../../redux/loader/loader.action'
import { CalendarLarge } from './components/calendarLarge';

export const Bookings = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const currentUser = useSelector(state => state.user.currentUser);
  const userBookingList = useSelector(state => state.booking.userBookingList);
  const loader = useSelector(state => state.loader.loader);

  useEffect(() => {
    if(token != null){
      dispatch(setLoader(true))
      dispatch(getUsersBookingList(token, `userId=${currentUser._id}`))
    }
    return () => {

    }
  }, [])

  return (
    <View style={styles.main}>
      <Header label="Bookings" navigation={props.navigation} />
      <CalendarLarge navigation={props.navigation} />
      {
        loader
          ?
          <TNIndicator />
          :
          null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width:'100%',
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#707070',
    width: '90%',
    marginBottom: 36,
    opacity: 0.1,
  },
});
