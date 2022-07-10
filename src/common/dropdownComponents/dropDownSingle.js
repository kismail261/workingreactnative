import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {FONTS} from '../../constant';

export const DropDownSingle = ({name, data, getValue, label}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState(data);
  const [serach, setSearch] = useState('');

  const selectValue = value => {
    getValue(value);
    setIsOpen(false);
    setSearch('');
    setList(data);
  };

  const searchFilter = item => {
    setSearch(item);
    var categories_list = data;
    const filteredCatogries = categories_list
      ? categories_list.filter(filterCatogry => {
          return filterCatogry.name.toLowerCase().includes(item.toLowerCase());
        })
      : [];
    setList(filteredCatogries);
  };

  return (
    <View style={{marginTop: 12}}>
      <Text style={styles.headingStyle}>{label}</Text>
      {isOpen ? (
        <View style={styles.main}>
          <Icon name="search" size={13} />
          <TextInput
            style={{
              width: '93%',
              height: 44,
              color: '#000000',
              fontSize: wp('3.3'),
              fontFamily: FONTS.SFRegular,
            }}
            placeholder="Search"
            placeholderTextColor={'#707070'}
            onChangeText={value => searchFilter(value)}
            value={serach}
          />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.main}
          onPress={() => setIsOpen(!isOpen)}>
          <Text style={styles.btnText}>{name ?? 'Select'}</Text>
          <Icon name="chevron-down-outline" size={12} />
        </TouchableOpacity>
      )}

      {isOpen && (
        <View style={styles.childView}>
          <ScrollView nestedScrollEnabled style={{width: '100%'}}>
            <View style={{height: 6}} />
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              {list.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => selectValue(item.id)}
                    key={index}
                    style={{
                      width: '100%',
                      height: 35,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.btnText}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={{height: 6}} />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: wp('80'),
    height: 46,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#70707026',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  btnText: {
    width: '90%',
    color: '#707070',
    fontFamily: FONTS.SFRegular,
    fontSize: wp('3.5'),
  },
  childView: {
    maxHeight: 180,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 4,
    borderColor: '#70707026',
    backgroundColor: 'white',
  },
  headingStyle: {
    width: wp('80'),
    color: '#000000',
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFBold,
    marginBottom: Platform.OS == 'android' ? 8 : 10,
  },
});
