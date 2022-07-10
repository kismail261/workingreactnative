import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONTS} from '../../../../constant';


export const OptionCard = props => {
  const {name, desc, onPress, icons} = props;
  const renderIcons = ({item}) => {
    return (
      <Image source={item.icon} style={[item.style, styles.marginRight5]} />
    );
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.main}>
      <View style={styles.leftContainer}>
        <View style={styles.left}>
          <FlatList data={icons} horizontal renderItem={renderIcons} />
          <Text style={styles.title}>{name ?? 'Enter Name'}</Text>
          <Text style={styles.sub}>{desc ?? 'Enter some desc'}</Text>
        </View>
      </View>

      <View style={[styles.sideBtn]}>
        <Icon name={'caret-forward-outline'} size={12} color={'#2C99C6'} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 166,
    borderRadius: 7,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  sideBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cae5f2',
    height: '100%',
    width: '15%',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  sideBtnIcon: {
    height: 11.95,
    width: 8.97,
  },
  title: {
    fontFamily: FONTS.SFBold,
    color: 'black',
    fontSize: wp('4.5'),
  },
  sub: {
    fontFamily: FONTS.SFMedium,
    color: '#707070',
    fontSize: wp('3.5'),
  },
  leftContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '83%',
  },
  left: {
    width: '80%',
  },
  marginRight5: {
    marginRight: 5,
  },
});
