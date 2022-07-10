import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { SafeAreaView, View, Image, StyleSheet, Text } from 'react-native';
import { FONTS, ICONS } from '../../../../constant';
import Header from '../../../../common/headerBLC';
import Info from '../../../profileSetting/infoTab'
import UserDetail from '../../../profileSetting/components/userDetail'
import { MyChildren } from '../myChildren'
import { Review } from '../../../listing/providerProfile/review'


const TopTabs = createMaterialTopTabNavigator();

const ProviderProfileTopTabs = (props) => {
  return (
    <SafeAreaView style={{ flexGrow: 1, backgroundColor: '#F8FAFF' }} >
      <Header label={"My Profile"} navigation={props.navigation} />
      <View style={{ width: wp('100'), alignItems: 'center' }} >
        <View style={{ height: 15 }} />
        <UserDetail navigation={props.navigation} />
        <View style={{ height: 15 }} />
      </View>

      <TopTabs.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#F8FAFF' },
          tabBarIndicatorStyle: { backgroundColor: '#2C99C6', }
        }}
      >
        <TopTabs.Screen
          name="Info"
          component={Info}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <View style={styles.tabBtnStyle}>
                <Image
                  source={focused ? ICONS.infoIconActive : ICONS.infoInactive}
                  style={{ width: wp('4'), height: wp('4') }}
                  resizeMode={'contain'}
                />
                <Text style={focused ? styles.activeTabLabel : styles.inactiveTabLabel} >Info</Text>
              </View>
            ),
          }}
        />
        <TopTabs.Screen
          name="MyChildren"
          component={MyChildren}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <View style={styles.tabBtnStyle}>
                <Image
                  source={focused ? ICONS.listAc : ICONS.listIn}
                  style={{ width: wp('5'), height: wp('5') }}
                  resizeMode={'contain'}
                />
                <Text style={focused ? styles.activeTabLabel : styles.inactiveTabLabel} >My Child</Text>
              </View>
            ),
          }}
        />
        <TopTabs.Screen
          name="Review"
          component={Review}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <View style={styles.tabBtnStyle}>
                <Image
                  source={focused ? ICONS.starActive : ICONS.starInactive}
                  style={{ width: wp('5'), height: wp('5') }}
                  resizeMode={'contain'}
                />
                <Text style={focused ? styles.activeTabLabel : styles.inactiveTabLabel} >Reviews</Text>
              </View>
            ),

          }}
        />
      </TopTabs.Navigator>

    </SafeAreaView>
  );
};
export default ProviderProfileTopTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF'
  },
  tabBtnStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabLabel: {
    color: '#000000',
    fontSize: wp('4'),
    fontFamily: FONTS.SFMedium,
    marginLeft: 6
  },
  inactiveTabLabel: {
    color: '#D5D5D5',
    fontSize: wp('4'),
    fontFamily: FONTS.SFMedium,
    marginLeft: 6
  }

})
