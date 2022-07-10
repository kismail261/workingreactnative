import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS, FONTS, ICONS } from '../../constant';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import providerHome from '../providerHome';
import chooseUserType from '../profileSetup/chooseUserType';
import contactIinfo from '../profileSetup/contactIinfo';
import confirmYourPhone from '../profileSetup/confirmYourPhone';
import noConfirmed from '../profileSetup/noConfirmed';
import locationIinfo from '../profileSetup/locationIinfo';
import homeMain from '../profileSetup/home/homeMain';
import orgHomeMain from '../profileSetup/home/orgHomeMain';
import congratulates from '../profileSetup/congratulates';
import welcomeHome from '../providerHome/welcomeHome';
import organizationIinfo from '../profileSetup/organization/organizationIinfo';
import orgLocationIinfo from '../profileSetup/organization/orgLocationIinfo';
import organizationContactInfo from '../profileSetup/organization/organizationContactInfo';
import updateContactInfo from '../profileSetup/organization/updateContactInfo';
import notifications from '../notifications';
import toptabs from '../listing/providerProfile/toptabs/toptabs';
import dash from '../listing/providerProfile/dash';
import chat from '../chat';
import listingHome from '../listing/yourListings/listingHome';
import profileSetting from '../profileSetting';
import { Bookings } from '../p3m8/bookings';
import bookingsDetail from '../bookings/bookingsDetail'
import cancellationDetail from '../bookings/cancellationDetail'
import amountPayable from '../bookings/amountPayable'
import reason from '../bookings/reason'
import thankYouNote from '../bookings/thankYouNote';
import approveCancel from '../bookings/approveCancel';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail } from '../../redux/user/user.action';

const Stack = createNativeStackNavigator();

function IndividualProfileSetupStack() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token)
  const currentUser = useSelector(state => state.user.currentUser)
  const userDetail = useSelector(state => state.user.userDetail)

  useEffect(() => {
    dispatch(getUserDetail(currentUser != null ? currentUser._id : ''))
    return () => {
    }
  }, [])



  return (
    <Stack.Navigator initialRouteName="providerHome">
      <Stack.Screen
        name="providerHome"
        component={userDetail != null && userDetail.listCount > 0 ? dash : providerHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="chooseUserType"
        component={chooseUserType}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="contactIinfo"
        component={contactIinfo}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="confirmYourPhone"
        component={confirmYourPhone}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="noConfirmed"
        component={noConfirmed}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="locationIinfo"
        component={locationIinfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="homeMain"
        component={homeMain}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="orgHomeMain"
        component={orgHomeMain}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="congratulates"
        component={congratulates}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="organizationIinfo"
        component={organizationIinfo}
        options={{
          headerShown: false
        }}
      />


      <Stack.Screen
        name="orgLocationIinfo"
        component={orgLocationIinfo}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="organizationContactInfo"
        component={organizationContactInfo}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="updateContactInfo"
        component={updateContactInfo}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="welcomeHome"
        component={welcomeHome}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={notifications}
        options={{
          headerShown: false
        }}
      />

    </Stack.Navigator>
  );
}

function bookingRoute() {

  return (
    <Stack.Navigator headerMode={"none"} initialRouteName={"bookingList"}>
      <Stack.Screen
        name="bookingList"
        component={Bookings}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="bookingsDetail"
        component={bookingsDetail}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="cancellationDetail"
        component={cancellationDetail}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="reason"
        component={reason}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="amountPayable"
        component={amountPayable}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="thankYouNote"
        component={thankYouNote}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="approveCancel"
        component={approveCancel}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
    backBehavior="history"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true
      }} >
      <Tab.Screen

        name="IndividualProfileSetupStack"
        component={IndividualProfileSetupStack}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBtnStyle}>
              <Image
                source={focused ? ICONS.homeActive : ICONS.homeIn}
                style={{ width: 24, height: 24 }}
                resizeMode={'contain'}
              />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={bookingRoute}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBtnStyle}>
              <Image
                source={focused ? ICONS.calendarAc : ICONS.calendarIn}
                style={{ width: 22, height: 22 }}
                resizeMode={'contain'}
              />
            </View>
          )
        }}
      />

      <Tab.Screen
        name="Listings"
        component={listingHome}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBtnStyle}>
              <Image
                source={focused ? ICONS.listAc : ICONS.listIn}
                style={{ width: 22, height: 22 }}
                resizeMode={'contain'}
              />
            </View>
          )
        }}
      />

      <Tab.Screen
        name="Message"
        component={chat}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBtnStyle}>
              <Image
                source={focused ? ICONS.msgAc : ICONS.msgIn}
                style={{ width: 32, height: 32 }}
                resizeMode={'contain'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={toptabs}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBtnStyle}>
              <Image
                source={focused ? ICONS.personActive : ICONS.personIcon}
                style={{ width: 24, height: 24 }}
                resizeMode={'contain'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="profileSetting"
        component={profileSetting}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBtnStyle}>
              <Image
                source={focused ? ICONS.personAc : ICONS.moreIn}
                style={{ width: 24, height: 24 }}
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
