import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {FONTS, ICONS, ImageUrl} from '../../../constant';

const msgItem = ({navigation, data}) => {
  const {_id} = useSelector(state => state.user.currentUser);
  const {message, createdAt, receiverId, senderId, sender, receiver, count} =
    data;
  let recieverId = senderId == _id ? receiverId : senderId;
  let recieverDetail = senderId == _id ? receiver : sender;
  useEffect(() => {
    console.log('msgItem: ', data);
    return () => {};
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('chatHistory', {
          recieverId: recieverId,
          recieverDetail: recieverDetail,
        })
      }
      style={styles.container}>
      <View style={{width: wp('5')}} />
      {recieverDetail != null && recieverDetail.isOrganization ? (
        <Image
          source={
            recieverDetail.organizationInfo.avatar != undefined
              ? {uri: ImageUrl + recieverDetail.organizationInfo.avatar}
              : ICONS.userIcon
          }
          style={{width: wp('12'), height: wp('12'), borderRadius: wp('6')}}
        />
      ) : (
        <Image
          source={
            recieverDetail.providerInfo.avatar != undefined
              ? {uri: ImageUrl + recieverDetail.providerInfo.avatar}
              : ICONS.userIcon
          }
          style={{width: wp('12'), height: wp('12'), borderRadius: wp('6')}}
        />
      )}
      <View style={{width: 10}} />
      <View style={{width: wp('73')}}>
        <View
          style={{
            width: wp('73'),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text numberOfLines={1} style={styles.nameStyle}>
            {recieverDetail.firstName} {recieverDetail.lastName}
          </Text>
          <Text style={styles.timeStyle}>
            {moment(createdAt).format('hh:mm A')}
          </Text>
        </View>
        <View
          style={{
            width: wp('73'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 3,
            alignItems: 'center',
          }}>
          <Text style={styles.msgStyle}>{message}</Text>

          {count == 0 ? (
            <Image
              source={ICONS.doneBlue}
              style={{width: 10, height: 10}}
              resizeMode={'contain'}
            />
          ) : (
            <View
              style={{
                backgroundColor: '#67C621',
                paddingTop: 3,
                paddingBottom: 3,
                paddingLeft: 7,
                paddingRight: 7,
                // height: 16,
                // width: 16,
                borderRadius: 50,
              }}>
              <Text
                style={{color: '#FFFFFF', textAlign: 'center', fontSize: 10}}>
                {count}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default msgItem;

const styles = StyleSheet.create({
  container: {
    width: wp('100'),
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    elevation: 3,
  },
  msgIndicator: {
    width: 11,
    height: 11,
    backgroundColor: '#FF7D7D',
    borderRadius: 6,
    position: 'absolute',
    top: -1,
    left: -1,
  },
  nameStyle: {
    width: '80%',
    color: '#000000',
    fontSize: wp('4.2'),
    fontFamily: FONTS.SFMedium,
  },
  timeStyle: {
    color: '#9A9A9A',
    fontSize: wp('2.5'),
    fontFamily: FONTS.SFRegular,
  },
  msgStyle: {
    width: '80%',
    color: '#B2B2B2',
    fontSize: wp('3'),
    fontFamily: FONTS.SFRegular,
  },
  msgCount: {
    width: 16,
    height: 16,
    backgroundColor: '#67C621',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: '#FFFFFF',
    fontSize: wp('2'),
    fontFamily: FONTS.SFMedium,
  },
});
