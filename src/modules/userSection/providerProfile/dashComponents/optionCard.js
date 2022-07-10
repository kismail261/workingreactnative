import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {FONTS, ICONS} from '../../../../constant';
import Icon from 'react-native-vector-icons/Ionicons';

export const OptionCard = props => {
  const {name, desc, onPress, icons} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.main}>
      <View style={[{width: '83%'}, styles.left]}>
        <View style={{width: '80%'}}>
          <FlatList
            data={icons}
            horizontal
            renderItem={({item, index}) => (
              <Image
                source={item.source}
                style={{height: item.size, width: item.size, marginRight: 5}}
              />
            )}
          />
          <Text style={styles.title}>{name ?? 'Enter Name'}</Text>
          <Text style={styles.sub}>{desc ?? 'Enter some desc'}</Text>
        </View>
      </View>

      <View style={[styles.sideBtn, {width: '15%'}]}>
        <Icon name={'caret-forward-outline'} size={12} color={'#2C99C6'} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 166,
    borderRadius: 4,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  sideBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cae5f2',
    //opacity: 0.25,
    height: '100%',
  },
  sideBtnIcon: {
    height: 11.95,
    width: 8.97,
  },
  title: {
    fontFamily: FONTS.SFBold,
    color: 'black',
    fontSize: 18,
  },
  sub: {
    fontFamily: FONTS.SFMedium,
    color: '#707070',
    fontSize: 14,
  },
  left: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
