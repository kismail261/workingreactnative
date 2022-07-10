import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FloatingModal} from '../../p3m8/components/floatingModal';
import Icon from 'react-native-vector-icons/Ionicons';
import {FONTS, ICONS} from '../../../constant';
import {ButtonRegular} from '../../../common/btnRegular';

export const RedeemSuccess = props => {
  return (
    <FloatingModal
      visible={props.visible}
      hideCloseIcon
      mainContainerStyles={styles.mainContainerStyles}
      innerContainerStyles={styles.innerContainerStyles}>
      <SafeAreaView
        style={{
          width: '90%',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity onPress={props.onClosePress} style={styles.circle}>
          <Icon name="close-outline" size={28} color="green" />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={{width: '100%', marginTop: '30%', alignItems: 'center'}}>
        <Image style={styles.img} source={ICONS.reward} />
      </View>
      <View style={{width: '100%', marginTop: 16, alignItems: 'center'}}>
        <Text style={styles.title}>Points Redeemed!</Text>
      </View>
      <View style={{width: '90%', marginTop: 16, alignItems: 'center'}}>
        <Text style={styles.subtitle}>
          $5 has been added to your Sporforya Wallet. Book your next activity
          now!
        </Text>
      </View>
      <View style={styles.bottom}>
        <ButtonRegular blue title="OK" />
      </View>
    </FloatingModal>
  );
};

const styles = StyleSheet.create({
  innerContainerStyles: {
    height: '100%',
    width: '100%',
    bottom: 0,
    alignItems: 'center',
    backgroundColor: 'black',
    backfaceVisibility: 'visible',
    opacity: 0.9,
  },
  mainContainerStyles: {
    marginBottom: 0,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    borderRadius: 35,
    backgroundColor: 'white',
  },
  img: {
    width: 178.89,
    height: 159.93,
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: 30,
    color: 'white',
  },
  subtitle: {
    fontFamily: FONTS.SFRegular,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  bottom: {
    position: 'absolute',
    width: '80%',
    bottom: 30,
  },
});
