import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FONTS, ICONS} from '../../../../constant';
import Header from '../../components/header';
import ModalSelector from 'react-native-modal-selector';
import Btn from '../../../../common/meduimBtnSP';
import {useDispatch, useSelector} from 'react-redux';
import {addServiceParticulars} from '../../../../redux/listing/listing.action';
import {setLoader} from '../../../../redux/loader/loader.action';
import TNIndicator from '../../../../common/TNIndicator';
import CustomSmallDatePicker from '../../../profileSetup/components/customSmallDatePicker';
import {SuitabelForData} from '../../components/data/suitableFor';
import {AbilityLevelData} from '../../components/data/abilityLevel';
import {GoodForData} from '../../components/data/goodFor';
import {DropDownSingle} from '../../../../common/dropdownComponents/dropDownSingle';
import CustomTitleDropdown from '../../../../common/customTitleDropdown';
import { showMessage } from '../../../../helpers/replaceDigitsWithAesteriks';

const dataGender = [
  {key: 'non', section: true, label: 'Choose Gender'},
  {key: 'Male', label: 'Male'},
  {key: 'Female', label: 'Female'},
  {key: 'Others', label: 'Others'},
  {key: 'All', label: 'All'},
];

const editEventParticular = props => {
  let recordId = props.route.params.recordId;
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader);
  const token = useSelector(state => state.user.token);

  const [progress, setProgress] = useState(0.1);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [gender, setGender] = useState('');
  const [selectSuitable, setSuitable] = useState('select');
  const [selectAbilityLevel, setAbilityLevel] = useState('select');
  const [selectGoodFor, setGoodFor] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setProgress(0.3);
    }, 100);
    return () => {};
  }, []);

  const updateData = async () => {
    try {
      if (gender == '') {
        showMessage('Should select geneder');
      } else if (selectSuitable == 'select') {
        showMessage('Should select suitable for');
      } else if (selectAbilityLevel == 'select') {
        showMessage('Should select ability level');
      } else if (selectGoodFor.length == 0) {
        showMessage('Should select Good for');
      } else {
        const body = {
          gender: gender,
          age: {
            from: fromDate,
            to: toDate,
          },
          suitable: selectSuitable,
          abilityLevel: selectAbilityLevel,
          goodfor: selectGoodFor,
        };
        const response = await fetch(
          `http://sfyapi.herokuapp.com/api/listing/particulars/${recordId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(body),
          },
        );

        if (response.status === 200 || response.status === 201) {
          props.navigation.navigate('editServiceLocation');
        }
      }
    } catch (error) {
      console.error(error);
    }
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
      showMessage('Should select geneder');
    } else if (selectSuitable == 'select') {
      showMessage('Should select suitable for');
    } else if (selectAbilityLevel == 'select') {
      showMessage('Should select ability level');
    } else if (selectGoodFor.length == 0) {
      showMessage('Should select Good for');
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
        addServiceParticulars(token, recordId, data, props.navigation, 2),
      );
    }
  };

  const getData = () => {
    try {
      const response = await fetch(
        `https://api2.sporforya.com/api/listing/by/${recordId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );

      const data = await response.json();
      console.log(data);

      setToDate(data.age.to);
      setFromDate(data.age.from);
      setAbilityLevel(data.abilityLevel);
      setSuitable(data.suitable);
      setGoodFor(data.goodfor);
      setGender(data.gender);
    } catch (error) {
      showMessage(error.message);
    }
  };

  const UpdateData = async () => {
    try {
      if (gender == '') {
        showMessage('Should select geneder');
      } else if (selectSuitable == 'select') {
        showMessage('Should select suitable for');
      } else if (selectAbilityLevel == 'select') {
        showMessage('Should select ability level');
      } else if (selectGoodFor.length == 0) {
        showMessage('Should select Good for');
      } else {
        const body = {
          gender: gender,
          age: {
            from: fromDate,
            to: toDate,
          },
          suitable: selectSuitable,
          abilityLevel: selectAbilityLevel,
          goodfor: selectGoodFor,
        };
        const response = await fetch(
          `http://sfyapi.herokuapp.com/api/listing/particulars/${recordId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(body),
          },
        );

        if (response.status === 200 || response.status === 201) {
          props.navigation.navigate('editEventLocation');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        navigation={props.navigation}
        label="Service"
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
            Add some particulars to describe who the service is most suited to,
            and help Users choose what's best for them.
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
                initValue="select"
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
              <CustomSmallDatePicker
                value={fromDate}
                getValue={getFromDate.bind(this)}
              />
            </View>
            <View style={{width: wp('37.5'), marginTop: 12}}>
              <Text style={styles.labelStyle}></Text>
              <CustomSmallDatePicker
                value={toDate}
                getValue={getToDate.bind(this)}
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
            value={selectGoodFor}
            label="Good for"
            placeHolder="select"
            getValue={getGoodFor.bind(this)}
          />
          <View style={{height: 40}} />
          <Btn
            label="Continue"
            onClick={() => UpdateData()}
            bgColor="#2C99C6"
          />
        </View>
      </ScrollView>
      {loader ? <TNIndicator /> : null}
    </View>
  );
};

export default editEventParticular;

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
