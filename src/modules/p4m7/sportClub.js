import React, { useState, useEffect } from 'react';
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
import { SportsEventCard } from './components/eventCard';
import { SliverCard } from './components/sliverCard';
// import { ButtonRegular } from '../../common/btnRegular';
import ButtonRegular from '../../common/largeBtnSP';
import Header from '../../common/headerBLC';
import axios from 'axios';
import { Url } from '../../constant';
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';


const PointsToCashCard = props => {
  return (
    <TouchableOpacity onPress={() => showMessage("Comming soon in version 2")} style={{ width: 148, marginRight: 10 }}>
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

export const SportyClub = (props) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getListings()
    return () => {
    }
  }, [])

  const getListings = async () => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios.get(`${Url}api/listing/sort-filters`,
      {
        params: {}
      },
      { headers: headers }
    ).then(resp => {
      let data = resp.data
      setListings(data.data);
    }).catch(error => {
      const err = error
      if (err.response) {
      }
    });
  };


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

  return (
    <SafeAreaView style={styles.main}>
      <Header label={"Sporty Club"} navigation={props.navigation} />
      <ScrollView style={{ width: '100%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ width: '90%', marginTop: 20 }}>
            <Text style={[styles.title, { fontSize: 26 }]}>Get paid to play</Text>
          </View>

          <View style={{ width: '90%', marginTop: 20 }}>
            <SliverCard />
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
              source={ICONS.blue_sp}
            />
            <Text style={[styles.descSmall, { width: '80%' }]}>
              You automatically joined the Sporty Club when you signed up for
              Sporforya.
            </Text>
          </View>
          <View style={styles.pointrow}>
            <Image
              style={[styles.pointIcon, { marginRight: 20 }]}
              source={ICONS.blue_calendar}
            />
            <Text style={[styles.descSmall, { width: '80%' }]}>
              For every $ you spend, we will give you 1 free Sporty Point.
            </Text>
          </View>
          <View style={styles.pointrow}>
            <Image
              style={[styles.pointIcon, { marginRight: 20 }]}
              source={ICONS.blue_money}
            />
            <Text style={[styles.descSmall, { width: '80%' }]}>
              Now you can play more but spend less $, because Sporty Points are
              just like cash.
            </Text>
          </View>
          <View style={styles.pointrow}>
            <Image
              style={[styles.pointIcon, { marginRight: 20 }]}
              source={ICONS.blue_crown}
            />
            <Text style={[styles.descSmall, { width: '80%' }]}>
              Collect 1000 points to become a Gold Member, and start earning
              double points!
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
            <SportsEventCard
              navigation={props.navigation}
              listings={listings}
            />
            {/* <FlatList data={listings} renderItem={renderEventsfunc} horizontal /> */}
          </View>
          <View style={{ width: '90%', marginTop: 20 }}>
            <Text style={[styles.title, { fontSize: 26 }]}>Frequently Asked Questions</Text>
            <Text style={[styles.descSmall, { marginTop: 5 }]}>
              Go to our Support page to learn more.
            </Text>
          </View>
          <View style={{ marginTop: 30 }}>
            <ButtonRegular label="FAQs" bgColor={"#2C99C6"} onClick={() => props.navigation.navigate("Contact Us")} />
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
