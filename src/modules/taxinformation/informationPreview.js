import React, { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SuccessCard } from './components/successCard';
import { TaxInfoCard } from './components/taxInfoCard';
import HeaderBL from '../../common/headerBL';
import { useDispatch, useSelector } from 'react-redux';
import { getTaxDetail, setNewTaxFlag } from '../../redux/tax/tax.action';



const InformationPreview = (props) => {
  const dispatch = useDispatch('')
  const loader = useSelector(state => state.loader.loader)
  const token = useSelector(state => state.user.token)
  const newTaxAdd = useSelector(state => state.tax.newTaxAdd)
  const currentUser = useSelector(state => state.user.currentUser)

  useEffect(() => {
    dispatch(getTaxDetail(token, currentUser._id))
    return () => {
    }
  }, [])

  const successClose = () => {
    dispatch(setNewTaxFlag(false))
  }

  return (
    <View style={styles.main}>
      <HeaderBL navigation={props.navigation} label="Tax Information" />
      {newTaxAdd && (
        <View style={{ width: '90%', marginTop: 20, alignSelf: 'center' }}>
          <SuccessCard
            title="Taxpayer information added"
            onPress={successClose}
          />
        </View>
      )}
      {
        loader
          ?
          <ActivityIndicator />
          :
          <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', }} >

            <View style={{ width: '90%', marginTop: 20, alignSelf: 'center' }}>
              <TaxInfoCard navigation={props.navigation} />
            </View>
          </ScrollView>
      }
    </View>
  );
};
export default InformationPreview

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
});
