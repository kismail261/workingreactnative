import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getfavouriteList} from '../../../redux/favourite/favourite.action';
import {SportsEventCard} from './components/eventCard';

export const FavListings = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const currentUser = useSelector(state => state.user.currentUser);
  const favouriteList = useSelector(state => state.favourite.favouriteList);

  useEffect(() => {
    dispatch(
      getfavouriteList(
        token,
        'listing',
        currentUser != null ? currentUser._id : '',
      ),
    );
    return () => {};
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '90%'}}>
        <View style={{width: '100%', marginTop: 20}}>
          {favouriteList.map((item, index) => (
            <SportsEventCard
              key={index}
              listings={item}
              navigation={props.navigation}
            />
          ))}
          <View style={{height: 20}} />
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
});
