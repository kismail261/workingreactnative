import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {FONTS, ICONS} from '../../../constant';
import {DashNotification} from './dashComponents/DashNotification';
import {FieldTitle} from './dashComponents/fieldTitle';
import {FourCompBox} from './dashComponents/fourCompBox';
import {OptionCard} from './dashComponents/optionCard';
import {DashTodo} from './dashComponents/todo';
import {setAuthToken, setCurrentUser} from '../../../redux/user/user.action';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Header from '../../../common/headerLogoBI';
import {deleteToken, deleteUser} from '../../../helpers/user.helper';

const ProviderDashA = ({navigation}) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setAuthToken(null));
    dispatch(setCurrentUser(null));
    deleteToken();
    deleteUser();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'authRoute'}],
      }),
    );
  };

  var name = 'John';
  return (
    <SafeAreaView style={styles.main}>
      <Header navigation={navigation} />
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View
            style={{
              marginTop: 25,
              width: '90%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.welcome}>
              Welcome{' '}
              <Text style={[styles.welcome, styles.nameColor]}>{name}!</Text>
            </Text>
          </View>
          <View style={{marginTop: 9, width: '90%'}}>
            <DashNotification defaultIcon />
          </View>
          <View style={{marginTop: 17, width: '90%'}}>
            <FieldTitle
              imageSource={ICONS.moneybag}
              imageStyles={{width: 15.22, height: 20}}
              name="Financials"
            />
            <FourCompBox
              title1="Earnings September"
              val1="$1,500"
              title2="Earnings 12 Months"
              val2="$5k"
              title3="Pending Payout"
              val3="$1,000"
              title4="Available"
              val4="$500"
            />
          </View>
          <View style={{marginTop: 18, width: '90%'}}>
            <FieldTitle
              imageSource={ICONS.rocket}
              imageStyles={{width: 18.74, height: 18.74}}
              name="Performance"
            />
            <FourCompBox
              isCurrency={false}
              title1="Bookings September"
              val1="6"
              title2="Booking 12 Months"
              val2="4"
              title3="Active Listings"
              val3="14"
              title4="Rating Average"
              val4="20"
            />
          </View>
          <View style={{marginTop: 18, width: '90%'}}>
            <FieldTitle
              imageSource={ICONS.calendar}
              imageStyles={{width: 18.74, height: 18.74}}
              name="To-Do"
            />
            <DashTodo
            // name="Hello" quantity="10"
            />
          </View>
          <View style={{marginTop: 9, width: '90%'}}>
            <OptionCard
              name="Create New Listings"
              desc="Add more choice, get more customers, make more money"
              onPress={() => navigation.navigate('providerProfile')}
              icons={[
                {
                  source: ICONS.ball,
                  size: 25,
                },
                {
                  source: ICONS.tanis,
                  size: 25,
                },
                {
                  size: ICONS.cycle,
                  size: 25,
                },
              ]}
              // name="Hello" quantity="10"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProviderDashA;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  welcome: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('7'),
    color: 'black',
  },
  nameColor: {
    color: '#2C99C6',
  },
});
