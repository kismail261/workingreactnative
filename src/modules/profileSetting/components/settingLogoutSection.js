import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONTS, ICONS} from '../../../constant';
import {CommonActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setAuthToken, setCurrentUser} from '../../../redux/user/user.action';
import {deleteToken, deleteUser} from '../../../helpers/user.helper';

const SettingLogoutSection = ({items, title, navigation}) => {
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
  const [active, setActive] = useState(true);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logout} style={styles.headerRow}>
        <Text style={styles.headerStyle}>{title}</Text>
      </TouchableOpacity>
      {active ? (
        <View style={{width: wp('90'), alignItems: 'center'}}>
          {items.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{width: wp('90'), alignItems: 'center'}}>
                <View style={styles.divider} />
                <Text style={styles.itemLabelStyle}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

export default SettingLogoutSection;

const styles = StyleSheet.create({
  container: {
    width: wp('90'),
    alignItems: 'center',
  },
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
    width: '100%',
    color: '#707070',
    fontFamily: FONTS.SFMedium,
    fontSize: wp('4.2'),
  },
});
