import React from 'react';
import {StyleSheet, View} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import {FONTS} from '../../../constant';

export const CustomCalendar = () => {
  return (
    <View style={styles.container}>
      <CalendarStrip
        scrollable
        style={{height: 200, paddingTop: 20, paddingBottom: 10}}
        calendarColor={'#F8FAFF'}
        calendarHeaderStyle={styles.calendarHeaderStyle}
        dateNumberStyle={styles.dateNumberStyle}
        dateNameStyle={styles.dateNameStyle}
        iconContainer={{flex: 0.1}}
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
  },
  dateNameStyle: {
    color: '#2A2A2A',
    opacity: 0.5,
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
    // borderWidth: 1,
    backgroundColor: '#2C99C6',
  },
  highlightDateNumberStyle: {
    color: 'white',
  },
  highlightDateNameStyle: {
    color: 'white',
  },
});
