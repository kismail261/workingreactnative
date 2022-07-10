import React from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONTS, ICONS } from '../../../constant';

const Title = props => {
  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
      <Image source={props.source} style={[props.style, { marginRight: 14, marginBottom:-5 }]} />
      <Text style={styles.titleName}>{props.name}</Text>
    </View>
  );
};

export const Info = props => {
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={{flexGrow:1}} >
        <View style={{ width: wp('100'), alignItems: 'center' }} >
          <View style={{ width: '80%', marginTop: 22, marginBottom: 22 }}>
            <Title
              source={ICONS.gender}
              style={{ height: 21, width: 21 }}
              name="Gender"
            />
            <Text style={[styles.desc, { marginLeft: 37 }]}>Male</Text>
          </View>
          <View style={{ width: '80%', marginBottom: 22 }}>
            <Title
              source={ICONS.calendarSmall}
              style={{ height: 15, width: 17 }}
              name="Date of Birth"
            />
            <Text style={[styles.desc, { marginLeft: 30 }]}>19th November, 1990</Text>
          </View>
          <View style={{ width: '80%', marginBottom: 22 }}>
            <Title
              source={ICONS.mail}
              style={{ height: 11, width: 17 }}
              name="Email"
            />
            <Text style={[styles.desc, { marginLeft: 30 }]}>JohnDoe@gmail.com</Text>
          </View>
          <View style={{ width: '80%', marginBottom: 22 }}>
            <Title
              source={ICONS.phone}
              style={{ height: 17, width: 17 }}
              name="Phone Number"
            />
            <Text style={[styles.desc, { marginLeft: 35 }]}>0129348475</Text>
          </View>
          <View style={{ width: '80%', marginBottom: 22 }}>
            <Title
              source={ICONS.home}
              style={{ height: 21, width: 16 }}
              name="Address"
            />
            <Text style={[styles.desc, { marginLeft: 30 }]}>
              3806 Sharon Lane, California
            </Text>
          </View>
          <View style={{ width: '80%', marginBottom: 22 }}>
            <Title
              source={ICONS.alert}
              style={{ height: 20, width: 20 }}
              name="Emergency Contact"
            />
            <View
              style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 36 }}>
              <Text style={[styles.subText, { width: '30%' }]}>Name:</Text>
              <Text style={styles.desc}>Sarah Wilson</Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 36 }}>
              <Text style={[styles.subText, { width: '30%' }]}>Relation:</Text>
              <Text style={styles.desc}>Wife</Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 36 }}>
              <Text style={[styles.subText, { width: '30%' }]}>Cell:</Text>
              <Text style={styles.desc}>123123123</Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 36 }}>
              <Text style={[styles.subText, { width: '30%' }]}>Email:</Text>
              <Text style={styles.desc}>xyz@gmial.com</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
    flex: 1,
  },
  titleName: {
    fontFamily: FONTS.SFMedium,
    color: '#6B6B6B',
    fontSize: wp('3.5'),
  },
  subText: {
    fontFamily: FONTS.SFMedium,
    color: 'black',
    fontSize: wp('4'),
    opacity: 3.8,
  },
  desc: {
    fontFamily: FONTS.SFMedium,
    color: 'black',
    fontSize: wp('5'),
  },
});
