import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {FONTS} from '../../../../constant';
import Icon from 'react-native-vector-icons/Ionicons';

export const DateCard = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <>
      <View style={styles.main}>
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={{width: '80%', alignItems: 'flex-start'}}>
          <Text style={styles.date}>
            {days[date.getDay()] +
              ', ' +
              date.getDate() +
              ' ' +
              months[date.getMonth()]}
          </Text>
        </TouchableOpacity>
        <View style={styles.arrowCont}>
          <Icon
            name="chevron-back-outline"
            size={20}
            style={{marginHorizontal: 6}}
            onPress={() => {}}
          />
          <Icon
            name="chevron-forward-outline"
            size={20}
            style={{marginHorizontal: 6}}
            onPress={() => {}}
          />
        </View>
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 46,
    borderColor: '#15488F26',
    borderRadius: 4,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  date: {
    fontFamily: FONTS.SFRegular,
    color: '#707070',
    fontSize: 14,
  },
  arrowCont: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
