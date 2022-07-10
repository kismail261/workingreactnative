import React from 'react';
import {StyleSheet, View, SafeAreaView, Image, Text} from 'react-native';
import {ButtonRegular} from '../../../common/btnRegular';
import {FONTS, ICONS} from '../../../constant';
import {useDispatch} from 'react-redux';
import {setAuthToken, setCurrentUser} from '../../../redux/user/user.action';
import {CommonActions} from '@react-navigation/native';
import {deleteToken, deleteUser} from '../../../helpers/user.helper';

export const CloseSuccess = ({navigation}) => {
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

  return (
    <SafeAreaView style={styles.main}>
      <Image source={ICONS.confirmedIcon} style={styles.img} />
      <View style={[styles.view, {marginTop: 20}]}>
        <Text style={styles.title}>Account Closed!</Text>
      </View>
      <View style={[styles.view, styles.bottom]}>
        <ButtonRegular blue title="Done" onClick={() => logout()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
    justifyContent: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 40,
  },
  img: {
    width: 88,
    height: 88,
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },

  view: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
});
