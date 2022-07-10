import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {FONTS} from '../../../../constant';
import {
  setFilterData,
  setFilterParams,
} from '../../../../redux/user/user.action';

export const FiltersDisplay = props => {
  const dispatch = useDispatch();
  const filterData = useSelector(state => state.user.filterData);
  const filterParams = useSelector(state => state.user.filterParams);

  useEffect(() => {
    return () => {};
  }, []);

  const setAgeValue = () => {
    let tempFilters = filterData;
    tempFilters['age'] = {
      from: '',
      to: '',
    };
    let localTemp = filterParams.filter(item => item != 'age');
    dispatch(setFilterParams(localTemp));
    dispatch(setFilterData(tempFilters));
  };

  const setPriceValue = () => {
    let tempFilters = filterData;
    tempFilters['price'] = {
      start: '',
      end: '',
    };
    let localTemp = filterParams.filter(item => item != 'price');
    dispatch(setFilterParams(localTemp));
    dispatch(setFilterData(tempFilters));
  };

  const removeFilter = value => {
    let tempFilters = filterData;
    tempFilters[value] = '';
    console.log(tempFilters);
    let localTemp = filterParams.filter(item => item != value);
    dispatch(setFilterParams(localTemp));
    dispatch(setFilterData(tempFilters));
  };

  return (
    <View
      style={{
        width: '90%',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 14,
        flexWrap: 'wrap',
      }}>
      {filterParams.map((item, index) => {
        return (
          <View key={index}>
            {item != 'price' && item != 'age' && filterData[item] != '' ? (
              <TouchableOpacity
                onPress={() => removeFilter(item)}
                style={styles.filter}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: FONTS.SFRegular,
                    fontSize: wp('3.3'),
                    color: 'white',
                    marginRight: 10,
                  }}>
                  {filterData[item]}
                </Text>
                <Icon name={'close-circle'} color="#FF7D7D" size={16} />
              </TouchableOpacity>
            ) : null}
            {item == 'age' &&
            filterData.age.from != '' &&
            filterData.age.to != '' ? (
              <TouchableOpacity onPress={setAgeValue} style={styles.filter}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: FONTS.SFRegular,
                    fontSize: wp('3.3'),
                    color: 'white',
                    marginRight: 10,
                  }}>
                  Age: {filterData.age.from}-{filterData.age.to}
                </Text>
                <Icon name={'close-circle'} color="#FF7D7D" size={16} />
              </TouchableOpacity>
            ) : null}

            {item == 'price' ? (
              <TouchableOpacity onPress={setPriceValue} style={styles.filter}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: FONTS.SFRegular,
                    fontSize: wp('3.3'),
                    color: 'white',
                    marginRight: 10,
                  }}>
                  ${filterData.price.start} - ${filterData.price.end}
                </Text>
                <Icon name={'close-circle'} color="#FF7D7D" size={16} />
              </TouchableOpacity>
            ) : null}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: wp('28'),
    height: 30,
    backgroundColor: '#61B2D4',
    borderRadius: 4,
    padding: 5,
    margin: 2.5,
  },
});
