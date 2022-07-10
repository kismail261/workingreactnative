import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONTS, ICONS} from '../../../constant';
import {useSelector} from 'react-redux';
import {showMessage} from '../../../helpers/replaceDigitsWithAesteriks';

const settingSection = ({items, title, navigation}) => {
  const badgeEnabled = useSelector(state => state.user.badgeEnabled);
  const userDetail = useSelector(state => state.user.userDetail);
  const listingArray = useSelector(state => state.listing.listingArray);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // console.log(userDetail)
    return () => {};
  }, []);

  const navigatorMethod = item => {
    if (
      [
        'Add Payout Method',
        'Account Management',
        'Find Help',
        'Community & Resources',
      ].includes(item)
    ) {
      return;
    }
    if (
      (item == 'Share a Listing' || item == 'Edit Listings') &&
      userDetail.profileFlags.contact == true &&
      userDetail.profileFlags.location == true &&
      userDetail.profileFlags.providerInfo == true
      
    ) {
      listingArray == null ? null : navigation.navigate('Listings');
    } else if (item == 'Profile Verification') {
      if (badgeEnabled == 'pending') {
        navigation.navigate('Profile Verification');
      } else {
        navigation.navigate('Profile Verification', {screen: 'reviewAgain'});
      }
    } else {
      if (item == 'Edit Organization') {
        navigation.navigate(
          userDetail.isOrganization
            ? 'editOrganizationIinfo'
            : 'editContactInfo',
        );
      } else {
        if (
          item == 'Create New Listings' ||
          (userDetail.profileFlags.contact == true &&
            userDetail.profileFlags.location == true &&
            userDetail.profileFlags.providerInfo == true)
        ) {
          navigation.navigate(item);
        } else {
          showMessage('Your Profile is not completed!');
        }
      }
    }
  };
  const renderLabel = label => {
    return label === 'Profile Verification' ? 'Account Verification' : label;
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setActive(!active)}
        style={styles.headerRow}>
        <Text style={styles.headerStyle}>{title}</Text>
        <Image
          source={active ? ICONS.downArrow : ICONS.nextArrow}
          style={styles.iconArrow}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
      {active ? (
        <View style={styles.activeContainer}>
          {items.map((item, index) => {
            return (
              <View key={index}>
                {item === 'Status' || item === 'Olympia Membership' ? (
                  <>
                    <View style={styles.divider} />
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemLabelStyle}>{item}</Text>
                      <View style={styles.commingSoonContainer}>
                        <Text style={styles.commingSoonLabel}>
                          Comming Soon
                        </Text>
                      </View>
                    </View>
                  </>
                ) : (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigatorMethod(item)}
                    style={{width: wp('90')}}>
                    <View style={styles.divider} />
                    <View style={styles.itemLabelContainer}>
                      <Text style={styles.itemLabelStyle}>
                        {renderLabel(item)}{' '}
                      </Text>
                      <Text style={styles.itemSecondLabelStyle}>
                        {item === 'Listings'
                          ? '- Edit, Delete and Share your listings'
                          : ''}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

export default settingSection;

const styles = StyleSheet.create({
  container: {
    width: wp('90'),
    alignItems: 'center',
  },
  activeContainer: {width: wp('90'), alignItems: 'center'},
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerStyle: {
    color: '#000000',
    fontFamily: FONTS.SFBold,
    fontSize: wp('5'),
  },
  divider: {
    width: wp('95'),
    backgroundColor: '#15488F1A',
    height: 1,
    marginTop: 12,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  itemLabelStyle: {
    color: '#707070',
    fontFamily: FONTS.SFMedium,
    fontSize: wp('4.2'),
  },
  itemContainer: {
    flexDirection: 'row',
    width: wp('90'),
    alignSelf: 'center',
  },
  itemSecondLabelStyle: {
    color: '#707070',
    fontFamily: FONTS.SFMedium,
    fontSize: wp('3.2'),
  },
  itemLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconArrow: {
    width: 14,
    height: 14,
  },
  commingSoonContainer: {
    width: 100,
    height: 22,
    backgroundColor: '#7CC7E7',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  commingSoonLabel: {
    color: '#FFFFFF',
    fontSize: 11,
  },
});
