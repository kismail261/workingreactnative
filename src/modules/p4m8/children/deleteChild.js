import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ButtonRegular} from '../../../common/btnRegular';
import {FONTS, ICONS} from '../../../constant';
import {FloatingModal} from '../../p3m8/components/floatingModal';

export const DeleteChildModal = props => {
  return (
    <FloatingModal
      visible={props.visible}
      onClosePress={props.onClosePress}
      innerContainerStyles={{width: '80%'}}
      style={styles.main}>
      <View style={{width: '90%', alignSelf: 'center', alignItems: 'center'}}>
        <Text style={[styles.title]}>Delete Child</Text>
        <Text style={[styles.desc, {marginTop: 10}]}>
          Are you sure you want to delete Clyde Doe from the list of your
          children?
        </Text>

        <View style={{ marginVertical: 10}}>
          <ButtonRegular blue title="Yes" />
        </View>
        <View style={{ marginBottom: 10}}>
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
