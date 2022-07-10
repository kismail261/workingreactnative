import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FONTS} from '../../../../constant';

export const PaymentCard = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.main}>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.name}>
            {props.name ?? 'American Express Credit Card'}
          </Text>

          <View style={[styles.innerRow, {marginTop: 7.3}]}>
            <Icon name={'card-outline'} size={25} style={{marginRight: 18}} />
            <Text style={styles.cardNUmber}>
              {props.cardNumber ?? '5164-45XX-XXXX-7168'}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '30%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <Icon name="chevron-forward-outline" size={20} color="grey" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#15488F26',
    borderWidth: 1,
    height: 76,
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 19,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    //width: '50%',
  },
  name: {
    fontFamily: FONTS.SFRegular,
    fontSize: 15,
    color: 'black',
  },
  cardNUmber: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 15,
    color: 'black',
  },
  col: {
    width: '70%',
  },
});
