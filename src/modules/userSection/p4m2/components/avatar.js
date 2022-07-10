import React, { useState } from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ICONS} from '../../../../constant';
import { launchImageLibrary } from 'react-native-image-picker'
import { showMessage } from '../../../../helpers/replaceDigitsWithAesteriks';

export const Avatar = props => {
  const [avatarLocal, setAvatarLocal] = useState('')
  const {small, notEditable} = props;


  const chooseImage = async () => {
    let options = {
      title: 'Upload Prescription',
      takePhotoButtonTitle: 'Take a Photo',
      chooseFromLibraryButtonTitle: 'Select From Gallery',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      }
    };
    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        showMessage(response.customButton);
      } else {
        // if (Platform.OS !== 'android') {
        //     if (imageObject && imageObject.uri) {
        //         imageObject.uri.replace('file://', '');
        //     }
        // }
        const file = {
          path: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        };

        setAvatarLocal(response.assets[0].uri)
        props.onClick(file)
      }
    });
  };

  return (
    <TouchableOpacity
      disabled={notEditable}
      onPress={chooseImage}
      style={[styles.main, small && styles.small, props.mainContainerStyles]}>
      <Image
        source={avatarLocal == '' ? ICONS.userIcon : { uri: avatarLocal}}
        style={[styles.main, small && styles.small]}
      />
      {!notEditable && (
        <View style={styles.edit}>
          <Icon color="white" name="add-outline" size={15} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 96,
    width: 96,
    borderRadius: 96,
  },
  img: {
    height: 96,
    width: 96,
    borderRadius: 96,
  },
  edit: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: '#2C99C6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -25,
  },
  small: {
    width: 35,
    height: 35,
    borderRadius: 35,
  },
});
