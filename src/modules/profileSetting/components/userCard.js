import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';
import {useSelector} from 'react-redux';
import {FONTS, ICONS} from '../../../constant';
import {ImageUrl} from '../../../constant';

const UserCard = ({navigation}) => {
  const {userDetail, currentUser} = useSelector(({user}) => user);

  const [steps, setSteps] = useState(0);
  const [stepscount, setStepsCount] = useState('3 steps left');

  useEffect(() => {
    if (userDetail != null) {
      if (
        userDetail.profileFlags.contact &&
        userDetail.profileFlags.location &&
        userDetail.profileFlags.providerInfo
      ) {
        setSteps(1);
        setStepsCount('completed');
      } else if (
        userDetail.profileFlags.contact &&
        userDetail.profileFlags.location
      ) {
        setSteps(0.7);
        setStepsCount('1 steps left');
      } else if (userDetail.profileFlags.contact) {
        setSteps(0.3);
        setStepsCount('2 steps left');
      } else {
        setSteps(0);
        setStepsCount('3 steps left');
      }
    }
    return () => {};
  }, []);
  return (
    <View style={styles.container}>
      {userDetail != null && userDetail.isOrganization ? (
        <TouchableOpacity
          style={styles.userContainer}
          onPress={() => navigation.navigate('My Profile')}>
          <Image
            source={
              userDetail.organizationInfo.avatar != undefined
                ? {uri: ImageUrl + userDetail.organizationInfo.avatar}
                : ICONS.userIcon
            }
            style={{width: wp('11'), height: wp('11'), borderRadius: wp('5.5')}}
          />
          <View style={{width: '83%'}}>
            <Text style={styles.titleStyle}>
              {userDetail.organizationInfo.orgName != undefined
                ? userDetail.organizationInfo.orgName
                : 'n/a'}
            </Text>
            <Text style={styles.emailStyle}>{currentUser.email}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.userContainer}
          onPress={() => navigation.navigate('My Profile')}>
          <Image
            source={
              userDetail.providerInfo.avatar != undefined
                ? {uri: ImageUrl + userDetail.providerInfo.avatar}
                : ICONS.userIcon
            }
            style={{width: wp('11'), height: wp('11'), borderRadius: wp('5.5')}}
          />
          <View style={{width: '83%'}}>
            <Text style={styles.titleStyle}>
              {userDetail.firstName != undefined ? userDetail.firstName : 'n/a'}{' '}
              {userDetail != null && userDetail.lastName != undefined
                ? userDetail.lastName
                : 'n/a'}
            </Text>
            <Text style={styles.emailStyle}>{userDetail.email}</Text>
          </View>
        </TouchableOpacity>
      )}
      {steps !== 1 && (
        <>
          <View style={styles.divider} />
          <View style={styles.userFooter}>
            <Text style={styles.footerHeadingStyle}>{stepscount}</Text>
            <Progress.Bar
              borderWidth={0}
              color="#50BD00"
              unfilledColor="#7B9CFE4D"
              progress={steps}
              width={wp('84.5')}
              height={13}
              borderRadius={13}
            />
            <Text style={styles.subHeadingStyle}>
              Complete your profile in order to publish listing.
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    width: wp('90'),
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#15488F1A',
    borderRadius: 4,
  },
  userContainer: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleStyle: {
    color: '#000000',
    fontSize: wp('5'),
    fontFamily: FONTS.SFSemiBold,
    textTransform: 'capitalize',
  },
  emailStyle: {
    color: '#707070',
    fontSize: wp('3.1'),
    fontFamily: FONTS.SFMedium,
    marginTop: 3,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#15488F1A',
    marginTop: 6,
    marginBottom: 6,
  },
  userFooter: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  footerHeadingStyle: {
    width: '100%',
    color: '#000000',
    fontSize: wp('3.1'),
    fontFamily: FONTS.SFMedium,
    marginBottom: 10,
  },
  subHeadingStyle: {
    width: '100%',
    color: '#707070',
    opacity: 0.5,
    fontSize: wp('2.6'),
    fontFamily: FONTS.SFRegular,
    marginTop: 6,
  },
});
