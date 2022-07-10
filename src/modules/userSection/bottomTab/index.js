import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS, FONTS, ICONS} from '../../../constant';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {UserAccount} from '../p4m1/userAccount';
import {SportsEvents} from '../p4m1/events';
import userProfileDetail from '../userProfile/toptabs/toptabs';
import {Bookings} from '../userCancelBookings/bookings';
import userBookingdetail from '../userCancelBookings/userBookingdetail';
import bookingDetail from '../userCancelBookings/bookingDetail';
import { SportsExplore } from '../p4m1/explore';
import cancelBookingNotifier from '../userCancelBookings/cancelBookingNotifier';
import UserChat from '../../chat';
import {useSelector} from 'react-redux';
import notificationsList from '../../notifications';

const Stack = createNativeStackNavigator();

function bookingRoute() {
  return (
    <Stack.Navigator headerMode={'none'} initialRouteName={'bookingList'}>
      <Stack.Screen
        name="bookingList"
        component={Bookings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="cancelBookingNotifier"
        component={cancelBookingNotifier}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="userBookingdetail"
        component={userBookingdetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="bookingDetail"
        component={bookingDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="notificationsList"
        component={notificationsList}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
function firstRoute() {
  return (
    <Stack.Navigator headerMode={'none'} initialRouteName={'SportsExplore'}>
      <Stack.Screen
        name="SportsExplore"
        component={SportsExplore}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SportsEvents"
        component={SportsEvents}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="notificationsList"
        component={notificationsList}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const token = useSelector(state => state.user.token);

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        tabBarShowLabel: false,
        // tabBarHideOnKeyboard: true
      }}>
      {/* <Tab.Screen
        name="home"
        component={SportsEvents}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBtnStyle}>
              <Image
                source={focused ? ICONS.searchActive : ICONS.searchIn}
                style={{width: 24, height: 24}}
                resizeMode={'contain'}
              />
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="home"
        component={firstRoute}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBtnStyle}>
              <Image
                source={focused ? ICONS.searchActive : ICONS.searchIn}
                style={{width: 24, height: 24}}
                resizeMode={'contain'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={bookingRoute}
        listeners={({navigation}) => ({
          tabPress: e => {
            if (token == null) {
              e.preventDefault();
              navigation.navigate('authRoute');
            }
          },
        })}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBtnStyle}>
              <Image
                source={focused ? ICONS.calendarAc : ICONS.calendarIn}
                style={{width: 24, height: 24}}
                resizeMode={'contain'}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="userProfileDetail"
        component={userProfileDetail}
        listeners={({navigation}) => ({
          tabPress: e => {
            if (token == null) {
              e.preventDefault();
              navigation.navigate('authRoute');
            }
          },
        })}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBtnStyle}>
              <Image
                source={focused ? ICONS.personActive : ICONS.personIcon}
                style={{width: 24, height: 24}}
                resizeMode={'contain'}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Message"
        component={UserChat}
        listeners={({navigation}) => ({
          tabPress: e => {
            if (token == null) {
              e.preventDefault();
              navigation.navigate('authRoute');
            }
          },
        })}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBtnStyle}>
              <Image
                source={focused ? ICONS.msgAc : ICONS.msgIn}
                style={{width: 32, height: 32}}
                resizeMode={'contain'}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="profileSetting"
        component={UserAccount}
        listeners={({navigation}) => ({
          tabPress: e => {
            if (token == null) {
              e.preventDefault();
              navigation.navigate('authRoute');
            }
          },
        })}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBtnStyle}>
              <Image
                source={focused ? ICONS.personAc : ICONS.moreIn}
                style={{width: 24, height: 24}}
                resizeMode={'contain'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000A2',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  tabBtnStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 3,
  },
  tabMainStyle: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    elevation: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    height: Platform.OS == 'android' ? 70 : 90,
    margin: 1,
    shadowColor: '#000000A2',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  labelStyle: {
    fontSize: 9,
    fontFamily: FONTS.Medium,
  },
  addAccountContainer: {
    width: wp('100%'),
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    bottom: -17,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 12,
  },
  headingStyle: {
    width: wp('90'),
    fontSize: wp('3.5'),
    fontFamily: FONTS.Medium,
    marginBottom: 6,
  },
  formRow: {
    width: wp('90'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerDate: {
    width: wp('43%'),
    height: 40,
    borderWidth: 1,
    borderColor: '#C2C7CF',
    borderRadius: 4,
    marginBottom: 12,
    padding: 4,
    paddingLeft: 10,
  },
});
