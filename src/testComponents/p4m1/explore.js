import React, { useEffect } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonRegular } from '../../../common/buttonRegular';
import { FONTS } from '../../../constant';
import { ICONS } from '../../../constant/icons';
import { ExploreEventCard } from './components/exploreEventCard';
import { Searchbar } from './components/searchbar';
import { TrainerProfile } from './components/trainerProfile';
import { setUserMode, getUserDetail, getBadgeEnabled } from '../../../redux/user/user.action';
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';


export const SportsExplore = (props) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token)
  const currentUser = useSelector(state => state.user.currentUser)
  

  useEffect(() => {
    if(token != null){
      dispatch(getUserDetail(currentUser._id));
      dispatch(getBadgeEnabled(token))
    }
    
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ExploreEventCard
        name={item.name}
        listings={item.listings}
        img={item.img}
        onPress={() => props.navigation.navigate("userBottomTab")}
      />
    );
  };
  const renderProfessionalsCards = ({ item }) => {
    return (
      <TrainerProfile
        name="John Doe"
        profession="Football Trainer"
        address="4750 W Birchwood Dr, Shawano, WI, 54166"
        amount="1,100"
        navigation={props.navigation}
      />
    );
  };

  const e1 = [
    { name: 'Fitness', listings: '30', img: require('../../../assets/images/fitness.png') },
    { name: 'Golf', listings: '13', img: require('../../../assets/images/golf.png') },
    { name: 'Basketball', listings: '22', img: require('../../../assets/images/bascketBall.png') },
    { name: 'Football', listings: '05', img: require('../../../assets/images/football.png') },
  ];
  const e2 = [
    { name: 'Cycling', listings: '30', img: require('../../../assets/images/cycling.png') },
    { name: 'Baseball', listings: '13', img: require('../../../assets/images/volleyball.png') },
    { name: 'Running', listings: '22', img: require('../../../assets/images/running.png') },
    { name: 'Soccer', listings: '05', img: require('../../../assets/images/soccer.png') },
  ];

  const e3 = [
    { name: 'Tennis', listings: '30', img: require('../../../assets/images/tannis.png') },
    { name: 'Softball', listings: '13', img: require('../../../assets/images/baseball.png') },
    { name: 'Yoga', listings: '22', img: require('../../../assets/images/ypga.png') },
    { name: 'Running', listings: '05', img: require('../../../assets/images/runner.png') },
  ];

  function onSwapPress() {
    dispatch(setUserMode(false))
    token == null
      ?
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'authRoute' }],
        }),
      )
      :
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'mainRoutes' }],
        }),
      )
  }

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={{ width: '100%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <ImageBackground source={ICONS.sports1} style={styles.image1} resizeMode='stretch'>
            <View style={{ width: '90%' }}>
              <Text style={styles.title}>Explore Sports Activities</Text>
            </View>
            <View style={{ width: '90%', marginTop: 21 }}>
              <Searchbar
                navigation={props.navigation}
                placeholder="Search sports services, events, or facilities"
              />
            </View>
          </ImageBackground>
          <View style={{ width: '90%', marginTop: 46 }}>
            <Text style={styles.head}>
              Join a Team, Class, Camp & much more!
            </Text>
          </View>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginTop: 25, marginLeft: wp('2.8') }}>
            <FlatList
              scrollEnabled={false}
              contentContainerStyle={{
                alignSelf: 'flex-start',
              }}
              numColumns={Math.ceil(e1.length / 2)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={e1}
              renderItem={renderItem}
            />
          </ScrollView>
          <View style={{ width: '90%', marginTop: 35 }}>
            <Text style={styles.head}>Participate in Events!</Text>
          </View>
          
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginTop: 25, marginLeft: wp('2.8') }}>
            <FlatList
              scrollEnabled={false}
              contentContainerStyle={{
                alignSelf: 'flex-start',
              }}
              numColumns={Math.ceil(e1.length / 2)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={e2}
              renderItem={renderItem}
            />
          </ScrollView>

          <View style={{ height: 30 }} />

          <LinearGradient
            colors={['#3B5998', '#0D6B93']}
            style={{ height: 640, width: '100%', alignItems: 'center' }}>
            <View style={{ width: '90%', marginTop: 36, marginBottom: 30 }}>
              <Text style={[styles.title, { fontSize: wp('8') }]}>
                Looking for a private lesson or personal training from a local
                Skill Sharer?
              </Text>
            </View>
            <View style={{ width: '90%' }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
                renderItem={renderProfessionalsCards}
              />
            </View>
            <View style={{ width: '90%', marginTop: 22 }}>
              <ButtonRegular title="See More" onClick={() => showMessage("Coming soon")} />
            </View>
          </LinearGradient>
          <View style={{ width: '90%', marginTop: 34, marginBottom: 29 }}>
            <Text style={styles.head}>Rent Facilities</Text>
          </View>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginLeft: wp('2.5') }}>
            <FlatList
              scrollEnabled={false}
              contentContainerStyle={{
                alignSelf: 'flex-start',
              }}
              numColumns={Math.ceil(e1.length / 2)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={e3}
              renderItem={renderItem}
            />
          </ScrollView>
          <View style={{ height: 30 }} />
          <ImageBackground source={ICONS.sports2} style={styles.image2}>
            <View style={{ width: '90%' }}>
              <Text style={[styles.title, { fontSize: wp('9') }]}>
                Be a Sports & Activities Provider
              </Text>
            </View>
            <View style={{ width: '90%', marginTop: 8 }}>
              <Text style={styles.img2Desc}>
                Organizations and Individuals can be Provider's on Sporforya.
                It's quick, easy and FREE to list your services, events or
                facilities for people to find and book.
              </Text>
            </View>
            <View style={{ width: '90%', marginTop: 22 }}>
              <ButtonRegular
                secondary
                title="Become a Provider"
                buttonStyle={{ backgroundColor: '#2C99C6' }}
                onClick={onSwapPress}
              />
            </View>
            <View style={{ height: 50 }} />
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  image1: {
    width: '100%',
    height: hp('100'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image2: {
    width: '100%',
    height: 550,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('14'),
    color: 'white',
  },
  head: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('8'),
    color: 'black',
  },
  img2Desc: {
    width:'85%',
    fontFamily: FONTS.SFRegular,
    fontSize: wp('4'),
    color: 'white',
  },
});
