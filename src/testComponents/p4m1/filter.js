import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { COLORS, FONTS } from '../../../constant';
import Icon from 'react-native-vector-icons/Ionicons';
import { DropDownSingle } from './components/dropDownSingle';
import { CustomRangeSlider } from './components/rangeSlider';
import { ButtonRegular } from '../../../common/buttonRegular';
import { amenities, facilities, goodFor, sort } from './data/filtersData';
import { sport } from '../../../constant/data/listingData';
import { ServiceType } from '../../listing/components/data/serviceType';
import CustomDatePicker from './components/customDatePicker';
import NativeTimePicker from '../../../common/dropdownComponents/nativeTimePicker';
import NativePicker from '../../../common/dropdownComponents/nativePicker';
import moment from 'moment';
import { timeData } from '../../listing/components/data/timeData';
import { AbilityLevelData } from '../../listing/components/data/abilityLevel';
import { SuitabelForData } from '../../listing/components/data/suitableFor';
import { useSelector } from 'react-redux';
import { setFilterData, setFilterParams } from '../../../redux/user/user.action';
import { useDispatch } from 'react-redux';


let tempArray = {};

const genderData = [
  "Male",
  "Female"
]

export const SportsFilter = props => {
  const dispatch = useDispatch()
  const filterData = useSelector(state => state.user.filterData);
  const filterParams = useSelector(state => state.user.filterParams);

  const [loader, setLoader] = useState(false);
  const [sortBy, setSortBy] = useState(filterParams.sort == undefined ? 'Select' : filterParams.sort);
  const [selectSport, setSelectSport] = useState(filterParams.sport == undefined ? 'Select' : filterParams.sport);
  const [serviceType, setServiceType] = useState(filterParams.type == undefined ? 'Select' : filterParams.type);
  const [gender, setGender] = useState(filterParams.gender == undefined ? '' : filterParams.gender);
  const [genderPlaceholder, setGenderPlaceholder] = useState(filterParams.gender == undefined ? 'Gender' : filterParams.gender);

  const [selectSuitable, setSuitable] = useState(filterParams.suitable == undefined ? 'Select' : filterParams.suitable)
  const [selectAbilityLevel, setAbilityLevel] = useState(filterParams.abilityLevel == undefined ? 'Select' : filterParams.abilityLevel)
  const [selectGoodFor, setGoodFor] = useState(filterParams.goodfor == undefined ? 'Select' : filterParams.goodfor)
  const [facility, setFacilities] = useState(filterParams.facilites == undefined ? 'Select' : filterParams.facilites)
  const [amenty, setAmenties] = useState(filterParams.amenities == undefined ? 'Select' : filterParams.amenities)

  const [priceLow, setPriceLow] = useState(filterData.price.start == '' ? 0 : filterData.price.start);
  const [priceHigh, setPriceHigh] = useState(filterData.price.end == '' ? 1000 : filterData.price.end);
  const [ageLow, setAgeLow] = useState(filterData.age.from == '' ? 10 : filterData.age.from);
  const [ageHigh, setAgeHigh] = useState(filterData.age.to == '' ? 67 : filterData.age.to);
  const [startDate, setStartDate] = useState(filterData.duration.start == '' ? new Date() : new Date(filterData.duration.start));
  const [endDate, setEndDate] = useState(filterData.duration.end == '' ? new Date() : new Date(filterData.duration.end));
  const [startTime, setStartTime] = useState("1899-12-30T00:00:00");
  const [endTime, setEndTime] = useState("1899-12-30T00:00:00");
  const [tempArray, setTempArray] = useState({});



  useEffect(() => {
    updateStates()
    return () => {
    };
  }, [filterData]);

  const updateStates = () => {
    setTempArray(filterParams) 
    setSortBy(filterParams.sort == undefined ? 'Select' : filterParams.sort);
    setSelectSport(filterParams.sport == undefined ? 'Select' : filterParams.sport);
    setServiceType(filterParams.type == undefined ? 'Select' : filterParams.type);
    setGender(filterParams.gender == undefined ? '' : filterParams.gender);
    setGenderPlaceholder(filterParams.gender == undefined ? 'Gender' : filterParams.gender);

    setSuitable(filterParams.suitable == undefined ? 'Select' : filterParams.suitable)
    setAbilityLevel(filterParams.abilityLevel == undefined ? 'Select' : filterParams.abilityLevel)
    setGoodFor(filterParams.goodfor == undefined ? 'Select' : filterParams.goodfor)
    setFacilities(filterParams.facilites == undefined ? 'Select' : filterParams.facilites)
    setAmenties(filterParams.amenities == undefined ? 'Select' : filterParams.amenities)

    setPriceLow(filterData.price.start == '' ? 0 : filterData.price.start);
    setPriceHigh(filterData.price.end == '' ? 1000 : filterData.price.end);
    setAgeLow(filterData.age.from == '' ? 10 : filterData.age.from);
    setAgeHigh(filterData.age.to == '' ? 67 : filterData.age.to);
    setStartDate(filterData.duration.start == '' ? new Date() : new Date(filterData.duration.start));
    setEndDate(filterData.duration.end == '' ? new Date() : new Date(filterData.duration.end));
    setStartTime("1899-12-30T00:00:00");
    setEndTime("1899-12-30T00:00:00");

  }



  const getSortBy = (value) => {
    setSortBy(value)
    tempArray["sort"] = value
  }
  const getSportSelect = selectedItems => {
    setSelectSport(selectedItems);
    tempArray["sport"] = selectedItems
  };
  const getServiceType = selectedItems => {
    setServiceType(selectedItems);
    tempArray["type"] = selectedItems
  };

  const getPriceRange = (low, high) => {
    setPriceLow(low)
    setPriceHigh(high)
  }
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
    setGenderPlaceholder(value)
    tempArray["gender"] = value
  };

  const getAgeRange = (low, high) => {
    setAgeLow(low)
    setAgeHigh(high)
  }


  const getGoodFor = selectedItems => {
    setGoodFor(selectedItems)
    tempArray["goodfor"] = selectedItems
  };
  const getSuitable = selectedItems => {
    setSuitable(selectedItems)
    tempArray["suitable"] = selectedItems
  };
  const getAbility = selectedItems => {
    setAbilityLevel(selectedItems)
    tempArray["abilityLevel"] = selectedItems
  };

  const getFacilities = selectedItems => {
    setFacilities(selectedItems)
    tempArray["facilites"] = selectedItems
  };

  const getAmenties = selectedItems => {
    setAmenties(selectedItems)
    tempArray["amenities"] = selectedItems
  };
  const onApply = () => {
    
    setLoader(true)
    console.log("tempArray: ", tempArray)
    dispatch(setFilterParams(tempArray))
    setTimeout(() => {
      setLoader(false)
    }, 500);

  }

  const onReset = () => {
    setLoader(true)
    dispatch(setFilterParams({}))
    updateStates()
    setTimeout(() => {
      setLoader(false)
    }, 500);

  }

  function onClosePress() {
    props.navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.main}>
      {
        loader
          ?
          <ActivityIndicator color={COLORS.secondary} size={'small'} />
          :
          <ScrollView style={{ width: '100%' }}>
            <View style={{ width: '100%', alignItems: 'center' }}>
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
                  name={sortBy}
                  data={sort}
                  getValue={getSortBy.bind(this)}
                  label="Sort By"
                />
              </View>
              <View style={styles.cont}>
                <DropDownSingle
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
              <View style={{ height: 10 }} />
              <View style={[styles.cont, { width: '89.5%', }]}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.fieldName, { marginBottom: 10 }]}>Price</Text>
                  <Text style={[styles.smallTxt, { marginBottom: 10 }]}>
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
                  <Text style={[styles.smallTxt, { marginTop: 10 }]}>$0</Text>
                  <Text style={[styles.smallTxt, { marginTop: 10 }]}>$1k</Text>
                </View>
              </View>
              <View style={{ height: 10 }} />
              <View style={styles.cont}>
                <Text style={[styles.fieldName, { marginBottom: 10 }]}>
                  Start date
                </Text>
                <CustomDatePicker
                  value={startDate}
                  getValue={getStartDate.bind(this)}
                />
              </View>
              <View style={{ height: 10 }} />
              <View style={styles.cont}>
                <Text style={[styles.fieldName, { marginBottom: 10 }]}>End date</Text>
                <CustomDatePicker
                  value={endDate}
                  getValue={getEndDate.bind(this)}
                />
              </View>
              <View style={styles.row}>
                <View style={{ width: '45%' }}>
                  <Text style={[styles.fieldName, { marginBottom: 10 }]}>
                    Start Time
                  </Text>
                  <NativeTimePicker placeHolder={moment(startTime).format('hh:mm A')} data={timeData} value={startTime} getValue={getStartTime.bind(this)} size={"38"} />
                </View>
                <View style={{ width: '45%' }}>
                  <Text style={[styles.fieldName, { marginBottom: 10 }]}>
                    End Time
                  </Text>
                  <NativeTimePicker placeHolder={moment(endTime).format('hh:mm A')} data={timeData} value={endTime} getValue={getEndTime.bind(this)} size={"38"} />
                </View>
              </View>
              <View style={{ height: 10 }} />
              <View style={styles.cont}>
                <Text style={[styles.fieldName, { marginBottom: 10 }]}>Gender</Text>
                <NativePicker placeHolder={genderPlaceholder} data={genderData} value={gender} getValue={getGender.bind(this)} size={"90"} />
              </View>
              <View style={{ height: 10 }} />
              <View style={styles.cont}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.fieldName, { marginBottom: 10 }]}>
                    Age Range
                  </Text>
                  <Text style={[styles.smallTxt, { marginBottom: 10 }]}>
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
                  <Text style={[styles.smallTxt, { marginTop: 10 }]}>10 yrs</Text>
                  <Text style={[styles.smallTxt, { marginTop: 10 }]}>65 yrs</Text>
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
              <View style={{ height: 15 }} />
              <View style={styles.cont}>
                <ButtonRegular
                  buttonStyle={{ backgroundColor: '#2C99C6' }}
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
                  textStyle={{ color: '#2C99C6' }}
                  title="Reset"
                  onClick={onReset}
                />
              </View>
            </View>
            <View style={{ height: 20 }} />
          </ScrollView>
      }
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
