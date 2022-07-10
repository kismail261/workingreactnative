import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';
import { ButtonRegular } from '../../../../common/buttonRegular';
import Header from '../../../../common/headerBL';
import { FONTS } from '../../../../constant';
import { showMessage } from '../../../../helpers/replaceDigitsWithAesteriks';
import { ScheduleCard } from './components/scheduleCard';

export const SelectSchedule = (props) => {
  const listDetail = props.route.params.listDetail
  const [schedule, setSchedule] = useState('')

  useEffect(() => {
    return () => {
      
    }
  }, [])

  const getSelectedSchedule = (value) => {
    setSchedule(value)
  }

  const onClick = () => {
    
    if (schedule == '') {
      showMessage("Please select schedule first")
    } else {
      let scheduleDetail = listDetail.schedules.filter((item) => item._id == schedule)
      let data = {
        listing: listDetail,
        scheduleDetail: scheduleDetail
      }
      props.navigation.navigate("bookineFor", { apiData: data })
    }
  }

  return (
    <View style={styles.main}>
      <Header navigation={props.navigation} label="Select Schedule" />
      <View style={{ width: '90%', marginTop: 22 }}>
        <Text style={styles.title}>{listDetail.schedules.length} Schedules Available</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}} >
        <View style={{ width: '90%', alignSelf:'center', paddingBottom:80 }}>
          {
            listDetail.schedules.map((item, index) => {
              return (
                <ScheduleCard value={schedule} key={index} data={item} getSelection={getSelectedSchedule.bind(this)} />
              )
            })
          }
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <ButtonRegular
          buttonStyle={{ backgroundColor: '#2C99C6' }}
          title="Continue Booking"
          onClick={onClick}
        />
      </View>
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
    fontFamily: FONTS.SFBold,
    fontSize: 22,
    color: 'black',
  },
  bottom: {
    width: '90%',
    position: 'absolute',
    bottom: 20,
  },
});
