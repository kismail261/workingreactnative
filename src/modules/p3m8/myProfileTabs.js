import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ProfileHead} from './components/profileHead';
import {FONTS} from '../../constant';
import {Reviews} from './reviews';
import {Info} from './info';

const TopTabs = createMaterialTopTabNavigator();

export const MyProfileTabs = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#F8FAFF'}}>
      <ProfileHead />
      <TopTabs.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontFamily: FONTS.SFMedium, fontSize: 14},
          tabBarStyle: {backgroundColor: '#F8FAFF'},
        }}>
        <TopTabs.Screen name="Info" component={Info} />
        <TopTabs.Screen name="Reviews" component={Reviews} />
      </TopTabs.Navigator>
    </View>
  );
};
