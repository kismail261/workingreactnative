import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FONTS, ICONS, Url} from '../../../constant';
import Header from '../components/header';
import ModalSelector from 'react-native-modal-selector';
import Btn from '../../../common/meduimBtnSP';
import {useDispatch, useSelector} from 'react-redux';
import {editServiceParticulars} from '../../../redux/listing/listing.action';
import {setLoader} from '../../../redux/loader/loader.action';
import TNIndicator from '../../../common/TNIndicator';
import CustomSmallDatePicker from '../../profileSetup/components/customSmallDatePicker';
import {SuitabelForData} from '../components/data/suitableFor';
import {AbilityLevelData} from '../components/data/abilityLevel';
import {GoodForData} from '../components/data/goodFor';
import {DropDownSingle} from '../../../common/dropdownComponents/dropDownSingle';
import CustomTitleDropdown from '../../../common/customTitleDropdown';
import NativePicker from '../../../common/dropdownComponents/nativeNumberPicker';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';

const dataGender = [
  {key: 'non', section: true, label: 'Choose Gender'},
  {key: 'Male', label: 'Male'},
  {key: 'Female', label: 'Female'},
  {key: 'Others', label: 'Others'},
  {key: 'All', label: 'All'},
];
const ageData = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
  80, 81, 82, 83, 84, 85,
];
const editParticularsEvents = props => {
  let recordId = props.route.params.recordId;
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader);
  const token = useSelector(state => state.user.token);

  const [progress, setProgress] = useState(0.1);
  const [fromDate, setFromDate] = useState(0);
  const [toDate, setToDate] = useState(0);
  const [gender, setGender] = useState('');
  const [selectSuitable, setSuitable] = useState('select');
  const [selectAbilityLevel, setAbilityLevel] = useState('select');
  const [selectGoodFor, setGoodFor] = useState([]);
  const [selectGoodForRes, setGoodForRes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getListingDetail();
      setTimeout(() => {
        setProgress(0.3);
      }, 100);
    }
    return () => {};
  }, [isFocused]);

  const getListingDetail = () => {
    dispatch(setLoader(true));
    let headers = {
      'Content-Type': 'application/json',
    };
    axios
      .get(`${Url}api/listing/by/${recordId}`, {headers: headers})
      .then(resp => {
        let response = resp.data;
        setGender(response.gender);
        setFromDate(response.age.from);
        setToDate(response.age.to);
        setSuitable(response.suitable);
        setGoodForRes(response.goodfor);
        setAbilityLevel(response.abilityLevel);
        dispatch(setLoader(false));
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          showMessage(err.response.data.message, 'warning');
        }
        dispatch(setLoader(false));
      });
  };

  const getGoodFor = selectedItems => {
    setGoodFor(selectedItems);
  };
  const getSuitable = selectedItems => {
    setSuitable(selectedItems);
  };
  const getAbility = selectedItems => {
    setAbilityLevel(selectedItems);
  };

  const getFromDate = value => {
    setFromDate(value);
  };
  const getToDate = value => {
    setToDate(value);
  };

  const uploadServiceParticulars = () => {
    if (gender == '') {
      showMessage('Should select gender', 'warning');
    } else if (selectSuitable == 'select') {
      showMessage('Should select suitable for', 'warning');
    } else if (selectAbilityLevel == 'select') {
      showMessage('Should select ability level', 'warning');
    } else if (selectGoodForRes.length == 0) {
      showMessage('Should select Good for', 'warning');
    } else {
      dispatch(setLoader(true));
      let data = {
        gender: gender,
        age: {
          from: fromDate,
          to: toDate,
        },
        suitable: selectSuitable,
        abilityLevel: selectAbilityLevel,
        goodfor: selectGoodFor,
      };
      dispatch(
        editServiceParticulars(token, recordId, data, props.navigation, 2),
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header
        navigation={props.navigation}
        label="Event"
        progressCount={progress}
      />
      <ScrollView
        contentContainerStyle={{
          width: wp('100'),
          alignItems: 'center',
          paddingBottom: 20,
        }}>
        <View style={styles.subContainer}>
          <Text style={styles.headingStyle}>Participant Particulars</Text>
          <Text style={styles.subHeading}>
            Add some particulars to describe who the event is most suited to,
            and help Users choose what's best for them
          </Text>
          <View>
            <Text style={[styles.labelStyle, {width: wp('80')}]}>Gender</Text>
            <View style={{flexDirection: 'row'}}>
              <ModalSelector
                selectStyle={{
                  width: wp('80'),
                  height: 46,
                  backgroundColor: '#FFFFFF',
                  borderColor: '#70707026',
                  borderRadius: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                style={{
                  width: wp('80'),
                  height: 46,
                  backgroundColor: '#FFFFFF',
                }}
                selectTextStyle={{
                  color: '#707070',
                  fontSize: wp('3.5'),
                  fontFamily: FONTS.SFRegular,
                  textAlign: 'left',
                }}
                initValueTextStyle={{
                  color: '#707070',
                  fontSize: wp('3.5'),
                  fontFamily: FONTS.SFRegular,
                  textAlign: 'left',
                }}
                data={dataGender}
                initValue={gender}
                onChange={option => {
                  setGender(option.key);
                }}
              />
              <Image
                source={ICONS.downArrow}
                style={{
                  width: 10,
                  height: 10,
                  position: 'absolute',
                  right: 12,
                  marginTop: 20,
                }}
                resizeMode="contain"
              />
            </View>
          </View>
          <View
            style={{
              width: wp('80'),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: wp('37.5'), marginTop: 12}}>
              <Text style={styles.labelStyle}>Age</Text>
              {/* <CustomSmallDatePicker
                label={'From:'}
                value={fromDate}
                getValue={getFromDate.bind(this)}
              /> */}
              <NativePicker
                placeHolder={fromDate}
                data={ageData}
                value={fromDate}
                getValue={getFromDate.bind(this)}
                size={'37.5'}
                type="From:"
              />
            </View>
            <View style={{width: wp('37.5'), marginTop: 12}}>
              <View style={{height: 27}} />
              {/* <CustomSmallDatePicker
                label={'To:'}
                value={toDate}
                getValue={getToDate.bind(this)}
              /> */}
              <NativePicker
                placeHolder={toDate}
                data={ageData}
                value={toDate}
                getValue={getToDate.bind(this)}
                size={'37.5'}
                type="To:"
              />
            </View>
          </View>
          <DropDownSingle
            name={selectSuitable}
            data={SuitabelForData}
            getValue={getSuitable.bind(this)}
            label="Suitable for"
          />
          <DropDownSingle
            name={selectAbilityLevel}
            data={AbilityLevelData}
            getValue={getAbility.bind(this)}
            label="Ability level"
          />
          <CustomTitleDropdown
            item={GoodForData}
            value={selectGoodForRes}
            label="Good for"
            placeHolder="select"
            getValue={getGoodFor.bind(this)}
          />
          <View style={{height: 40}} />
          <Btn
            label="Continue"
            onClick={() => uploadServiceParticulars()}
            bgColor="#2C99C6"
          />
        </View>
      </ScrollView>
      {loader ? <TNIndicator /> : null}
    </View>
  );
};

export default editParticularsEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
  },
  subContainer: {
    width: wp('80%'),
    alignItems: 'center',
  },
  headingStyle: {
    width: wp('80'),
    color: '#000000',
    fontSize: wp('6.5'),
    fontFamily: FONTS.SFBold,
    marginTop: Platform.OS == 'android' ? 18 : 28,
  },
  subHeading: {
    width: wp('80'),
    color: '#707070',
    fontSize: wp('4'),
    fontFamily: FONTS.SFRegular,
    marginTop: 8,
    marginBottom: Platform.OS == 'android' ? 18 : 28,
  },
  labelStyle: {
    width: '100%',
    color: '#000000',
    fontSize: wp('4'),
    fontFamily: FONTS.SFSemiBold,
    marginBottom: 6,
  },
  h3: {
    width: wp('80'),
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('3.5'),
    color: '#000000',
    marginTop: Platform.OS == 'android' ? 18 : 28,
  },
  placeholderStyle: {
    color: '#707070',
    fontSize: 14,
    fontFamily: FONTS.SFRegular,
  },
  addPhotos: {
    width: wp('80'),
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#B4D9ECB3',
    backgroundColor: '#B4D9EC1A',
    marginTop: 10,
  },
  p: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('3'),
    color: '#3D3D3D',
  },
  addAccountContainer: {
    width: wp('80%'),
    height: 200,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    paddingBottom: 12,
  },
  wrapper: {},
  buttonText: {
    color: 'white',
    fontSize: 80,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  dotStyle: {
    marginBottom: hp('10'),
  },
  activeScroll: {
    width: wp('7'),
    height: 7,
    backgroundColor: '#2C99C6',
    borderRadius: 7,
    margin: 2,
  },
  inActiveScroll: {
    width: 8,
    height: 8,
    backgroundColor: '#2C99C6',
    opacity: 0.18,
    borderRadius: 7,
    margin: 2,
  },
  photoTitle: {
    color: '#000000',
    fontSize: wp('4.5'),
    fontFamily: FONTS.SFBold,
    marginTop: 4,
  },
  btnRow: {
    width: wp('80'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  fillBtn: {
    width: 84,
    height: 32,
    backgroundColor: '#2C99C6',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderBtn: {
    width: 84,
    height: 32,
    borderColor: '#2C99C6',
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
