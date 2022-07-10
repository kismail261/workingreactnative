import React, {useState, useEffect} from 'react';
import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FONTS, ICONS} from '../../constant';
import Header from './components/header';
import SearchablePickerMulti from './components/searchablePickerMulti';
import {sport} from './components/data/sport';
import {Facilities} from './components/data/facilities.js';
import {MyTextinputMultiline} from '../../common/textinputMultiline';
import Btn from '../../common/meduimBtnSP';
import {addServiceFacilities} from '../../redux/listing/listing.action';
import {useDispatch, useSelector} from 'react-redux';
import {setLoader} from '../../redux/loader/loader.action';
import TNIndicator from '../../common/TNIndicator';
import CustomTitleDropdown from '../../common/customTitleDropdown';
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';

const editServiceFacilities = props => {
  let recordId = props.route.params.recordId;
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader);
  const token = useSelector(state => state.user.token);

  const [progress, setProgress] = useState(0.6);
  const [facilities, setFacilities] = useState([]);
  const [amenties, setAmenties] = useState([]);
  const [preparation, setPreparation] = useState('');

  useEffect(() => {
    // showMessage(recordId, 'warning')
    setTimeout(() => {
      setProgress(0.8);
    }, 100);
    return () => {};
  }, []);

  const getFacilities = selectedItems => {
    setFacilities(selectedItems);
  };

  const getAmenties = selectedItems => {
    setAmenties(selectedItems);
  };

  const getPreparation = value => [setPreparation(value)];

  const addFacilities = () => {
    if (facilities.length == 0) {
      showMessage('Should select facilities', 'warning');
    } else if (amenties.length == 0) {
      showMessage('Should select amenties', 'warning');
    } else if (preparation == '') {
      showMessage('Preparation field should not be blank', 'warning');
    } else {
      dispatch(setLoader(true));
      let data = {
        facilites: facilities,
        amenities: amenties,
        instructions: preparation,
      };
      dispatch(
        addServiceFacilities(token, recordId, data, props.navigation, 1),
      );
    }
  };

  const updateData = async () => {
    try {
      if (facilities.length == 0) {
        showMessage('Should select facilities', 'warning');
      } else if (amenties.length == 0) {
        showMessage('Should select amenties', 'warning');
      } else if (preparation == '') {
        showMessage('Preparation field should not be blank', 'warning');
      } else {
        const body = {
          facilites: facilities,
          amenities: amenties,
          instructions: preparation,
        };
        const response = await fetch(
          `http://sfyapi.herokuapp.com/api/listing/facilites/${recordId}`,
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
          props.navigation.navigate('editServiceSchedulePrice');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async e => {
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
      setPreparation(data.instructions);
    } catch (error) {
      console.error(error.message);
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
          <Text style={styles.headingStyle}>
            Facilities, Amenities and Preparation
          </Text>
          <Text style={styles.subHeading}>
            Please tell us what Facilities are used, and any Amenities that
            maybe available
          </Text>
          <CustomTitleDropdown
            item={Facilities}
            value={facilities}
            label="What Facilities are used for this service?"
            placeHolder="Select Facilities"
            getValue={getFacilities.bind(this)}
          />
          <CustomTitleDropdown
            item={sport}
            value={amenties}
            label="What Amenities are available?"
            placeHolder="Select Amenities"
            getValue={getAmenties.bind(this)}
          />

          <View style={{width: wp('80'), alignItems: 'center'}}>
            <Text style={[styles.h3, {marginTop: 10}]}>How to Prepare</Text>
            <MyTextinputMultiline
              styles={{height: 92, marginTop: 3}}
              placeholderTextColor={styles.placeholderStyle}
              placeholder="Include some info on what to bring, what towear, and anything else a User shouldknow before attending"
              onChangeText={getPreparation.bind(this)}
              value={preparation}
            />
          </View>
          <View style={{height: 40}} />
          <Btn
            label="Continue"
            onClick={() => {
              updateData();
            }}
            bgColor="#2C99C6"
          />
        </View>
      </ScrollView>
      {loader ? <TNIndicator /> : null}
    </View>
  );
};

export default editServiceFacilities;

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
