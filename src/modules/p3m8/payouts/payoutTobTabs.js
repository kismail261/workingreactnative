import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {PaymentTopCard} from './components/topCard';
import {FONTS} from '../../../constant';
import {Pending} from './pending';
import {Withdrawn} from './withdrawn';
import {Available} from './available';
import Header from '../../../common/headerBLC';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {showMessage} from '../../../helpers/replaceDigitsWithAesteriks';

const TopTabs = createMaterialTopTabNavigator();

export const PaymentTopTabs = props => {
  useEffect(() => {
    // showMessage("No record found")
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <Header navigation={props.navigation} label="Payouts & Payments" />
      <View style={styles.headContainer}>
        <Text style={styles.headtxt}>Payouts & Payments</Text>
      </View>

      <PaymentTopCard />
      <View style={{height: 10}} />
      <TopTabs.Navigator
        screenOptions={{
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarStyle: styles.tabBar,
          tabBarIndicatorStyle: styles.tabBarIndicator,
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: 'rgba(0, 0, 0, 0.46)',
        }}>
        <TopTabs.Screen name="Pending" component={Pending} />
        <TopTabs.Screen name="Withdrawn" component={Withdrawn} />
        <TopTabs.Screen name="Available" component={Available} />
      </TopTabs.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {flex: 1, backgroundColor: '#F8FAFF'},
  headContainer: {
    width: '90%',
    marginLeft: wp('8'),
    marginBottom: 9,
    marginTop: 20,
  },
  tabBarLabel: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('3.7'),
    textTransform: 'none',
  },
  tabBar: {backgroundColor: '#F8FAFF'},
  tabBarIndicator: {backgroundColor: '#2C99C6'},
  headtxt: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('7'),
    color: 'black',
  },
});
