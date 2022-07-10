import React from 'react';
import { SafeAreaView, StyleSheet, Text, View ,FlatList} from 'react-native';
import EmptyListMessage from './components/EmptyListMessage';
import { PaymentDetails } from './components/paymentDetails';

export const Pending = () => {
  
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.listContainer}>
        {/* <PaymentDetails type="Funds Pending Clearance" /> */}
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
