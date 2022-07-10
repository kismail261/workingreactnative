import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ButtonRegular } from '../../../../common/btnRegular';
import { FONTS } from '../../../../constant';
import { EnterCardDetailsModal } from '../components/enterCardDetailsModal';
import { EnterCvvModal } from '../components/enterCvvModal';
import { PaymentCard } from '../components/paymentCard';
import Header from '../../../../common/headerBL';
import { showMessage } from '../../../../helpers/replaceDigitsWithAesteriks';

export const SelectCard = (props) => {
  const [cardModal, showCardModal] = useState(false);
  const [addNew, setNew] = useState(false);
  function onNewCard() {
    setNew(true)
   }
  return (
    <View style={styles.main}>
      <Header navigation={props.navigation} label={"Select Card"} />
      <View style={{ width: '90%', marginTop: 26 }}>
        <PaymentCard
          name="American Express Credit Card"
          onPress={() => showCardModal(true)}
        />
        <PaymentCard
          name="Chase Debit Card"
          onPress={() => showCardModal(true)}
        />
      </View>
      <View style={{ marginTop: 44 }}>
        <ButtonRegular
          title="Add New Card"
          buttonStyle={styles.buttonStyle}
          textStyle={styles.textStyle}
          onClick={onNewCard}
        />
      </View>
      <EnterCvvModal
        visible={cardModal}
        onClosePress={() => showCardModal(false)}
        onProceedPress={() => showMessage('Proceed', 'success')}
      />
      <EnterCardDetailsModal 
        visible={addNew} 
        onClosePress={() => setNew(false)}
        onProceedPress={() => props.navigation.navigate("PaymentSuccessful")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    borderColor: '#2C99C6',
    borderWidth: 1,
  },
  textStyle: {
    fontFamily: FONTS.SFMedium,
    fontSize: 16,
    color: '#2C99C6',
  },
});
