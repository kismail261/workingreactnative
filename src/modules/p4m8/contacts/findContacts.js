import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ButtonRegular} from '../../../common/btnRegular';
import {FONTS, ICONS} from '../../../constant';
import Icon from 'react-native-vector-icons/Ionicons';

export const FindContacts = () => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={{margin: 20}} />
      <TouchableOpacity style={styles.box}>
        <View style={styles.row}>
          <Image
            source={ICONS.fbsmall}
            style={{height: 34, width: 35, marginHorizontal: 10}}
          />
          <Text style={styles.name}>From Facebook</Text>
        </View>
        <Icon name="chevron-forward-outline" color="black" size={20} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
        <View style={styles.row}>
          <Image
            source={ICONS.phonebook}
            style={{height: 32, width: 29, marginHorizontal: 10}}
          />
          <Text style={styles.name}>From Phone Contacts</Text>
        </View>
        <Icon name="chevron-forward-outline" color="black" size={20} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
        <View style={styles.row}>
          <Image
            source={ICONS.instasmall}
            style={{height: 35, width: 35, marginHorizontal: 10}}
          />
          <Text style={styles.name}>From Instagram</Text>
        </View>
        <Icon name="chevron-forward-outline" color="black" size={20} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  desc: {
    fontSize: 16,
    fontFamily: FONTS.SFRegular,
    color: '#3D3D3D',
  },
  img: {
    width: 252.57,
    height: 235.75,
  },
  name: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 16,
    color: 'black',
  },
  title18: {
    fontFamily: FONTS.SFBold,
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  points: {
    fontFamily: FONTS.SFBold,
    fontSize: 58,
    color: '#2C99C6',
    textAlign: 'center',
  },
  view: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  box: {
    height: 60,
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#15488F26',
    borderWidth: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '90%',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
