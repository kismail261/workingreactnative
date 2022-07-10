import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import {FONTS, ICONS} from '../../../constant';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomSwitch} from './customSwitch';

// interface Props {
//   active?: boolean;
//   draft?: boolean;
//   completed?: boolean;
//   eventName?: string;
//   desc?: string;
//   onPublishPress?():void
// }

export const YourListingCard = props => {
  const [bookings, setBookings] = useState(false);
  function onOptionPress() {}
  return (
    <TouchableOpacity disabled style={styles.main}>
      <View style={styles.head}>
        <View
          style={[
            props.active && styles.typeActive,
            props.completed && styles.typeCompleted,
            props.draft && styles.typeDraft,
            styles.typeMain,
          ]}>
          {props.active && <Text style={styles.typeText}>Active</Text>}
          {props.completed && <Text style={styles.typeText}>Completed</Text>}
          {props.draft && <Text style={styles.typeText}>Draft</Text>}
        </View>
        <Icon
          name="ellipsis-vertical"
          size={9}
          style={{marginRight: 12.74}}
          onPress={onOptionPress}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '90%',
          //justifyContent: 'space-between',
          alignSelf: 'center',
        }}>
        <Image
          source={ICONS.listingImage}
          style={[styles.image, {marginRight: '2%'}]}
        />
        <View style={{alignItems: 'flex-start', width: '70%'}}>
          <Text style={styles.title}>
            {props.eventName ?? 'Gymnastics Class'}
          </Text>
          <Text style={styles.desc}>{props.desc ?? 'Event'}</Text>
        </View>
      </View>
      {!props.draft && (
        <View style={styles.bookingView}>
          <Icon
            name="help-circle-outline"
            color="#2C99C6"
            size={11.5}
            style={{marginRight: 2}}
          />
          <Text style={[styles.bookingText, {marginRight: 2}]}>
            Taking Bookings
          </Text>
          <CustomSwitch onToggle={setBookings} isOn={bookings} />
        </View>
      )}
      {props.draft && (
        <View style={styles.publishNow}>
          <Text onPress={props.onPublishPress} style={styles.publishText}>
            Publish Now
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    minHeight: 105,
    borderRadius: 4,
    borderColor: '#15488F26',
    backgroundColor: 'white',
    marginBottom: 16,
  },
  typeActive: {
    backgroundColor: '#98E263',
    borderWidth: 1,
    borderColor: '#52A91299',
    borderRadius: 2,
  },
  typeDraft: {
    backgroundColor: '#75BCD9',
    borderWidth: 1,
    borderColor: '#5CB0D2',
    borderRadius: 2,
  },
  typeCompleted: {
    backgroundColor: '#F95454',
    borderRadius: 2,
  },
  typeMain: {
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'white',
    height: 20,
    width: 64,
  },
  typeText: {
    color: 'white',
    fontSize: 8,
    fontFamily: FONTS.SFRegular, //NEEDS TO BE CHANGED TO HELVETICA REGULAR
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.SFBold,
    color: 'black',
  },
  desc: {
    fontFamily: FONTS.SFRegular,
    fontSize: 12,
    color: 'black',
  },
  bookingText: {
    fontFamily: FONTS.SFRegular,
    fontSize: 10,
    color: 'black',
  },
  image: {
    height: 67,
    width: 68,
    borderRadius: 4,
  },
  head: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
  bookingView: {
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 5,
  },
  publishText: {
    color: '#2C99C6',
    fontSize: 8,
    fontFamily: FONTS.SFBold, //CHANGE TO HELVETICA BOLD
  },
  publishNow: {
    borderTopColor: '#e6e6e6',
    borderTopWidth: 1,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 17.5,
  },
});
