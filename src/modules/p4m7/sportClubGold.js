import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { FONTS, ICONS } from '../../constant';
import { SportsEventCard } from '../userSection/p4m1/components/eventCard';
import { GoldCard } from './components/goldCard';
import { ButtonRegular } from '../../common/btnRegular';
import Header from '../../common/headerBLC';



const PointsToCashCard = props => {
  return (
    <TouchableOpacity style={{ width: 148, marginRight: 10 }}>
      <Image
        style={{ width: 149, height: 95, borderRadius: 4, marginBottom: 17 }}
        source={ICONS.listingImage}
      />
      <Text
        style={[
          {
            width: '90%',
            fontFamily: FONTS.SFBold,
            fontSize: 16,
            marginBottom: 5,
          },
        ]}>
        {props.title}
      </Text>
      <Text
        style={[
          {
            width: '90%',
            fontFamily: FONTS.SFRegular,
            fontSize: 12,
            marginBottom: 5,
            color: '#3D3D3D',
          },
        ]}>
        {props.subtitle}
      </Text>
    </TouchableOpacity>
  );
};

export const SportClubGold = (props) => {

  const ptc = [
    {
      title: 'Get $5 in your Sporforya Wallet',
      subtitle: '$5 costs 250 Points ',
    },
    {
      title: 'Get $10 in your Sporforya Wallet',
      subtitle: '$10 costs 500 Points',
    },
    {
      title: 'Get $15 in your Sporforya Wallet',
      subtitle: '$15 costs 750 Points',
    },
  ];
  const renderPtcfunc = ({ item }) => {
    return <PointsToCashCard title={item.title} subtitle={item.subtitle} />;
  };
  const renderEventsfunc = ({ item }) => {
    return <SportsEventCard />;
  };
  const events = [1, 2];
  return (
    <SafeAreaView style={styles.main}>
      <Header label={"Sporty Club"} navigation={props.navigation} />
      <ScrollView style={{ width: '100%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ width: '90%', marginTop: 20 }}>
            <Text style={styles.title}>Get paid to play</Text>
          </View>

          <View style={{ width: '90%', marginTop: 20 }}>
            <GoldCard />
          </View>

          <View style={{ width: '90%', marginTop: 10 }}>
            <Text style={styles.head}>How it works</Text>
          </View>
          <View style={{ width: '90%', marginTop: 10 }}>
            <Text style={styles.descSmall}>
              The Sporty Club is Sporforya’s rewards program, where you get paid
              for doing the activities you love!
            </Text>
          </View>
          <View style={styles.pointrow}>
            <Image
              style={[styles.pointIcon, { marginRight: 20 }]}
              source={ICONS.blue_crown}
            />
            <Text style={[styles.descSmall, { width: '80%' }]}>
              You automatically joined the Sporty Club when you signed up for Sporforya.
            </Text>
          </View>
          <View style={styles.pointrow}>
            <Image
              style={[styles.pointIcon, { marginRight: 20 }]}
              source={ICONS.blue_calendar}
            />
            <Text style={[styles.descSmall, { width: '80%' }]}>
              For every $ you spend, we will give you 2 free Sporty Points.
            </Text>
          </View>
          <View style={styles.pointrow}>
            <Image
              style={[styles.pointIcon, { marginRight: 20 }]}
              source={ICONS.blue_money}
            />
            <Text style={[styles.descSmall, { width: '80%' }]}>
              Now you can play more but spend less $, because Sporty Points are just like cash.
            </Text>
          </View>
          <View style={{ width: '90%', marginTop: 20 }}>
            <Text style={styles.head}>Convert Points to Cash</Text>
          </View>
          <View style={{ width: '90%', marginTop: 20 }}>
            <FlatList data={ptc} renderItem={renderPtcfunc} horizontal />
          </View>
          <View style={{ width: '90%', marginTop: 20 }}>
            <Text style={styles.head}>
              Find your next activity and get more points!
            </Text>
          </View>
          <View style={{ width: '90%', marginTop: 20 }}>
            <FlatList data={events} renderItem={renderEventsfunc} horizontal />
          </View>
          <View style={{ width: '90%', marginTop: 20 }}>
            <Text style={styles.title}>Frequently Asked Questions</Text>
            <Text style={[styles.descSmall, { marginTop: 5 }]}>
              Go to our Support page to learn more.
            </Text>
          </View>
          <View style={{ width: '90%', marginTop: 20 }}>
            <ButtonRegular title="FAQs" blue />
          </View>
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
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: 26,
    color: 'black',
  },
  head: {
    fontFamily: FONTS.SFBold,
    fontSize: 22,
    color: 'black',
  },
  descSmall: {
    fontFamily: FONTS.SFRegular,
    fontSize: 16,
    color: '#3D3D3D',
  },
  desc: {
    fontFamily: FONTS.SFBold,
    fontSize: 26,
    color: 'black',
  },
  pointrow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: 10,
  },
  pointIcon: {
    height: 29,
    width: 29,
  },
});
