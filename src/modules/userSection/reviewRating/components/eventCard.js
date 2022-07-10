import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { FONTS, ICONS, ImageUrl } from '../../../../constant';

export const EventCard = ({ detail }) => {

  useEffect(() => {
  }, [])

  return (
    <View style={styles.main}>
      <View style={styles.row}>
        <Image
          style={[styles.img, { marginRight: 16 }]}
          source={detail.images.length > 0 ? { uri: ImageUrl + detail.images[0] } : ICONS.listingImage}
        />
        <View style={styles.col}>
          <Text style={[styles.name, { marginBottom: 8 }]}>{detail.listingType}</Text>
          <Text style={[styles.event, { marginBottom: 1 }]}>
            {detail.title}
          </Text>
          <View style={{ flexDirection: 'row' }} >
            <Image source={ICONS.greenMarker} style={styles.locationIcon} />
            <Text style={[styles.address]}>
              {detail.location == undefined ? 'n/a' : detail.location.shortName}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    height: 105,
    alignItems: 'center',
    borderColor: '#15488F26',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
  },
  img: {
    height: 67,
    width: 68,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
  },
  col: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  event: {
    fontFamily: FONTS.SFBold,
    fontSize: 18,
  },
  name: {
    fontFamily: FONTS.SFRegular,
    fontSize: 10,
  },
  address: {
    fontFamily: FONTS.SFRegular,
    fontSize: 12,
  },
  locationIcon: {
    height: 11.5,
    width: 8.33,
    marginRight: 5,
    marginTop: 2
  },
});
