import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONTS } from '../../../../constant';

export const CustomCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const markedDatesArray = [

    {
      date: moment().format('YYYY-MM-DD') ,
      dots: [
        {
          color: '#FF7D7D',
        },
        {
          color: '#FF7D7D',
        },
      ],
    },

    {
      date: moment('2022-01-15', 'YYYY-MM-DD'),
      dots: [
        {
          color: '#FF7D7D',
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <CalendarStrip
        markedDates={markedDatesArray}
        scrollable
        selectedDate={currentDate}
        onDateSelected={(value) => console.log("value: ", value)}
        style={{ height: 130, paddingTop: 20, paddingBottom: 10 }}
        calendarColor={'#F8FAFF'}
        calendarHeaderStyle={styles.calendarHeaderStyle}
        dateNumberStyle={styles.dateNumberStyle}
        dateNameStyle={styles.dateNameStyle}
        iconContainer={{ flex: 0.1 }}
        calendarHeaderContainerStyle={styles.calendarHeaderContainerStyle}
        highlightDateContainerStyle={styles.highlightDateContainerStyle}
        highlightDateNumberStyle={styles.highlightDateNumberStyle}
        highlightDateNameStyle={styles.highlightDateNameStyle}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateNumberStyle: {
    color: '#2A2A2A',
    opacity: 0.5,
    fontSize: wp('2'),
    fontFamily: FONTS.SFRegular
  },
  dateNameStyle: {
    color: '#2A2A2A',
    opacity: 0.5,
    fontSize: wp('1.2'),
    fontFamily: FONTS.SFRegular
  },
  calendarHeaderStyle: {
    color: '#2A2A2A',
    fontSize: 25,
    fontFamily: FONTS.SFBold,
    textAlign: 'left',
    alignItems: 'flex-start',
  },
  calendarHeaderContainerStyle: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  highlightDateContainerStyle: {
    backgroundColor: '#2C99C6',
  },
  highlightDateNumberStyle: {
    color: 'white',
    fontSize: wp('2'),
    fontFamily: FONTS.SFRegular
  },
  highlightDateNameStyle: {
    color: 'white',
    fontSize: wp('1.3'),
    fontFamily: FONTS.SFRegular
  },
});
