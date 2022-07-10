import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import { FONTS, ICONS } from '../../constant';
import Header from './components/headerLogoBI';
import { YourListingCard } from './components/yourListingCard';


export const YourListings = navigation => {

  function onFilterPress() {
  }

  return (
    <SafeAreaView style={styles.main}>
      <Header navigation={navigation} />
      <View style={styles.headView}>
        <Text style={styles.title}>Your Listings</Text>
        <TouchableOpacity onPress={onFilterPress}>
          <Image source={ICONS.filter} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>
      <View style={{ width: '85%', marginTop: 20 }}>
        <YourListingCard active />
        <YourListingCard completed />
        <YourListingCard draft onPublishPress={() => { }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  title: {
    fontFamily: FONTS.SFBold,
    color: 'black',
    fontSize: 32,
  },
  filterIcon: {
    height: 11.04,
    width: 16.23,
  },
  headView: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
  },
});
