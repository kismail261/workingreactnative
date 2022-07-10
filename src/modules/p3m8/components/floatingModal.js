import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../constant';

export const FloatingModal = ({
  children,
  visible,
  onClosePress,
  mainContainerStyles,
}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={[styles.modalView1, mainContainerStyles]}>
        <View style={styles.modalView2}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginBottom: 11,
            }}>
            <Icon
              onPress={onClosePress}
              name="close-circle"
              size={16}
              color={COLORS.danger}
            />
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView1: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  modalView2: {
    backgroundColor: 'white',
    width: '90%',
    // height: 300,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#70707026',
  },
});
