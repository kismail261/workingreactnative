import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ListShareSuccessModal from '../ListShareSuccessModal';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { FONTS, ICONS } from '../../../../constant';
import Share from 'react-native-share';
import { showMessage } from '../../../../helpers/replaceDigitsWithAesteriks';

const ActiveBooking = ({ img, data, navigation }) => {

  const { title, listingType, _id } = data;
  const [active, setActive] = useState(true);
  const [visible, setVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const toggleSwitch = () => setActive(previousState => !previousState);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const closeModal = () => {
    setShowSuccessModal(false);
  };
  const onShare = async () => {
    const options = {
      title: 'Sporforya Listing',
      message:
        'Check out this listing on Sporforya , listing link :https://dev.sporforya.com',
    };

    try {
      Share.open(options)
        .then(res => {
          hideMenu();
          setShowSuccessModal(true);
        })
        .catch(err => {
          err && console.log(err);
        });
    } catch (error) {
      showMessage(error.message);
    }
  };

  const onViewClick = () => {
    hideMenu();
    navigation.navigate('ListingDetail', { listId: _id });
  };
  const viewBookings = () => {
    hideMenu();
    navigation.navigate('bookingStack', { listId: data });
  };

  const onEditClick = () => {
    hideMenu();
    if (listingType == 'Service') {
      navigation.navigate('editAddServiceDetail', { listId: _id });
    } else if (listingType == 'Event') {
      navigation.navigate('editEventDetail', { listId: _id });
    } else if (listingType == 'Facility') {
      navigation.navigate('editFacilityDetail', { listId: _id });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Active</Text>
        </View>
        <View>
          <Menu visible={visible} onRequestClose={hideMenu}>
            <MenuItem style={styles.menuItemStyle} onPress={onEditClick}>
              <Image
                source={ICONS.pencilBlue}
                style={styles.imgMenu}
                resizeMode="contain"
              />
              <View style={{ width: 10 }} />
              <Text style={styles.menulabelStyle}>Edit</Text>
            </MenuItem>
            <MenuDivider />
            <MenuItem style={styles.menuItemStyle} onPress={onViewClick}>
              <Image
                source={ICONS.eyeIcon}
                style={styles.imgMenu}
                resizeMode="contain"
              />
              <View style={{ width: 10 }} />
              <Text style={styles.menulabelStyle}>View</Text>
            </MenuItem>
            <MenuDivider />
            <MenuItem style={styles.menuItemStyle} onPress={onShare}>
              <Image
                source={ICONS.shareIcon}
                style={styles.imgMenu}
                resizeMode="contain"
              />
              <View style={{ width: 10 }} />
              <Text style={styles.menulabelStyle}>Share</Text>
            </MenuItem>
            <MenuDivider />
            <MenuItem style={styles.menuItemStyle} onPress={viewBookings}>
              <Image
                source={ICONS.listIconB}
                style={styles.imgMenu}
                resizeMode="contain"
              />
              <View style={{ width: 10 }} />
              <Text style={styles.menulabelStyle}>Bookings</Text>
            </MenuItem>
          </Menu>
        </View>
      </View>

      <View
        style={styles.bookingContainer}>
        <Image source={img} style={styles.imgBooking} />
        <View>
          <Text style={styles.titleStyle}>{title}</Text>
          <Text style={styles.labelStyle}>{listingType}</Text>
        </View>
      </View>
      <View
        style={styles.bookingToggle}>
        <TouchableOpacity onPress={() => showMessage(active ? 'You are currently taking bookings for this activity' : 'You are not taking bookings for this activity')}>
          <Image source={ICONS.infoIcon} style={styles.imgMenu} />
        </TouchableOpacity>
        <Text style={styles.takingStyle}>Taking Bookings</Text>
        <Switch
          trackColor={{ false: '#FF7D7D', true: '#65C51F' }}
          thumbColor={active ? '#FFFFFF' : '#FFFFFF'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={active}
        />
      </View>
      <TouchableOpacity
        style={styles.showMenuContainer}
        onPress={showMenu}>
        <Image
          source={ICONS.moreIconV}
          style={styles.imgShowMenu}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType={'slide'}>
        <ListShareSuccessModal onPressBack={closeModal} />
      </Modal>
    </View>
  );
};

export default ActiveBooking;

const styles = StyleSheet.create({
  container: {
    width: wp('90'),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#15488F26',
    borderRadius: 4,
    marginTop: 15,
    alignItems: 'center',
    elevation: 1,
  },
  headerRow: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelContainer: {
    width: 64,
    height: 18,
    backgroundColor: '#98E263',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  labelText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontFamily: FONTS.SFRegular,
  },
  titleStyle: {
    width: wp('65'),
    color: '#000000',
    fontSize: wp('5'),
    fontFamily: FONTS.SFBold,
    marginLeft: 8,
  },
  labelStyle: {
    width: wp('65'),
    color: '#000000',
    fontSize: wp('3'),
    fontFamily: FONTS.SFRegular,
    marginLeft: 8,
  },
  takingStyle: {
    color: '#000000',
    fontSize: wp('3'),
    fontFamily: FONTS.SFRegular,
    marginLeft: 5,
    marginRight: 5,
  },
  menuItemStyle: {
    alignItems: 'center',
  },
  menulabelStyle: {
    color: '#000000',
    fontSize: wp('2.4'),
    fontFamily: FONTS.SFRegular,
  },
  imgMenu: {
    width: 10,
    height: 10
  },
  bookingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 6,
    marginTop: 2,
  },
  imgBooking: {
    width: 70,
    height: 70,
    borderRadius: 4
  },
  bookingToggle: {
    width: '97%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  imgShowMenu: {
    width: 16,
    height: 16,
    top: 1.5
  },
  showMenuContainer: {
    position: 'absolute',
    top: 10,
    right: 5
  }
});
