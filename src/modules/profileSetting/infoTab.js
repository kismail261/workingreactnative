import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {ICONS} from '../../constant';
import InfoItem from './components/infoItem';
import InfoItemEmergency from './components/infoItemEmergency';

const infoTab = () => {
  const userDetail = useSelector(state => state.user.userDetail);
  const currentUser = useSelector(state => state.user.currentUser);
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#F8FAFF'}}>
      {userDetail != null && userDetail.isOrganization ? (
        <View style={styles.container}>
          <InfoItem
            img={ICONS.genderIcon}
            label="Gender"
            value={userDetail.gender != undefined ? userDetail.gender : 'n/a'}
          />
          <InfoItem
            img={ICONS.calendarIcon}
            label="Date of Birth"
            value={userDetail.dob != undefined ? userDetail.dob : 'n/a'}
          />
          <InfoItem
            img={ICONS.mailIcon}
            label="Email"
            value={currentUser.email}
          />
          <InfoItem
            img={ICONS.phoneIcon}
            label="Phone Number"
            value={
              userDetail.organizationInfo.phone != undefined
                ? userDetail.organizationInfo.phone
                : 'n/a'
            }
          />
          {userDetail.organizationInfo.location != undefined &&
            userDetail.organizationInfo.location.map((item, index) => {
              return (
                <InfoItem
                  key={index}
                  img={ICONS.address}
                  label="Address"
                  value={item.description}
                />
              );
            })}
          <View style={{height: 12}} />
        </View>
      ) : (
        <View style={styles.container}>
          <InfoItem
            img={ICONS.genderIcon}
            label="Gender"
            value={userDetail.gender != undefined ? userDetail.gender : 'n/a'}
          />
          <InfoItem
            img={ICONS.calendarIcon}
            label="Date of Birth"
            value={userDetail.dob != undefined ? userDetail.dob : 'n/a'}
          />
          <InfoItem
            img={ICONS.mailIcon}
            label="Email"
            value={userDetail.email}
          />
          <InfoItem
            img={ICONS.phoneIcon}
            label="Phone Number"
            value={userDetail.phone != undefined ? userDetail.phone : 'n/a'}
          />
          <InfoItem
            img={ICONS.address}
            label="Address"
            value={
              userDetail.providerInfo.locationInfo != undefined
                ? [
                    userDetail.providerInfo.locationInfo.address,
                    ', ',
                    userDetail.providerInfo.locationInfo.state,
                    ', ',
                    userDetail.providerInfo.locationInfo.countary,
                  ]
                : 'n/a'
            }
          />
          {/* <InfoItemEmergency
            img={ICONS.alertIcon}
            label="Emergency Contact"
            value="3806 Sharon Lane, California"
          /> */}
          <View style={{height: 12}} />
        </View>
      )}
    </ScrollView>
  );
};

export default infoTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    // alignItems: 'center',
    marginLeft: 25,
    // backgroundColor: 'yellow',
  },
});
