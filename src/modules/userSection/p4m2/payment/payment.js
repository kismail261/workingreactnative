import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { PaymentTypeCard } from '../components/paymentTypeCard';
import Header from '../../../../common/headerBL';
import CreditCard from '../../../../assets/images/creditcard.png'
import Apple from '../../../../assets/images/apple.png'
import GooglePay from '../../../../assets/images/googlepay.png'
import MasterCard from  '../../../../assets/images/mastercard.png'
import Visa from  '../../../../assets/images/visa.png'
import Discover from  '../../../../assets/images/discover.png'
import Commerece from  '../../../../assets/images/commerce.png'
import Ae from  '../../../../assets/images/americaexpress.png'
import { showMessage } from '../../../../helpers/replaceDigitsWithAesteriks';

export const Payment = (props) => {
  const apiData = props?.route?.params?.apiData

  return (
    <View style={styles.main}>
      <Header navigation={props.navigation} label="Payments" />
      <View style={{ flex: 1, width: '90%', marginTop: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <View>
          <PaymentTypeCard
            icon={CreditCard}
            name="Cards"
            onPress={() => props.navigation.navigate('CardDetails', { apiData: apiData })}
          />
          <PaymentTypeCard
            icon={Apple}
            name="Apple Pay"
            onPress={() => showMessage("Comming soon in version 2")}
          />
          <PaymentTypeCard
            icon={GooglePay}
            name="Google Pay"
            onPress={() => showMessage("Comming soon in version 2")}
          />
        </View>
        <View>
          <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20, color: 'black'}}>We Accept</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 30}}>
            <Image style={styles.icon} source={Commerece} />
            <Image style={styles.icon} source={Discover} />
            <Image style={styles.icon} source={Ae} />
            <Image style={styles.icon} source={Visa} />
            <Image style={styles.icon} source={MasterCard} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
});
