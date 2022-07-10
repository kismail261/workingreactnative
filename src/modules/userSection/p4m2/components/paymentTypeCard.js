import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FONTS} from '../../../../constant';

export const PaymentTypeCard = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.main}>
      <View style={styles.row}>
        <View style={styles.innerRow}>
          <Image style={styles.icon} source={props.icon} />
          <Text style={styles.name}>{props.name ?? 'Card'}</Text>
        </View>
        <View
          style={{
            width: '50%',
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
    height: 60,
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 19,
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginRight: 20
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
    width: '50%',
  },
  name: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 16,
    color: 'black',
  },
});
