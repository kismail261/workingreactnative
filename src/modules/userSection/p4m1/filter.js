import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {COLORS, FONTS} from '../../../constant';
import Icon from 'react-native-vector-icons/Ionicons';
import {DropDownSingle} from './components/dropDownSingle';
import {CustomRangeSlider} from './components/rangeSlider';
import {ButtonRegular} from '../../../common/buttonRegular';
import {amenities, facilities, goodFor, sort} from './data/filtersData';
import {sport} from '../../../constant/data/listingData';
import {ServiceType} from '../../listing/components/data/serviceType';
import CustomDatePicker from './components/customDatePicker';
import NativeTimePicker from '../../../common/dropdownComponents/nativeTimePicker';
import NativePicker from '../../../common/dropdownComponents/nativePicker';
import moment from 'moment';
import {timeData} from '../../listing/components/data/timeData';
import {AbilityLevelData} from '../../listing/components/data/abilityLevel';
import {SuitabelForData} from '../../listing/components/data/suitableFor';
import {useSelector} from 'react-redux';
import {setFilterData, setFilterParams} from '../../../redux/user/user.action';
import {useDispatch} from 'react-redux';

const genderData = ['Male', 'Female'];

let tempLocal = [];

export const SportsFilter = props => {
  const dispatch = useDispatch();
  const filterData = useSelector(state => state.user.filterData);
  const filterParams = useSelector(state => state.user.filterParams);
  tempLocal = filterParams;
  const [loader, setLoader] = useState(false);
  const [sortBy, setSortBy] = useState(
    filterData.sort == '' ? 'Select' : filterData.sort,
  );
  const [selectSport, setSelectSport] = useState(
    filterData.sport == '' ? 'Select' : filterData.sport,
  );
  const [serviceType, setServiceType] = useState(
    filterData.type == '' ? 'Select' : filterData.type,
  );
  const [priceLow, setPriceLow] = useState(
    filterData.price.start == '' ? 0 : filterData.price.start,
  );
  const [priceHigh, setPriceHigh] = useState(
    filterData.price.end == '' ? 1000 : filterData.price.end,
  );
  const [ageLow, setAgeLow] = useState(
    filterData.age.from == '' ? 10 : filterData.age.from,
  );
  const [ageHigh, setAgeHigh] = useState(
    filterData.age.to == '' ? 67 : filterData.age.to,
  );
  const [startDate, setStartDate] = useState(
    filterData.duration.start == ''
      ? new Date()
      : new Date(filterData.duration.start),
  );
  const [endDate, setEndDate] = useState(
    filterData.duration.end == ''
      ? new Date()
      : new Date(filterData.duration.end),
  );
  const [startTime, setStartTime] = useState('1899-12-30T00:00:00');
  const [endTime, setEndTime] = useState('1899-12-30T00:00:00');
  const [gender, setGender] = useState(
    filterData.gender == '' ? '' : filterData.gender,
  );
  const [genderPlaceholder, setGenderPlaceholder] = useState(
    filterData.gender == '' ? 'Gender' : filterData.gender,
  );
  const [selectSuitable, setSuitable] = useState(
    filterData.suitable == '' ? 'Select' : filterData.suitable,
  );
  const [selectAbilityLevel, setAbilityLevel] = useState(
    filterData.abilityLevel == '' ? 'Select' : filterData.abilityLevel,
  );
  const [selectGoodFor, setGoodFor] = useState(
    filterData.goodfor == '' ? 'Select' : filterData.goodfor,
  );
  const [facility, setFacilities] = useState(
    filterData.facilites == '' ? 'Select Facilities' : filterData.facilites,
  );
  const [amenty, setAmenties] = useState(
    filterData.amenities == '' ? 'Select Amenities' : filterData.amenities,
  );

  useEffect(() => {
    console.log(filterData);
    updateStates();
    return () => {};
  }, [filterData]);

  const updateStates = () => {
    setSortBy(filterData.sort == '' ? 'Select' : filterData.sort);
    setSelectSport(filterData.sport == '' ? 'Select' : filterData.sport);
    setServiceType(filterData.type == '' ? 'Select' : filterData.type);
    setPriceLow(filterData.price.start == '' ? 0 : filterData.price.start);
    setPriceHigh(filterData.price.end == '' ? 1000 : filterData.price.end);
    setAgeLow(filterData.age.from == '' ? 10 : filterData.age.from);
    setAgeHigh(filterData.age.to == '' ? 67 : filterData.age.to);
    setStartDate(
      filterData.duration.start == ''
        ? new Date()
        : new Date(filterData.duration.start),
    );
    setEndDate(
      filterData.duration.end == ''
        ? new Date()
        : new Date(filterData.duration.end),
    );
    setStartTime('1899-12-30T00:00:00');
    setEndTime('1899-12-30T00:00:00');
    setGender(filterData.gender == '' ? '' : filterData.gender);
    setGenderPlaceholder(
      filterData.gender == '' ? 'Gender' : filterData.gender,
    );
    setSuitable(filterData.suitable == '' ? 'Select' : filterData.suitable);
    setAbilityLevel(
      filterData.abilityLevel == '' ? 'Select' : filterData.abilityLevel,
    );
    setGoodFor(filterData.goodfor == '' ? 'Select' : filterData.goodfor);
    setFacilities(
      filterData.facilites == '' ? 'Select Facilities' : filterData.facilites,
    );
    setAmenties(
      filterData.amenities == '' ? 'Select Amenities' : filterData.amenities,
    );
  };

  const getSortBy = value => {
    setSortBy(value);
    tempLocal.push('sort');
  };
  const getSportSelect = selectedItems => {
    setSelectSport(selectedItems);
    tempLocal.push('sport');
  };
  const getServiceType = selectedItems => {
    setServiceType(selectedItems);
    tempLocal.push('type');
  };

  const getPriceRange = (low, high) => {
    setPriceLow(low);
    setPriceHigh(high);
    if (tempLocal.includes('price')) {
    } else {
      tempLocal.push('price');
    }
  };
  const getStartDate = value => {
    setStartDate(value);
  };

  const getEndDate = value => {
    setEndDate(value);
  };

  const getStartTime = value => {
    setStartTime(value);
  };

  const getEndTime = value => {
    setEndTime(value);
  };
  const getGender = value => {
    setGender(value);
    setGenderPlaceholder(value);
    tempLocal.push('gender');
  };

  const getAgeRange = (low, high) => {
    setAgeLow(low);
    setAgeHigh(high);
    if (tempLocal.includes('age')) {
    } else {
      tempLocal.push('age');
    }
  };

  const getGoodFor = selectedItems => {
    setGoodFor(selectedItems);
    tempLocal.push('goodfor');
  };
  const getSuitable = selectedItems => {
    setSuitable(selectedItems);
    tempLocal.push('suitable');
  };
  const getAbility = selectedItems => {
    setAbilityLevel(selectedItems);
    tempLocal.push('abilityLevel');
  };

  const getFacilities = selectedItems => {
    setFacilities(selectedItems);
    tempLocal.push('facilites');
  };

  const getAmenties = selectedItems => {
    setAmenties(selectedItems);
    tempLocal.push('amenities');
  };
  const onApply = () => {
    setLoader(true);
    var uniqueNames = getUnique(tempLocal);
    dispatch(setFilterParams(uniqueNames));
    dispatch(
      setFilterData(
        (filterData.filterData = {
          sort: sortBy == 'Select' ? '' : sortBy,
          recommended: false,
          price: {
            start: priceLow,
            end: priceHigh,
          },
          age:
            ageLow == 10 && ageHigh == 65
              ? {
                  from: '',
                  to: '',
                }
              : {
                  from: ageLow,
                  to: ageHigh,
                },
          duration: {
            start: startDate,
            end: endDate,
          },
          gender: gender,
          abilityLevel:
            selectAbilityLevel == 'Select' ? '' : selectAbilityLevel,
          goodfor: selectGoodFor == 'Select' ? '' : selectGoodFor,
          suitable: selectSuitable == 'Select' ? '' : selectSuitable,
          facilites: facility == 'Select Facilities' ? '' : facility,
          amenities: amenty == 'Select Amenities' ? '' : amenty,
          sport: selectSport == 'Select' ? '' : selectSport,
          type: serviceType == 'Select' ? '' : serviceType,
        }),
      ),
    );
    setTimeout(() => {
      setLoader(false);
      props.navigation.goBack();
    }, 500);
  };
  const getUnique = array => {
    var uniqueArray = [];
    for (var value of array) {
      if (uniqueArray.indexOf(value) === -1) {
        uniqueArray.push(value);
      }
    }
    return uniqueArray;
  };

  const onReset = () => {
    setLoader(true);
    dispatch(setFilterParams([]));
    dispatch(
      setFilterData(
        (filterData.filterData = {
          sort: '',
          recommended: false,
          price: {
            start: '',
            end: '',
          },
          age: {
            from: '',
            to: '',
          },
          duration: {
            start: '',
            end: '',
          },
          gender: '',
          abilityLevel: '',
          goodfor: '',
          suitable: '',
          facilites: '',
          amenities: '',
          sport: '',
          type: '',
        }),
      ),
    );
    setTimeout(() => {
      setLoader(false);
    }, 500);
  };

  function onClosePress() {
    props.navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.main}>
      {loader ? (
        <ActivityIndicator color={COLORS.secondary} size={'small'} />
      ) : (
        <ScrollView style={{width: '100%'}}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Text style={styles.title}>Filter & Sort</Text>
              <Icon
                onPress={onClosePress}
                name="close-outline"
                size={30}
                color="black"
              />
            </View>
            <View style={styles.cont}>
              <DropDownSingle
                // name={sortBy}
                name={sortBy}
                data={sort}
                getValue={getSortBy.bind(this)}
                label="Sort By"
              />
            </View>
            <View style={styles.cont}>
              <DropDownSingle
                // name={selectSport}
                name={selectSport}
                data={sport}
                getValue={getSportSelect.bind(this)}
                label="Sports Activity"
              />
            </View>

            <View style={styles.cont}>
              <DropDownSingle
                name={serviceType}
                data={ServiceType}
                getValue={getServiceType.bind(this)}
                label="Type of Sports Activity"
              />
            </View>
            {/* <View style={{ height: 10 }} />
          <View style={styles.cont}>
            <Text style={[styles.fieldName, { marginBottom: 10 }]}>Location</Text>
            <Dropdown>
              <View style={{ width: '90%', marginTop: 10 }}>
                <Text>HI</Text>
              </View>
            </Dropdown>
          </View> */}
            <View style={{height: 10}} />
            <View style={[styles.cont, {width: '89.5%'}]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.fieldName, {marginBottom: 10}]}>
                  Price
                </Text>
                <Text style={[styles.smallTxt, {marginBottom: 10}]}>
                  ${priceLow} - ${priceHigh}
                </Text>
              </View>
              <CustomRangeSlider
                getValue={getPriceRange.bind(this)}
                min={0}
                max={1000}
                low={priceLow}
                high={priceHigh}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.smallTxt, {marginTop: 10}]}>$0</Text>
                <Text style={[styles.smallTxt, {marginTop: 10}]}>$1k</Text>
              </View>
            </View>
            <View style={{height: 10}} />
            <View style={styles.cont}>
              <Text style={[styles.fieldName, {marginBottom: 10}]}>
                Start date
              </Text>
              <CustomDatePicker
                value={startDate}
                getValue={getStartDate.bind(this)}
              />
            </View>
            <View style={{height: 10}} />
            <View style={styles.cont}>
              <Text style={[styles.fieldName, {marginBottom: 10}]}>
                End date
              </Text>
              <CustomDatePicker
                value={endDate}
                getValue={getEndDate.bind(this)}
              />
            </View>
            <View style={styles.row}>
              <View style={{width: '45%'}}>
                <Text style={[styles.fieldName, {marginBottom: 10}]}>
                  Start Time
                </Text>
                <NativeTimePicker
                  placeHolder={moment(startTime).format('hh:mm A')}
                  data={timeData}
                  value={startTime}
                  getValue={getStartTime.bind(this)}
                  size={'38'}
                />
              </View>
              <View style={{width: '45%'}}>
                <Text style={[styles.fieldName, {marginBottom: 10}]}>
                  End Time
                </Text>
                <NativeTimePicker
                  placeHolder={moment(endTime).format('hh:mm A')}
                  data={timeData}
                  value={endTime}
                  getValue={getEndTime.bind(this)}
                  size={'38'}
                />
              </View>
            </View>
            <View style={{height: 10}} />
            <View style={styles.cont}>
              <Text style={[styles.fieldName, {marginBottom: 10}]}>Gender</Text>
              <NativePicker
                textLeft
                placeHolder={genderPlaceholder}
                data={genderData}
                value={gender}
                getValue={getGender.bind(this)}
                size={'90'}
              />
            </View>
            <View style={{height: 10}} />
            <View style={styles.cont}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.fieldName, {marginBottom: 10}]}>
                  Age Range
                </Text>
                <Text style={[styles.smallTxt, {marginBottom: 10}]}>
                  {ageLow} - {ageHigh} yrs
                </Text>
              </View>
              <CustomRangeSlider
                getValue={getAgeRange.bind(this)}
                min={10}
                max={65}
                low={ageLow}
                high={ageHigh}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.smallTxt, {marginTop: 10}]}>10 yrs</Text>
                <Text style={[styles.smallTxt, {marginTop: 10}]}>65 yrs</Text>
              </View>
            </View>
            <View style={styles.cont}>
              <DropDownSingle
                name={selectAbilityLevel}
                data={AbilityLevelData}
                getValue={getAbility.bind(this)}
                label="Ability level"
              />
            </View>
            <View style={styles.cont}>
              <DropDownSingle
                name={selectSuitable}
                data={SuitabelForData}
                getValue={getSuitable.bind(this)}
                label="Suitable for"
              />
            </View>

            <View style={styles.cont}>
              <DropDownSingle
                name={selectGoodFor}
                data={goodFor}
                getValue={getGoodFor.bind(this)}
                label="Good for"
              />
            </View>

            <View style={styles.cont}>
              <DropDownSingle
                name={facility}
                data={facilities}
                getValue={getFacilities.bind(this)}
                label="Facilities"
              />
            </View>

            <View style={styles.cont}>
              <DropDownSingle
                name={amenty}
                data={amenities}
                getValue={getAmenties.bind(this)}
                label="Amenities"
              />
            </View>
            <View style={{height: 15}} />
            <View style={styles.cont}>
              <ButtonRegular
                buttonStyle={{backgroundColor: '#2C99C6'}}
                title="Apply"
                onClick={onApply}
              />
            </View>

            <View style={styles.cont}>
              <ButtonRegular
                buttonStyle={{
                  backgroundColor: 'transparent',
                  borderColor: '#2C99C6',
                  borderWidth: 1,
                }}
                textStyle={{color: '#2C99C6'}}
                title="Reset"
                onClick={onReset}
              />
            </View>
          </View>
          <View style={{height: 20}} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: 34,
    color: 'black',
  },
  fieldName: {
    fontFamily: FONTS.SFBold,
    fontSize: 14,
    color: 'black',
  },
  cont: {
    width: '90%',
    marginTop: 8,
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 19,
  },
  smallTxt: {
    color: 'black',
    fontFamily: FONTS.SFRegular,
  },
});
