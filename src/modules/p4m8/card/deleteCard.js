import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ButtonRegular} from '../../../common/btnRegular';
import {FONTS} from '../../../constant';
import {FloatingModal} from '../../p3m8/components/floatingModal';

export const DeleteCardModal = props => {
  return (
    <FloatingModal
      visible={props.visible}
      onClosePress={props.onClosePress}
      innerContainerStyles={{width: '80%'}}
      style={styles.main}>
      <View style={{width: '90%', alignSelf: 'center', alignItems: 'center'}}>
        <Text style={[styles.title]}>Delete Card</Text>
        <Text style={[styles.desc, {marginTop: 10}]}>
          Are you sure you want to delete this card from the list of payment
          method?
        </Text>

        <View style={{width: '90%', marginVertical: 10}}>
          <ButtonRegular blue title="Yes, delete it" />
        </View>
        <View style={{width: '90%', marginBottom: 10}}>
          <ButtonRegular transparent title="Cancel" />
        </View>
      </View>
    </FloatingModal>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },

  title: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 21,
    color: 'black',
    textAlign: 'center',
  },
  desc: {
    fontSize: 15,
    fontFamily: FONTS.SFRegular,
    color: '#3D3D3D',
    textAlign: 'center',
  },
});
