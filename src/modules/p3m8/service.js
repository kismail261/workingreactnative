import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, ICONS} from '../../constant';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dropdown} from './components/dropdown';

const Card = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: '#15488F26',
        borderRadius: 4,
        height: 100,
        marginVertical: 20,
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}>
        <Image
          source={ICONS.listingImage}
          style={{height: 80, width: 88, borderRadius: 4}}
        />
        <View style={{width: '60%'}}>
          <Text
            style={{
              fontFamily: FONTS.SFMedium,
              color: 'black',
              fontSize: 14,
            }}>
            This is a Virtual Online Service
          </Text>
          <Text
            style={{
              fontFamily: FONTS.SFRegular,
              color: '#707070',
              fontSize: 12,
            }}>
            Note : you don't need to select a physical location
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#707070',
            opacity: 0.3,
            height: 18,
            width: 18,
            borderRadius: 18,
          }}></View>
      </View>
    </View>
  );
};

export const Service = () => {
  var pageDesc =
    'Please tell us about your service. The more information you provide, the easier it will be for people to book';

  function onAddPhotos() {}

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: '85%', marginTop: 22.5}}>
            <Text style={[styles.head, {marginBottom: 9}]}>
              Service Details
            </Text>
            <Text style={styles.desc}>{pageDesc}</Text>
          </View>
          <View style={{width: '85%', marginTop: 15}}>
            <Text style={[styles.subhead, {marginBottom: 10}]}>
              Select the Sport or Activity
            </Text>
            <Dropdown name="Soccer" />
          </View>
          <View style={{width: '85%', marginTop: 23}}>
            <Text style={styles.subhead}>Select the Type of Service</Text>
            <Dropdown name="Type of Service" />
          </View>
          <View style={{width: '85%', marginTop: 15}}>
            <Text style={styles.subhead}>Name or Title of the Service</Text>
            <Text style={[styles.desc, {marginBottom: 10}]}>
              Give your service a short distinct name or title
            </Text>
            <TextInput
              style={styles.ti}
              placeholder="Youth Soccer Tournament Elite Division"
              placeholderTextColor="#707070"
            />
          </View>
          <View style={{width: '85%', marginTop: 20}}>
            <Text style={[styles.subhead, {marginBottom: 5}]}>
              Service Description
            </Text>

            <TextInput
              style={styles.ti}
              placeholder="Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad ullamco laboris nisi ut aliquip"
              placeholderTextColor="#707070"
              multiline
            />
            <Card />
          </View>
          <View style={{width: '85%', marginTop: 20}}>
            <Text style={[styles.subhead, {marginBottom: 5}]}>
              About Your Staff
            </Text>
            <TextInput
              style={styles.ti}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
              placeholderTextColor="#707070"
              multiline
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '85%',
              marginTop: 20,
            }}>
            <Text style={[styles.subhead, {marginRight: 5}]}>
              Add Photos for Your Service
            </Text>
            <Icon name="information-circle" size={20} color={COLORS.G2Color} />
          </View>
          <View style={{width: '85%'}}>
            <Text style={styles.desc}>
              Photos help bring your service to life and show people the real
              experience.
            </Text>
          </View>
          <TouchableOpacity onPress={onAddPhotos} style={styles.addPhotsBtn}>
            <Icon
              name="add-circle"
              size={24}
              color="#B4D9EC"
              style={{marginRight: 10}}
            />
            <Text style={[styles.desc, {color: 'black'}]}>
              Add up to 6 photos.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueBtn}>
            <Text
              style={{
                fontSize: 14,
                color: 'white',
                fontFamily: FONTS.SFMedium,
              }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  head: {
    fontSize: 26,
    fontFamily: FONTS.SFSemiBold,
    color: 'black',
  },
  subhead: {
    fontSize: 14,
    fontFamily: FONTS.SFSemiBold,
    color: 'black',
  },
  desc: {
    color: '#707070',
    fontSize: 14,
    fontFamily: FONTS.SFRegular,
  },
  ti: {
    borderColor: '#70707026',
    borderWidth: 1,
    minHeight: 46,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 4,
    width: '100%',
  },
  addPhotsBtn: {
    width: '85%',
    borderWidth: 2,
    borderColor: '#B4D9ECB3',
    backgroundColor: '#B4D9EC1A',
    height: 64,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 70,
  },
  continueBtn: {
    backgroundColor: '#2C99C6',
    height: 70,
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});
