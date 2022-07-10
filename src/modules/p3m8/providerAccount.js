import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {FONTS, ICONS} from '../../constant';
import {ProviderUserCard} from './components/providerUserCard';
import {ExpandableView} from './components/expandable';
import {ExpandableOption} from './components/expandableOption';
export const ProviderAccount = navigation => {
  function onSwapPress() {}
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: '85%', marginBottom: 21}}>
            <Text style={styles.title}>Provider Account</Text>
          </View>
          <View style={{width: '85%', marginBottom: 18}}>
            <ProviderUserCard />
          </View>
          <View style={{width: '85%'}}>
            <Text style={[styles.mode]}>
              You are currently in Provider Mode
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '85%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={styles.head}>Switch to User</Text>
            <TouchableOpacity onPress={onSwapPress}>
              <Image
                source={ICONS.swap}
                style={{height: 15.02, width: 14.64}}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.divider, {marginVertical: 20.5}]}></View>
          <View style={{width: '90%', alignSelf: 'flex-end'}}>
            <ExpandableView title="Provider Management">
              <ExpandableOption name="Create New Listing" />
              <ExpandableOption name="Edit Organization" />
              <ExpandableOption name="Edit Listings" />
              <ExpandableOption name="Status" comingsoon />
              <ExpandableOption name="Listings" />
            </ExpandableView>
            <ExpandableView title="Profile">
              <ExpandableOption name="Profile Verification" />
              <ExpandableOption name="My Profile" />
            </ExpandableView>
            <ExpandableView title="Financials">
              <ExpandableOption name="Payout & Payments" />
              <ExpandableOption name="Tax Info" />
              <ExpandableOption name="Stripe Support" />
            </ExpandableView>
            <ExpandableView title="Performance">
              <ExpandableOption name="Bookings" />
              <ExpandableOption name="Reviews & Ratings" />
            </ExpandableView>
            <ExpandableView title="Network & Sharing">
              <ExpandableOption name="Refer a Provider" />
              <ExpandableOption name="Refer a Friend" />
              <ExpandableOption name="Share a Listing" />
            </ExpandableView>
            <ExpandableView title="Inbox & Messages">
              <ExpandableOption name="Message" />
            </ExpandableView>
            <ExpandableView title="Tools">
              <ExpandableOption name="Olympia Membership" comingsoon />
              <ExpandableOption name="Linked Accounts" />
              <ExpandableOption name="Give Us Feedback" />
              <ExpandableOption name="Change Language" />
              <ExpandableOption name="Notifications" />
            </ExpandableView>
            <ExpandableView title="Security">
              <ExpandableOption name="Password" />
              <ExpandableOption name="2 Step Verification" />
            </ExpandableView>
            <ExpandableView title="Trust & Safety">
              {/* <ExpandableOption name=""/> */}
            </ExpandableView>
            <ExpandableView title="Support">
              <ExpandableOption name="Find Help" />
              <ExpandableOption name="Community & Resources" />
              <ExpandableOption name="Contact Us" />
            </ExpandableView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  title: {
    fontFamily: FONTS.SFBold,
    color: 'black',
    fontSize: 26,
  },
  mode: {
    fontFamily: FONTS.SFRegular,
    fontSize: 12,
    color: 'black',
    opacity: 0.56,
  },
  head: {
    fontFamily: FONTS.SFBold,
    color: 'black',
    fontSize: 18,
  },
  divider: {
    borderColor: '#707070',
    borderWidth: 1,
    opacity: 0.1,
    width: '100%',
  },
});
