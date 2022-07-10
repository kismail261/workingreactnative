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

export const EnterCvvModal = props => {
  return (
    <FloatingModal
      visible={props.visible}
      onClosePress={props.onClosePress}
      mainContainerStyles={styles.mainContainerStyles}
      innerContainerStyles={styles.innerContainerStyles}>
      <View style={{width: '90%', alignItems: 'center', alignSelf: 'center'}}>
        <Text style={styles.title}>Enter CVV</Text>
        <View style={{width: '90%', marginTop: 18}}>
          <PaymentCard name="Chase Debit Card" onPress={() => {}} />
        </View>
        <View style={{width: '90%', marginTop: 18}}>
          <Text style={[styles.head, {marginBottom: 5}]}>CVV</Text>
          <TextInput style={styles.ti} onChangeText={props.onChangeText} />
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
    minHeight: 342,
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
});
