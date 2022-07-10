import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Text, Image} from 'react-native';
import {FONTS, ICONS} from '../../../../constant';
import {BookingForCardSimple} from './components/bookingForCardSimple';
import {EventCard} from './components/eventCard';
import {ButtonRegular} from '../../../../common/buttonRegular';
import Header from '../../../../common/headerBL';
import {useSelector} from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const Box = props => {
  const [selectedChild, setSelectedChild] = useState([]);
  const token = useSelector(state => state.user.token);
  const currentUser = useSelector(state => state.user.currentUser);

  useEffect(() => {
    getChildData();
  }, []);

  const getChildData = async () => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`https://api2.sporforya.com/api/child?parentId=${currentUser._id}`, {
        headers: headers,
      })
      .then(async resp => {
        let response = resp.data.data;
        const previousSelectedChil = await AsyncStorage.getItem(
          'selectedChild',
        );
        const temp = response.filter(resp =>
          previousSelectedChil.includes(resp._id),
        );
        setSelectedChild(temp);
      })
      .catch(error => {
        const err = error;
        if (err.response) {
        }
      });
  };

  return (
    <View
      style={{
        height: 62,
        borderWidth: 1,
        borderColor: '#15488F26',
        borderRadius: 4,
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 20,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
        }}>
        {props.content1}
      </View>
      <View
        style={{width: '65%', alignItems: 'center', justifyContent: 'center'}}>
        {props.content2}
      </View>
    </View>
  );
};

