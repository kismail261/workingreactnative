import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FavProviders } from './providers';
import { FavListings } from './listings';
import { SafeAreaView, View } from 'react-native';
import { FONTS } from '../../../constant';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../common/headerBL';


const TopTabs = createMaterialTopTabNavigator();

export const FavoritesTopTabs = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor:'#F8FAFF' }}>
      <Header label={"Favourites"} navigation={props.navigation} />
      <TopTabs.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontFamily: FONTS.SFMedium, fontSize: 14 },
          tabBarItemStyle: {
            backgroundColor: '#F8FAFF',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#D5D5D5',
        }}>
        <TopTabs.Screen
          name="Listings"
          component={FavListings}
          options={{
            tabBarIcon: ({ color, focused }) => {
              return (
                <Icon
                  name="list-outline"
                  size={20}
                  style={{ alignSelf: 'center', marginTop: 3 }}
                  color={focused ? "#2C99C6" : color}
                />
              );
            },
          }}
        />
        <TopTabs.Screen
          name="Providers"
          component={FavProviders}
          options={{
            tabBarIcon: ({ color, focused }) => {
              return (
                <Icon
                  name="person-outline"
                  size={20}
                  style={{ alignSelf: 'center' }}
                  color={focused ? "#2C99C6" : color}
                />
              );
            },
          }}
        />
      </TopTabs.Navigator>
    </View>
  );
};
