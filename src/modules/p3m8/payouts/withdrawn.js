import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import EmptyListMessage from './components/EmptyListMessage';
import {PaymentDetails} from './components/paymentDetails';

export const Withdrawn = () => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.listContainer}>
        {/* <PaymentDetails type="Withdrawn Successfully" /> */}
        <FlatList ListEmptyComponent={EmptyListMessage} />
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
  listContainer: {
    width: '80%',
    marginTop: 32,
  },
});
