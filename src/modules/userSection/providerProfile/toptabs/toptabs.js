import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Listings } from '../listings';
import { Review } from '../review';
import { Info } from '../info';
import { View, Image, StyleSheet, Text } from 'react-native';
import { ProviderProfileHeadCard } from '../components/profileHeadCard';
import { FONTS, ICONS } from '../../../../constant';

const TopTabs = createMaterialTopTabNavigator();

const ProviderProfileTopTabs = (props) => {
  return (
    <View style={{ flexGrow: 1 }} >
      <ProviderProfileHeadCard
        fname="John"
        lanme="Doe"
        verified={true}
        titles={[{ name: 'Trainer' }, { name: 'Coach' }, { name: 'Instructor' }]}
        rating="9.5"
        totalListings="4"
        userRatings="1,000"
        mainTitle="Skill Sharer"
        navigation={props.navigation}
        userId={props.route.params.userId}
      />
      <TopTabs.Navigator>
        <TopTabs.Screen
          name="Listings"
          component={Listings}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <View style={styles.tabBtnStyle}>
                <Image
                  source={focused ? ICONS.listAc : ICONS.listIn}
                  style={{ width: wp('4'), height: wp('4') }}
                  resizeMode={'contain'}
                />
                <Text style={focused ? styles.activeTabLabel : styles.inactiveTabLabel} >Listings</Text>
              </View>
            ),
          }}
          initialParams={{ userId: props.route.params.userId }}
        />
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
                  style={{ width: wp('5'), height: wp('5') }}
                  resizeMode={'contain'}
                />
                <Text style={focused ? styles.activeTabLabel : styles.inactiveTabLabel} >Info</Text>
              </View>
            ),
          }}
          initialParams={{ userId: props.route.params.userId }}
        />
        <TopTabs.Screen
          name="Reviews"
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
          initialParams={{ userId: props.route.params.userId }}
        />
      </TopTabs.Navigator>
    </View>
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
