import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Text,
} from 'react-native';
import {FONTS, ICONS} from '../../../../constant';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { showMessage } from '../../../../helpers/replaceDigitsWithAesteriks';
import ListShareSuccessModal from '../../../listing/yourListings/ListShareSuccessModal';

export const TrainerProfile = props => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [color, setColor] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const [visible, setVisible] = useState(false);
  const {name, listings, img, onPress} = props;
  const onShare = async () => {
    const options = {
      title: 'Your Trainer',
      message:
        'Check out Your Private trainer on Sporforya , listing link :https://dev.sporforya.com',
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
      alert(error.message);
    }
  };
  const closeModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <TouchableOpacity onPress={() => { showMessage("Coming soon")}} style={styles.main}>
      <Image source={ICONS.listingImage} style={styles.img} />
      <View style={{width: '90%'}}>
        <Text style={[styles.name, {marginBottom: 4}]}>{props.name}</Text>
        <Text style={[styles.field, {marginBottom: 6}]}>
          {props.profession}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 11,
          }}>
          <Icon
            name="location-outline"
            style={{marginRight: 5}}
            color="#0D6B93"
            size={10}
          />
          <Text numberOfLines={1} style={styles.address}>
            {props.address}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}>
          <Text style={styles.amount}>${props.amount}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => onShare()}>
              <Icon
                name="share-social-outline"
                size={15}
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setColor(!color)}>
              <Icon
                name="heart"
                size={15}
                color={color ? '#FF5757' : 'black'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType={'slide'}>
        <ListShareSuccessModal onPressBack={closeModal} />
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    borderRadius: 4,
    minHeight: 269,
    width: 263,
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
  img: {
    width: '100%',
    height: 178,
    marginBottom: 11,
    borderRadius: 4,
  },
  name: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('5.5'),
    color: 'black',
    marginBottom: 5,
  },
  listing: {
    fontFamily: FONTS.SFRegular,
    color: '#595959',
    fontSize: wp('3.5'),
  },
  name: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('5.5'),
    color: 'black',
  },
  field: {
    fontSize: wp('4'),
    color: 'black',
    fontFamily: FONTS.SFMedium,
  },
  address: {
    fontFamily: FONTS.SFRegular, //change to SFLight
    fontSize: wp('3'),
    color: '#1A1A1A',
  },
  loc: {
    width: 6.31,
    height: 9.18,
    marginRight: 5,
  },
  amount: {
    fontFamily: FONTS.SFBold,
    color: 'black',
    fontSize: wp('4'),
  },
  icon: {
    color: '#FF5757',
  },
});
