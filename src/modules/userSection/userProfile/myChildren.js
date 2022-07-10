import React, { useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, } from 'react-native';
import { FONTS } from '../../../constant';
import { useDispatch, useSelector } from 'react-redux';
import { getChildList } from '../../../redux/profile/profile.action';
import { MyChildCard } from './components/MyChildCard';


export const MyChildren = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const currentUser = useSelector(state => state.user.currentUser);
  const childList = useSelector(state => state.profile.childList);

  useEffect(() => {
    dispatch(getChildList(token, currentUser._id));
    return () => {
    }

  }, [])


  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.view}>
        {childList.map((item, index) => {
          return (
            <MyChildCard key={index} detail={item} />
          )
        }
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  img: {
    width: 165.81,
    height: 114.84,
    marginBottom: 32,
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: 32,
    color: 'black',
    textAlign: 'center',
  },
  view: {
    width: '90%',
    marginTop: 20,
  },
});
