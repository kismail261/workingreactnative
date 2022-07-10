import {FONTS, ICONS} from '../../constant';
import {
  financials,
  inboxMessages,
  legal,
  logout,
  networkSharing,
  performance,
  profile,
  providerManagement,
  security,
  support,
  tools,
} from './components/data';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Header from './components/header';
import React from 'react';
import ReferralSection from './components/referralSection';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import SettingLogoutSection from './components/settingLogoutSection';
import SettingMsgSection from './components/settingMsgSection';
import SettingSection from './components/settingSection';
import SwitchUser from './components/switchUser';
import {useSelector} from 'react-redux';
import UserCard from './components/userCard';

const profileSetting = props => {
  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      <View style={styles.divider} />
      <ScrollView contentContainerStyle={styles.alignItemsCenter}>
        <Text style={styles.titleStyle}>Provider Account</Text>
        <UserCard navigation={props.navigation} />
        <SwitchUser navigation={props.navigation} />
        <View style={[styles.divider, styles.marginTop15]} />
        <ReferralSection navigation={props.navigation} />
        <View style={[styles.divider, styles.marginVertical15]} />
        <SettingSection
          items={providerManagement}
          title="Provider Management"
          navigation={props.navigation}
        />
        <View style={[styles.divider, styles.marginVertical15]} />
        <SettingSection
          items={profile}
          title="Profile"
          navigation={props.navigation}
        />
        <View style={[styles.divider, styles.marginVertical15]} />
        <SettingSection
          items={financials}
          title="Financials"
          navigation={props.navigation}
        />
        <View style={[styles.divider, styles.marginVertical15]} />
        <SettingSection
          items={performance}
          title="Performance"
          navigation={props.navigation}
        />
        <View style={[styles.divider, styles.marginVertical15]} />
        <SettingSection
          items={networkSharing}
          title="Network & Sharing"
          navigation={props.navigation}
        />
        <View style={[styles.divider, styles.marginVertical15]} />
        <SettingMsgSection
          items={inboxMessages}
          title="Inbox & Messages"
          navigation={props.navigation}
        />
        <View style={[styles.divider, styles.marginVertical15]} />
        <SettingSection
          items={tools}
          title="Tools"
          navigation={props.navigation}
        />
        <View style={[styles.divider, styles.marginVertical15]} />
        <SettingSection
          items={security}
          title="Security"
          navigation={props.navigation}
        />
        <View style={[styles.divider, styles.marginTop15]} />
        <TouchableOpacity
          style={styles.trustContainer}
          onPress={() => props.navigation.navigate('Trust & Safety')}>
          <Text style={styles.headerStyle}>Trust & Safety</Text>
        </TouchableOpacity>
        <View style={[styles.divider, styles.marginBottom15]} />
        <SettingSection
          items={support}
          title="Support"
          navigation={props.navigation}
        />
        <View style={[styles.divider, styles.marginVertical15]} />
        <SettingSection
          items={legal}
          title="Legal"
          navigation={props.navigation}
        />
        <View style={[styles.divider, styles.marginVertical15]} />
        <SettingLogoutSection
          items={logout}
          title="Logout"
          navigation={props.navigation}
        />

        <View style={[styles.divider, styles.marginVertical15]} />
      </ScrollView>
    </View>
  );
};

export default profileSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  divider: {
    width: wp('100'),
    height: 1,
    backgroundColor: '#15488F26',
  },
  titleStyle: {
    width: wp('90'),
    color: '#2A2A2A',
    fontSize: wp('7'),
    fontFamily: FONTS.SFBold,
    marginTop: 16,
    marginBottom: 12,
  },
  headerStyle: {
    width: '90%',
    color: '#000000',
    fontFamily: FONTS.SFBold,
    fontSize: wp('5'),
  },
  trustContainer: {
    width: '90%',
    height: 30,
    marginVertical: 10,
    justifyContent: 'center',
  },
  marginTop15: {
    marginTop: 15,
  },
  marginBottom15: {
    marginBottom: 15,
  },
  marginVertical15: {
    marginVertical: 15,
  },
});
