import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {ButtonRegular} from '../../../../common/btnRegular';
import {FONTS} from '../../../../constant';
import {FloatingModal} from '../../../p3m8/components/floatingModal';
import {PaymentCard} from './paymentCard';

// interface Props{
//     onChangeText?(val:any):void
//     onProceedPress?():void
//     onClosePress?():void
//      visible?:boolean
// }

export const EnterCardDetailsModal = props => {
  return (
    <FloatingModal
      visible={props.visible}
      onClosePress={props.onClosePress}
      mainContainerStyles={styles.mainContainerStyles}
      innerContainerStyles={styles.innerContainerStyles}>
      <View style={{width: '90%', alignItems: 'center', alignSelf: 'center'}}>
        <Text style={styles.title}>Enter Card Details</Text>

        <View style={{width: '90%', marginTop: 18}}>
          <Text style={[styles.head, {marginBottom: 5}]}>Card Number</Text>
          <TextInput
            placeholder="XXXX-XXXX-XXXX-XXXX"
            placeholderTextColor="#707070"
            style={styles.ti}
            onChangeText={props.onChangeCardNumber}
          />
        </View>
        <View style={styles.row}>
          <View style={{width: '45%', marginTop: 18}}>
            <Text style={[styles.head, {marginBottom: 5}]}>Expiry</Text>
            <TextInput
              placeholder="MM/YY"
              placeholderTextColor="#707070"
              style={styles.ti}
              onChangeText={props.onChangeExpiry}
            />
          </View>
          <View style={{width: '45%', marginTop: 18}}>
            <Text style={[styles.head, {marginBottom: 5}]}>CVV</Text>
            <TextInput
              placeholder="Enter CVV"
              placeholderTextColor="#707070"
              style={styles.ti}
              onChangeText={props.onChangeCvv}
            />
          </View>
        </View>
        <View style={{width: '90%', marginTop: 18}}>
          <Text style={[styles.head, {marginBottom: 5}]}>Name on Card</Text>
          <TextInput
            placeholder="Enter the name as on card"
            placeholderTextColor="#707070"
            style={styles.ti}
            onChangeText={props.onChangeName}
          />
        </View>
        <View style={{ marginTop: 18}}>
          <ButtonRegular blue title="Proceed" onClick={props.onProceedPress} />
        </View>
      </View>
    </FloatingModal>
  );
};

const styles = StyleSheet.create({
  mainContainerStyles: {
    justifyContent: 'flex-end',
    marginBottom: 0,
  },
  innerContainerStyles: {
    minHeight: 502,
    width: '100%',
    //alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 16,
    color: 'black',
  },
  head: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 14,
    color: 'black',
  },
  ti: {
    height: 46,
    borderWidth: 1,
    borderColor: '#70707026',
    backgroundColor: 'white',
    borderRadius: 4,
    width: '100%',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
});
