import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { FONTS, ICONS, ImageUrl } from '../../../../../constant';

export const EventCard = ({ detail }) => {

  useEffect(() => {
    console.log(detail.images)
    
  }, [])

  return (
    <View style={styles.main}>
      <View style={styles.row}>
        <Image
          style={[styles.img, { marginRight: 16 }]}
          source={detail.images.length > 0 ? { uri: ImageUrl + detail.images[0] } : ICONS.listingImage}
        />
        <View style={styles.col}>
          <Text style={[styles.event, { marginBottom: 7 }]}>
            {detail.title}
          </Text>
          {
            detail.provider.isOrganization
              ?
              <Text style={[styles.name, { marginBottom: 8 }]}>{detail.provider.organizationInfo.orgName == undefined ? 'n/a' : detail.provider.organizationInfo.orgName}</Text>
              :
              <Text style={[styles.name, { marginBottom: 8 }]}>{detail.provider.firstName == undefined ? 'n/a' : detail.provider.firstName}</Text>
          }
          <Text style={[styles.address]}>
            {detail.location == undefined ? 'n/a' : detail.location.shortName}
          </Text>
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
    fontFamily: FONTS.SFSemiBold,
    fontSize: 16,
  },
  address: {
    fontFamily: FONTS.SFRegular,
    fontSize: 12,
  },
});
