import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ProviderCard } from './components/providerCard';
import { useDispatch, useSelector } from 'react-redux';
import { getfavouriteList } from '../../../redux/favourite/favourite.action';

export const FavProviders = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token)
  const currentUser = useSelector(state => state.user.currentUser)
  const favouriteProviderList = useSelector(state => state.favourite.favouriteProviderList)

  useEffect(() => {
    dispatch(getfavouriteList(token, "provider", currentUser != null ? currentUser._id : ''))
    return () => {
    }
  }, [])

  return (
    <SafeAreaView style={styles.main}>
      <View style={{ width: '90%', marginTop: 20 }}>
        {
          favouriteProviderList.map((item, index) => (
            <ProviderCard key={index} />
          ))
        }
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
});
