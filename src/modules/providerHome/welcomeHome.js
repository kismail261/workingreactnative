import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { FONTS, ICONS } from '../../constant';
import { getBadgeEnabled } from '../../redux/user/user.action';
import { HomeCardView } from './components/homeCardView';


const welcomeHome = props => {
  const dispatch = useDispatch()
  const userDetail = useSelector(state => state.user.userDetail);
  const badgeEnabled = useSelector(state => state.user.badgeEnabled)
  const token = useSelector(state => state.user.token)

  useEffect(() => {
    dispatch(getBadgeEnabled(token))
    console.log("userDetail: ", userDetail)
    return () => { };
  }, []);

  const card1Icons = [
    { icon: ICONS.ball, style: { height: 30.92, width: 30.92 } },
    { icon: ICONS.tanis, style: { height: 35.42, width: 35.42 } },
    { icon: ICONS.cycle, style: { height: 34.2, width: 45.47 } },
  ];
  const card2Icons = [
    { icon: ICONS.bank, style: { height: 32.97, width: 40.62 } },
    { icon: ICONS.atmcard, style: { height: 30.33, width: 47.46 } },
  ];
  const card3Icons = [
    { icon: ICONS.verifiedBadge, style: { height: 38.29, width: 31.05 } },
  ];

  function onCreateListing() {
    props.navigation.navigate('Create New Listing');
  }
  function onAddPayout() {
    props.navigation.navigate('paymentStack');
  }
  function onVerifiedProvider() {
    if (badgeEnabled == "pending") {
      props.navigation.navigate('Profile Verification');
    } else {
      props.navigation.navigate('Profile Verification', { screen: 'reviewAgain' });
    }
  }
  return (

    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {
        userDetail != null && userDetail.isOrganization
          ?
          <Text style={styles.heading}>
            Welcome
            <Text style={{ color: '#2C99C6' }}>
              {' '}
              {userDetail.organizationInfo.orgName != undefined ? userDetail.organizationInfo.orgName.charAt(0).toUpperCase() + userDetail.organizationInfo.orgName.slice(1) : ''}!
            </Text>
          </Text>
          :
          <Text style={styles.heading}>
            Welcome
            {
              userDetail != null && userDetail.firstName != undefined
                ?
                <Text style={{ color: '#2C99C6' }}>
                  {' '}
                  {userDetail != null ? userDetail.firstName.charAt(0).toUpperCase() + userDetail.firstName.slice(1) : ''}!
                </Text>
                :
                <Text></Text>
            }

          </Text>
      }

      <View style={{ height: 5 }} />
      <View style={{width: wp('95%'),}}>
        <HomeCardView
          iconsArray={card1Icons}
          title={'Create your first Listing'}
          desc="Start selling more by showing new Users what they can book"
          onPress={onCreateListing}
        />
        <HomeCardView
          iconsArray={card2Icons}
          title={'Add your Payout Method'}
          desc="Get paid by adding your Payout details"
          onPress={onAddPayout}
        />
        <HomeCardView
          iconsArray={card3Icons}
          title={'Become a Verified Provider'}
          desc="Trust & Safety is our priority, verify your identity to help us keep the community secure for everyone"
          onPress={onVerifiedProvider}
        />
      </View>

      {/* {
                listingData.map((item, index) => {
                    return (
                        <Card key={index} data={item} navigation={props.navigation} />
                    )
                })
            } */}
    </ScrollView>
  );
};

export default welcomeHome;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  divider: {
    width: wp('100%'),
    height: 1,
    backgroundColor: '#70707026',
    top: Platform.OS == 'ios' ? 25 : 0,
  },
  heading: {
    width: wp('85%'),
    color: '#2A2A2A',
    fontSize: wp('7'),
    fontFamily: FONTS.SFBold,
    marginTop: Platform.OS == 'ios' ? 30 : 20,
  },
});