export const ConfirmBooking = props => {
  const apiData = props.route.params.apiData;
  const childList = useSelector(state => state.profile.childList);
  const [listingData, setListingData] = useState({});

  const [selectedChild, setSelectedChild] = useState([]);
  const token = useSelector(state => state.user.token);
  const currentUser = useSelector(state => state.user.currentUser);

  useEffect(() => {
    getChildData();
  }, []);

  useEffect(() => {
    getListingData();
  }, []);

  const getListingData = async () => {
    try {
      const response = await fetch(
        `https://api2.sporforya.com/api/listing/by/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();
      console.log('setListingData --- -- - - -- - : ', data);
      setListingData(data);
    } catch (error) {}
  };
  const getChildData = async () => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`https://api2.sporforya.com/api/child?parentId=${currentUser._id}`, {
        headers: headers,
      })
      .then(async resp => {
        let response = resp.data.data;
        const previousSelectedChil = await AsyncStorage.getItem(
          'selectedChild',
        );
        const temp = response.filter(resp =>
          previousSelectedChil.includes(resp._id),
        );
        setSelectedChild(temp);
      })
      .catch(error => {
        const err = error;
        if (err.response) {
        }
      });
  };

  const continuePayClick = () => {
    props.navigation.navigate('Payment', {apiData: apiData});
  };
  const onClick = () => {
    let data = {
      listing: apiData.listing,
      scheduleDetail: apiData.scheduleDetail,
    };
    props.navigation.navigate('bookineFor', {apiData: data});
  };

  return (
    <View style={styles.main}>
      <Header label={'Confirm Booking'} navigation={props.navigation} />
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: '90%', marginTop: 31}}>
            <EventCard detail={apiData.listing} />
          </View>
          <View style={styles.row}>
            <Text style={styles.head}>Your Schedule</Text>
            <Text
              onPress={() =>
                props.navigation.navigate('SelectSchedule', {
                  listDetail: apiData.listing,
                })
              }
              style={styles.change}>
              Change
            </Text>
          </View>
          <View style={{width: '90%', marginTop: 15}}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={ICONS.calendar}
                  style={{width: 14, height: 14, marginRight: 8}}
                />
                <Text style={styles.date}>
                  {moment(apiData.scheduleDetail[0].duration.start).format(
                    'ddd, DD MMM',
                  )}{' '}
                  -{' '}
                  {moment(apiData.scheduleDetail[0].duration.end).format(
                    'ddd, DD MMM',
                  )}
                </Text>
              </View>
              <Text style={[styles.time, {marginLeft: 22, marginTop: 6}]}>
                {moment(apiData.scheduleDetail[0].duration.start).format(
                  'hh:mm :A',
                )}{' '}
                -{' '}
                {moment(apiData.scheduleDetail[0].duration.end).format(
                  'hh:mm A',
                )}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.head}>Booking For</Text>
            <Text onPress={onClick} style={styles.change}>
              Change
            </Text>
          </View>
          <View style={{width: '90%', marginTop: 15}}>
            <View style={{width: '90%', marginTop: 0}}>
              {selectedChild.map((item, index) => {
                return (
                  <View key={index}>
                    <BookingForCardSimple
                      key={index}
                      value={selectedChild}
                      data={item}
                    />
                    <View
                      style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: '#15488F26',
                        marginVertical: 14,
                      }}
                    />
                  </View>
                );
              })}
            </View>
          </View>
          <View style={{width: '90%', marginTop: 15}}>
            <Text style={styles.head}>Price Details</Text>
          </View>

          <View style={{width: '90%', marginTop: 12}}>
            <View style={styles.priceMain}>
              <View style={{width: '90%'}}>
                <View style={[styles.priceRow]}>
                  <Text style={[styles.name]}>
                    Price (
                    {apiData.scheduleDetail[0].pricing.quantity +
                      ' ' +
                      apiData.scheduleDetail[0].pricing.per}
                    )
                  </Text>
                  <Text style={[styles.name]}>
                    ${' '}
                    {apiData.scheduleDetail[0].pricing.price *
                      selectedChild.length}
                  </Text>
                </View>
                <View style={[styles.priceRow, {borderBottomWidth: 0}]}>
                  <Text style={[styles.name, {fontFamily: FONTS.SFBold}]}>
                    Total (USD)
                  </Text>
                  <Text style={[styles.name, {fontFamily: FONTS.SFBold}]}>
                    ${' '}
                    {apiData.scheduleDetail[0].pricing.price *
                      selectedChild.length}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{height: 20}} />
            {/* will be available in version 2 */}
            {/* <Box
              content1={
                <Image
                  source={ICONS.discountIcon}
                  style={{ height: 30, width: 30, borderRadius: 30 }}
                />
              }
              content2={
                <Text style={styles.boxText}>
                  Get a discount on your booking by <Text onPress={() => props.navigation.navigate("ReferAFriend")} style={{ color: '#2C99C6' }} >Inviting your friend</Text>
                </Text>
              }
            /> */}
          </View>
          <View style={{width: '90%', marginTop: 20}}>
            <Box
              content1={
                <Image
                  source={ICONS.greenTick}
                  style={{height: 30, width: 30, borderRadius: 30}}
                />
              }
              content2={
                <Text style={styles.boxText}>
                  I agree to{' '}
                  <Text style={{color: '#2C99C6'}}>
                    Cancellation Policy &, Waiver Release of Liability
                  </Text>
                </Text>
              }
            />
          </View>
          <View style={{width: '90%', marginTop: 40}}>
            <ButtonRegular
              buttonStyle={{backgroundColor: '#2C99C6'}}
              title="Continue to Pay"
              onClick={continuePayClick}
            />
          </View>
          <View style={{height: 40}} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
  },
  row: {
    marginTop: 31,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  head: {
    fontFamily: FONTS.SFBold,
    fontSize: 22,
  },
  change: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 14,
    color: '#2C99C6',
  },
  date: {
    fontFamily: FONTS.SFMedium,
    fontSize: 14,
    color: '#000000',
  },
  time: {
    fontFamily: FONTS.SFMedium,
    fontSize: 12,
    color: '#707070',
  },
  priceMain: {
    borderRadius: 4,
    backgroundColor: '#D7F0FD',
    alignItems: 'center',
    paddingVertical: 6,
  },
  priceRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    paddingVertical: 15,
    width: '100%',
    flexDirection: 'row',
  },
  boxText: {
    // width:'75%',
    fontFamily: FONTS.SFRegular,
    fontSize: 15,
  },
  nameBold: {
    fontFamily: FONTS.SFBold,
    fontSize: 14,
  },
  name: {
    fontFamily: FONTS.SFRegular,
    fontSize: 14,
  },
});
