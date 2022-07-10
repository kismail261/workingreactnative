import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {BookingCard} from './components/bookingCard';
import {CalendarLarge} from './components/calendarLarge';
import Header from '../../common/headerBL';
import TNIndicator from '../../common/TNIndicator';
import {getUsersBookingList} from '../../redux/booking/booking.action';
import {setLoader} from '../../redux/loader/loader.action';

export const Bookings = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const currentUser = useSelector(state => state.user.currentUser);
  const loader = useSelector(state => state.loader.loader);

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(
      getUsersBookingList(
        token,
        `providerId=${currentUser != null ? currentUser._id : ''}`,
      ),
    );
    return () => {};
  }, []);

  return (
    <View style={styles.main}>
      <Header label="Bookings" navigation={props.navigation} />
      <CalendarLarge navigation={props.navigation} />
      {loader ? <TNIndicator /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  divider: {
    borderWidth: 1,
    borderColor: '#707070',
    width: '90%',
    marginBottom: 36,
    opacity: 0.1,
  },
});
