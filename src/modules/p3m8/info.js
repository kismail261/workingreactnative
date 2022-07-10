import React from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {FONTS, ICONS} from '../../constant';

const Title = props => {
  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
      <Image source={props.source} style={[props.style, {marginRight: 14}]} />
      <Text style={styles.titleName}>{props.name}</Text>
    </View>
  );
};

export const Info = props => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '80%', marginTop: 36, marginBottom: 36}}>
        <Title
          source={ICONS.gender}
          style={{height: 21, width: 21}}
          name="Gender"
        />
        <Text style={[styles.desc, {marginLeft: 40}]}>Male</Text>
      </View>
      <View style={{width: '80%', marginBottom: 36}}>
        <Title
          source={ICONS.calendarSmall}
          style={{height: 15, width: 17}}
          name="Date of Birth"
        />
        <Text style={[styles.desc, {marginLeft: 40}]}>19th November, 1990</Text>
      </View>
      <View style={{width: '80%', marginBottom: 36}}>
        <Title
          source={ICONS.mail}
          style={{height: 11, width: 17}}
          name="Email"
        />
        <Text style={[styles.desc, {marginLeft: 40}]}>JohnDoe@gmail.com</Text>
      </View>
      <View style={{width: '80%', marginBottom: 36}}>
        <Title
          source={ICONS.phone}
          style={{height: 17, width: 17}}
          name="Phone Number"
        />
        <Text style={[styles.desc, {marginLeft: 40}]}>0129348475</Text>
      </View>
      <View style={{width: '80%', marginBottom: 36}}>
        <Title
          source={ICONS.home}
          style={{height: 21, width: 16}}
          name="Address"
        />
        <Text style={[styles.desc, {marginLeft: 40}]}>
          3806 Sharon Lane, California
        </Text>
      </View>
      <View style={{width: '80%', marginBottom: 36}}>
        <Title
          source={ICONS.alert}
          style={{height: 20, width: 20}}
          name="Emergency Contact"
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 30}}>
          <Text style={[styles.subText, {width: '30%'}]}>Name:</Text>
          <Text style={styles.desc}>Sarah Wilson</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 30}}>
          <Text style={[styles.subText, {width: '30%'}]}>Relation:</Text>
          <Text style={styles.desc}>Wife</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 30}}>
          <Text style={[styles.subText, {width: '30%'}]}>Cell:</Text>
          <Text style={styles.desc}>123123123</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 30}}>
          <Text style={[styles.subText, {width: '30%'}]}>Email:</Text>
          <Text style={styles.desc}>xyz@gmial.com</Text>
        </View>
      </View>
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
    fontSize: 14,
  },
  subText: {
    fontFamily: FONTS.SFMedium,
    color: 'black',
    fontSize: 16,
    opacity: 3.8,
  },
  desc: {
    fontFamily: FONTS.SFMedium,
    color: 'black',
    fontSize: 20,
  },
});
