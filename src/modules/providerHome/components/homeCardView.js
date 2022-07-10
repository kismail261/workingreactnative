import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Image} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {FONTS} from '../../../constant';


export const HomeCardView = props => {
  const renderIcons = item => {
    return (
      <Image
        source={item.item.icon}
        style={[item.item.style, {marginRight: 10}]}
      />
    );
  };
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.main}>
      <View style={styles.contentCont}>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            height: 40,
            marginTop: 20,
          }}>
          <FlatList
            horizontal
            scrollEnabled={false}
            renderItem={renderIcons}
            data={props.iconsArray}
            //style={{borderWidth: 1}}
          />
        </View>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Text style={styles.desc}>{props.desc}</Text>
        </View>
      </View>
      <View style={styles.arrowCont}>
        <Icon name="caret-forward-outline" color="#2C99C6" size={11} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 166,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#70707026',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 15,
  },
  arrowCont: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cae5f1',
    //opacity: 0.25,
    height: '100%',
  },
  contentCont: {
    backgroundColor: '#FFFFFF',
    width: '85%',
    height: '100%',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('4'),
    color: 'black',
  },
  desc: {
    fontFamily: FONTS.SFMedium,
    fontSize: wp('3.2'),
    color: '#707070',
  },
});
