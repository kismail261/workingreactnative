import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONTS, ICONS} from '../../../constant';

const header = ({navigation, onPressSubmit}) => {
  const [showSearch, setShowSearch] = React.useState(false);
  const [searchedValue, setSearchedValue] = React.useState('');
  const inputRef = React.useRef(null);
  const clearChat = () => {
    setShowSearch(false);
    setSearchedValue('');
  };
  const submitHandler = text => {
    onPressSubmit(text);
    // setSearchedValue('');
  };
  const showSearchHandler = () => {
    setShowSearch(true);
    setTimeout(() => {
      inputRef?.current.focus();
    }, 2);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={ICONS.backArrow}
          style={styles.backBtnIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {!showSearch ? (
        <>
          <Text style={styles.titleStyle}>Chat</Text>
          <TouchableOpacity onPress={showSearchHandler}>
            <Image
              source={ICONS.searchBlack}
              style={styles.searchBtnIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.searchBarWrapper}>
          <TextInput
            ref={inputRef}
            defaultValue={searchedValue}
            style={styles.inputFieldStyle}
            // onChangeText={text => setSearchedValue(text)}
            onChangeText={text => submitHandler(text)}
            //  onSubmitEditing={submitHandler}
            placeholder="Search"
          />
          <TouchableOpacity style={styles.mR10} onPress={clearChat}>
            <Image
              source={ICONS.crossRed}
              style={{height: 14, width: 14, alignSelf: 'center', marginTop: 3}}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default header;

const styles = StyleSheet.create({
  mR10: {
    marginRight: 10,
    height: 20,
  },
  inputFieldStyle: {width: '75%', paddingLeft: 15},
  searchBarWrapper: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 50,
    height: 41,
    marginRight: wp('7.5%'),
  },
  container: {
    width: wp('100'),
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#15488F1A',
    borderBottomWidth: 1,
    marginBottom: 1,
    marginTop: Platform.OS == 'android' ? 0 : 30,
  },
  backBtnIcon: {
    width: wp('3.5'),
    height: wp('6'),
    marginLeft: wp('7.5%'),
  },
  searchBtnIcon: {
    width: wp('5'),
    height: wp('5'),
    marginRight: wp('7.5%'),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    color: '#000000',
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('5'),
    marginLeft: 8,
  },
});
