import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ButtonRegular } from '../../../../common/buttonRegular';
import Header from '../../../../common/headerBL';
import { FONTS } from '../../../../constant';
import { BookingForCard } from './components/bookingForCard';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../../../redux/loader/loader.action';
import TNIndicator from '../../../../common/TNIndicator';
import { getChildList } from '../../../../redux/profile/profile.action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from '../../../../helpers/replaceDigitsWithAesteriks';


export const BookingFor = props => {
  const apiData = props.route.params.apiData
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader);
  const token = useSelector(state => state.user.token);
  const currentUser = useSelector(state => state.user.currentUser);
  const childList = useSelector(state => state.profile.childList);

  const [selectedChild, setSelectedChild] = useState([]);

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(getChildList(token, currentUser._id));
    return () => { };
  }, []);

  const getSelectedList = value => {
    if (selectedChild.includes(value)) {
      let tempData = selectedChild.filter(item => item != value);
      setSelectedChild(tempData);
    } else {
      setSelectedChild([...selectedChild, value]);
    }
  };

  const onClick = () => {
    if (selectedChild.length == 0) {
      showMessage("Select at least one")
    } else {
      AsyncStorage.setItem(
        'selectedChild',
        JSON.stringify(selectedChild),
      );
      let data =
      {
        listing: apiData.listing,
        scheduleDetail: apiData.scheduleDetail,
        childIds: selectedChild
      }
      props.navigation.navigate('ConfirmBooking', { apiData: data });
    }
  }

  return (
    <View style={styles.main}>
      <Header navigation={props.navigation} label="Booking For" />
      <View style={{ width: '90%', marginTop: 32 }}>
        <Text style={styles.title}>Let us know whom you are booking for</Text>
      </View>
      <View style={{ width: '90%', marginTop: 32 }}>
        {childList.map((item, index) => {
          return (
            <BookingForCard
              key={index}
              value={selectedChild}
              data={item}
              getValue={getSelectedList.bind(this)}
            />
          );
        })}
      </View>
      <View style={{ width: '90%', marginTop: 32 }}>
        <ButtonRegular
          buttonStyle={{
            borderColor: '#2C99C6',
            borderWidth: 1,
            backgroundColor: 'transparent',
          }}
          textStyle={{ color: '#2C99C6' }}
          title="Add a Child"
          onClick={() => props.navigation.navigate('AddChild', { type: 2, apiData: apiData })}
        />
      </View>
      <View style={styles.bottom}>
        <ButtonRegular
          buttonStyle={{ backgroundColor: '#2C99C6' }}
          title="Continue Booking"
          onClick={onClick}

        />
      </View>
      {loader ? <TNIndicator /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.SFMedium,
    fontSize: 18,
    color: 'black',
  },
  bottom: {
    width: '90%',
    position: 'absolute',
    bottom: 20,
  },
});
