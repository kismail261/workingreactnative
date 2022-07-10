import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import { FONTS, ICONS, } from '../../../constant';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import moment from 'moment';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';

export const SportsEventCard = ({ listings, navigation }) => {

  return (
    <ScrollView horizontal={true} >
      <View style={{ flexDirection: 'row', alignItems: 'center' }} >
        {[1, 2, 3].map((listing, index) => (
          <TouchableOpacity
            onPress={() => showMessage("Comming soon in version 2")}
            style={[styles.main, { marginLeft: index == 0 || index == 2 ? 0 : 10 }]}
            key={index}>
            <ImageBackground
              borderRadius={4}
              source={ICONS.listingImage}
              style={styles.img}>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Image
                  source={ICONS.verifiedBadge}
                  style={styles.verifiedImg}
                />
                <Icon name="heart-outline" size={20} color="#FFFFFFD9" />
              </View>
            </ImageBackground>
            <View
              style={{
                marginTop: 13,
                flexDirection: 'row',
                alignItems: 'flex-end',
                width: '100%',
              }}>
              <Image source={ICONS.starBlue} style={styles.startIcon} />
              <Text style={styles.gainedRating}>9.5</Text>
              <Text style={styles.totalRating}>/10</Text>
            </View>
            <View style={{ marginTop: 10, width: '100%' }}>
              <Text style={styles.title}>Cycling Event for Women</Text>
            </View>
            <View style={{ marginTop: 4, width: '100%' }}>
              <Text style={styles.address}>
                7 Fawn Ave. Farmingdale, NY 11735
              </Text>
            </View>
            <View style={{ marginTop: 4, width: '100%' }}>
              <Text style={styles.date}>
                16th July 2020 - 20th July, 2020
              </Text>
            </View>
            <View style={{ marginTop: 9, width: '100%' }}>
              <Text style={styles.amount}>
                $23
              </Text>
            </View>
          </TouchableOpacity>
        ))
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    width: wp('90'),
    marginHorizontal: 10,
  },
  img: {
    height: 171,
    width: '100%',
    alignItems: 'center',
  },
  verifiedImg: {
    height: 20.79,
    width: 16.86,
  },
  startIcon: {
    height: 16.75,
    width: 17.48,
    marginRight: 5,
  },
  gainedRating: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('3.5'),
    color: 'black',
  },
  totalRating: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('2'),
    color: 'black',
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('6'),
    color: 'black',
  },
  address: {
    fontFamily: FONTS.SFMedium,
    fontSize: wp('3.5'),
    color: 'black',
  },
  date: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('2.8'),
    color: 'black',
  },
  amount: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('4.5'),
    color: 'black',
  },
});
