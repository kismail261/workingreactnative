import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONTS, ICONS, ImageUrl } from '../../../../constant';


export const BookingCard = props => {

  useEffect(() => {
    return () => {
    }
  }, [])


  return (
    <TouchableOpacity onPress={() => props.onClick()} style={styles.main}>
      {
        props.detail.listing.schedules.length > 0
          ?
          <View style={{ width: '9%', alignSelf: 'flex-start', marginTop: '2%' }}>
            <Text style={styles.time0}>{moment(props.detail.listing.schedules[0].duration.start).format('hh A')}</Text>
          </View>
          :
          <View style={{ width: '9%', alignSelf: 'flex-start', marginTop: '2%' }}>
            <Text style={styles.time0}>'n/a'</Text>
          </View>
      }
      <View
        style={[
          styles.card,
          props.yellow && styles.yellow,
          props.green && styles.green,
          props.red && styles.red,
          props.grey && styles.grey,
        ]}>
        {
          props.detail.listing.schedules.length > 0
            ?
            <View style={{ width: '90%' }}>
              <Text style={styles.time}>
                {moment(props.detail.listing.schedules[0].duration.start).format('hh:mm A')} - {moment(props.detail.listing.schedules[0].duration.end).format('hh:mm A')}
              </Text>
            </View>
            :
            <View style={{ width: '90%' }}>
              <Text style={styles.time}>
                n/a - n/a
              </Text>
            </View>
        }
        <View style={styles.row}>
          <Image source={props.detail.listing.images.length > 0 ? { uri: ImageUrl + props.detail.listing.images[0] } : ICONS.listingImage} style={styles.img} />
          <View
            style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <Text style={styles.title}>{props.detail.listing.title}</Text>
            <View style={{ flexDirection: 'row', }}>
              <Image source={ICONS.greenMarker} style={styles.locationIcon} />
              {
                props.detail.listing.location != undefined
                  ?
                  <Text numberOfLines={2} style={styles.address}>
                    {props.detail.listing.location.description}
                  </Text>
                  :
                  <Text style={styles.address}>
                    n/a
                  </Text>
              }

            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 109,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    alignSelf: 'center'
  },
  card: {
    height: 109,
    borderRadius: 7,
    borderColor: '#70707026',
    borderWidth: 1,
    alignItems: 'center',
    width: '88%',
    backgroundColor: 'white',
  },
  time: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('3.5'),
    color: '#2A2A2A',
    marginTop: 11,
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('4'),
    color: '#000000',
    marginBottom: 6,
  },
  address: {
    width: '80%',
    color: '#707070',
    fontFamily: FONTS.SFMedium,
    fontSize: wp('2.3'),
  },
  time0: {
    color: 'black',
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('3'),
  },
  locationIcon: {
    height: 11.5,
    width: 8.33,
    marginRight: 5,
    marginTop: 2
  },
  img: {
    height: 59,
    width: 61,
    borderRadius: 4,
    marginRight: 13,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 7,
  },
  yellow: {
    backgroundColor: '#FFDBBC',
  },
  green: {
    backgroundColor: '#BFFAD9',
  },
  red: {
    backgroundColor: '#E24545',
  },
  grey: {
    backgroundColor: '#00000029',
  }
});


