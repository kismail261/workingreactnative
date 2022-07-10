//schedulePrice
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RadioForm from 'react-native-simple-radio-button';
import ModalSelector from 'react-native-modal-selector';
import {FONTS, ICONS} from '../../constant';
import Header from './components/header';
import Btn from '../../common/meduimBtnSP';
import CustomInputField from '../profileSetup/components/customInputField';
import CustomDatePicker from './components/customDatePicker';
import CustomTimePicker from './components/customTimePicker';
import PracticeScheduleItem from './components/practiceScheduleItem';
import {useDispatch, useSelector} from 'react-redux';
import {setLoader} from '../../redux/loader/loader.action';
import TNIndicator from '../../common/TNIndicator';
import {
  addServiceSchedule,
  getSchedules,
} from '../../redux/listing/listing.action';
import WeekDays from './components/weekDays';
import {ScheduleEnd} from './components/scheduleEnd';
import moment from 'moment';
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';

const data = [
  {key: 'Per', section: true, label: 'Per'},
  {key: 'Person', label: 'Person'},
];

const repeatData = [
  {key: 'Every', section: true, label: 'Every'},
  {key: 'day', label: 'Day'},
  {key: 'Week', label: 'Week'},
  {key: 'Month', label: 'Month'},
  {key: 'Year', label: 'Year'},
];

var monthlyPay = [
  {label: 'Yes', value: 'Yes'},
  {label: 'No', value: 'No'},
];
var RepeatRadio = [
  {label: 'Yes', value: 'Yes'},
  {label: 'No', value: 'No'},
];

const editServiceSchedulePrice = props => {
  // let recordId = "61bcdf28be170900161916d4"
  let recordId = props.route.params.recordId;
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader);
  const token = useSelector(state => state.user.token);
  const scheduleList = useSelector(state => state.listing.scheduleList);

  const [progress, setProgress] = useState(0.6);

  const [serviceName, setServiceName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [repeatRadio, setRepeatRadio] = useState('No');
  const [repeatEvery, setRepeatEvery] = useState('');
  const [repeatType, setRepeatType] = useState('');
  const [repeatOn, setRepeatOn] = useState([]);
  const [end, setEnd] = useState('Never');
  const [accpetingBookingUntil, setAccpetingBookingUntil] = useState(
    new Date(),
  );
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [pricePer, setPricePer] = useState('');
  const [monthlyPayment, setMonthlyPay] = useState('No');

  // const [quantitynd, set2ndQuantity] = useState('')
  // const [discPrice, setDiscPrice] = useState('')

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(getSchedules(token, recordId));

    setTimeout(() => {
      setProgress(0.8);
    }, 100);
    return () => {};
  }, []);

  const getServiceName = value => {
    setServiceName(value);
  };
  const getPrice = value => {
    setPrice(value);
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
  const getAccpetingBookingUntil = value => {
    setAccpetingBookingUntil(value);
  };

  const getDays = value => {
    setRepeatOn(value);
  };

  const getEnd = value => {
    setEnd(value);
  };

  const saveSchedulePrice = () => {
    if (serviceName == '') {
      showMessage('Schedule title field should not be blank', 'warning');
    } else {
      let weekDays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thrusday',
        'Friday',
        'Saturday',
      ];
      let result = weekDays.filter((item, index) => repeatOn.includes(index));
      const Sdate = moment(startDate).format('YYYY-MM-DD');
      const Edate = moment(endDate).format('YYYY-MM-DD');
      const Stime = moment(startTime).format('hh:mm:ss');
      const Etime = moment(endTime).format('hh:mm:ss');

      const startDateTime = moment(
        `${Sdate} ${Stime}`,
        'YYYY-MM-DD HH:mm:ss',
      ).format();
      const EndDateTime = moment(
        `${Edate} ${Etime}`,
        'YYYY-MM-DD HH:mm:ss',
      ).format();
      dispatch(setLoader(true));
      let data = [
        {
          name: serviceName,
          start: startDateTime,
          end: EndDateTime,
          isRepeat: repeatRadio == 'No' ? false : true,
          repeatCount: parseInt(repeatEvery),
          repeatType: repeatType,
          repeatsOn: result,
          stopBooking: moment(accpetingBookingUntil).format(
            'YYYY-MM-DD HH:mm:ss',
          ),
          quantity: parseInt(quantity),
          price: parseInt(price),
          per: pricePer,
        },
      ];
      dispatch(addServiceSchedule(token, recordId, data, props.navigation, 1));
    }
  };

  const onDuplicateRecordSave = schedule => {
    dispatch(setLoader(true));
    let data = [
      {
        name: schedule.name + ' 1',
        start: schedule.duration.start,
        end: schedule.duration.end,
        isRepeat: schedule.repeat.isRepeat,
        repeatCount: schedule.repeat.repeatEvery.count,
        repeatType: schedule.repeat.repeatEvery.period,
        repeatsOn: schedule.repeat.repeatsOn,
        stopBooking: schedule.duration.end,
        quantity: schedule.pricing.quantity,
        price: schedule.pricing.price,
        per: schedule.pricing.per,
      },
    ];
    const response = await fetch(
      `http://sfyapi.herokuapp.com/api/listing/schedual/${recordId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(data),
      },
    );

    if (response.status === 200 || response.status === 201) {
      dispatch(setLoader(false));
      props.navigation.navigate('editServiceFAQ');
    }
  };

  const continueClick = () => {
    props.navigation.navigate('frequentlyQuestions', {recordId: recordId});
  };

  const updateData = async () => {
    try {
      if (address == '') {
        showMessage('Should choose location', 'warning');
      } else {
        let weekDays = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thrusday',
          'Friday',
          'Saturday',
        ];
        let result = weekDays.filter((item, index) => repeatOn.includes(index));
        const Sdate = moment(startDate).format('YYYY-MM-DD');
        const Edate = moment(endDate).format('YYYY-MM-DD');
        const Stime = moment(startTime).format('hh:mm:ss');
        const Etime = moment(endTime).format('hh:mm:ss');

        const startDateTime = moment(
          `${Sdate} ${Stime}`,
          'YYYY-MM-DD HH:mm:ss',
        ).format();
        const EndDateTime = moment(
          `${Edate} ${Etime}`,
          'YYYY-MM-DD HH:mm:ss',
        ).format();
        const body = [
          {
            name: serviceName,
            start: startDateTime,
            end: EndDateTime,
            isRepeat: repeatRadio == 'No' ? false : true,
            repeatCount: parseInt(repeatEvery),
            repeatType: repeatType,
            repeatsOn: result,
            stopBooking: moment(accpetingBookingUntil).format(
              'YYYY-MM-DD HH:mm:ss',
            ),
            quantity: parseInt(quantity),
            price: parseInt(price),
            per: pricePer,
          },
        ];
        const response = await fetch(
          `http://sfyapi.herokuapp.com/api/listing/schedual/${recordId}`,
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
          props.navigation.navigate('editServiceFAQ');
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

      setServiceName(data.schedules[0].name);
      setPrice(data.schedules[0].pricing.price);
      setQuantity(data.schedules[0].pricing.quantity);
      setStartDate(data.schedules[0].duration.start);
      setEndDate(data.schedules[0].duration.end);
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
          <Text style={styles.headingStyle}>Schedule and Price</Text>
          <Text style={styles.subHeading}>
            Enter the dates, days, times, and other particulars for your service
          </Text>
          <Text style={styles.subHeading1}>
            You have the option to add multiple schedules for your service,
            using different dates, days, and times
          </Text>
          <Text style={styles.subHeading1}>
            Note: If your service has multiple locations, then a new listing
            must be created for each location
          </Text>

          {scheduleList.length == 0 ? null : (
            <View style={{maxHeight: hp('30'), paddingBottom: 10}}>
              <ScrollView nestedScrollEnabled style={{width: '100%'}}>
                {scheduleList.map((item, index) => {
                  return (
                    <PracticeScheduleItem
                      key={index}
                      data={item}
                      onDuplicate={onDuplicateRecordSave.bind(this)}
                      navigation={props.navigation}
                      listId={recordId}
                    />
                  );
                })}
              </ScrollView>
            </View>
          )}

          <CustomInputField
            value={serviceName}
            label="Schedule Title"
            subLabel="Add a Sub Title or Name for this Schedule, (examples: Beginners Class, Practice Schedule, or Morning Camp)"
            getValue={getServiceName.bind(this)}
          />
          <View style={{width: wp('80'), marginTop: 12}}>
            <Text style={styles.labelStyle}>Start date</Text>
            <Text style={[styles.subHeading1, {fontSize: wp('3')}]}>
              This is the date that your service starts
            </Text>
            <CustomDatePicker
              value={startDate}
              getValue={getStartDate.bind(this)}
            />
          </View>
          <View style={{width: wp('80'), marginTop: 12}}>
            <Text style={styles.labelStyle}>End date</Text>
            <Text style={[styles.subHeading1, {fontSize: wp('3')}]}>
              This is the date that your service ends
            </Text>
            <CustomDatePicker
              value={endDate}
              getValue={getEndDate.bind(this)}
            />
          </View>
          <View
            style={{
              width: wp('80'),
              marginTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={[styles.labelStyle, {width: wp('37.5')}]}>
                Start time
              </Text>
              <CustomTimePicker
                value={startTime}
                getValue={getStartTime.bind(this)}
              />
            </View>
            <View>
              <Text style={[styles.labelStyle, {width: wp('37.5')}]}>
                End time
              </Text>
              <CustomTimePicker
                value={endTime}
                getValue={getEndTime.bind(this)}
              />
            </View>
          </View>

          <View style={{width: wp('80'), marginTop: 12}}>
            <Text style={styles.labelStyle}>Repeat</Text>
            <RadioForm
              radio_props={RepeatRadio}
              initial={1}
              onPress={value => {
                setRepeatRadio(value);
              }}
              buttonColor={'#15488F26'}
              selectedButtonColor={'#21D17F'}
              buttonSize={7}
              labelStyle={styles.greyReg}
              formHorizontal
            />
          </View>
          {repeatRadio == 'No' ? null : (
            <>
              <View
                style={{
                  width: wp('80'),
                  marginTop: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={[styles.labelStyle, {width: wp('37.5')}]}>
                    Repeats every
                  </Text>
                  <TextInput
                    style={{
                      width: wp('37.5'),
                      height: 46,
                      color: '#707070',
                      fontSize: wp('3.3'),
                      fontFamily: FONTS.SFRegular,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 4,
                      borderColor: '#70707026',
                      borderWidth: 1,
                      textAlign: 'center',
                    }}
                    placeholder="1"
                    onChangeText={value => {
                      setRepeatEvery(value);
                    }}
                    value={repeatEvery}
                    keyboardType="phone-pad"
                  />
                </View>

                <View>
                  <Text style={[styles.labelStyle, {width: wp('37.5')}]}></Text>
                  <View style={{flexDirection: 'row'}}>
                    <ModalSelector
                      selectStyle={{
                        width: wp('37.5'),
                        height: 46,
                        backgroundColor: '#FFFFFF',
                        borderColor: '#70707026',
                        borderRadius: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      style={{
                        width: wp('30'),
                        height: 46,
                        backgroundColor: '#FFFFFF',
                      }}
                      selectTextStyle={{
                        color: '#707070',
                        fontSize: wp('3.5'),
                        fontFamily: FONTS.SFRegular,
                      }}
                      initValueTextStyle={{
                        color: '#707070',
                        fontSize: wp('3.5'),
                        fontFamily: FONTS.SFRegular,
                      }}
                      data={repeatData}
                      initValue="select"
                      onChange={option => {
                        setRepeatType(option.key);
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
              </View>
              <WeekDays days={repeatOn} getValue={getDays.bind(this)} />
              <View style={{height: 12}} />
              <Text style={styles.labelStyle}>End</Text>
              <ScheduleEnd name={end} getValue={getEnd.bind(this)} />
            </>
          )}

          <View style={{width: wp('80'), marginTop: 12}}>
            <Text style={styles.labelStyle}>Accepting Bookings Until</Text>
            <Text style={[styles.subHeading1, {fontSize: wp('3')}]}>
              This is the date that you can stop accepting bookings
            </Text>
            <CustomDatePicker
              value={accpetingBookingUntil}
              getValue={getAccpetingBookingUntil.bind(this)}
            />
          </View>
          <View style={{width: wp('80'), marginTop: 12}}>
            <Text style={styles.labelStyle}>Pricing</Text>
            <Text style={[styles.subHeading1, {fontSize: wp('3')}]}>
              Set the pricing for this Schedule
            </Text>
          </View>
          <View
            style={{
              width: wp('80'),
              marginTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={[styles.labelStyle, {width: wp('20')}]}>
                Quantity
              </Text>
              <TextInput
                style={{
                  width: wp('20'),
                  height: 46,
                  color: '#707070',
                  fontSize: wp('3.3'),
                  fontFamily: FONTS.SFRegular,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 4,
                  borderColor: '#70707026',
                  borderWidth: 1,
                  textAlign: 'center',
                }}
                placeholder="1"
                onChangeText={value => {
                  setQuantity(value);
                }}
                value={quantity}
                keyboardType="phone-pad"
              />
            </View>

            <View>
              <Text style={[styles.labelStyle, {width: wp('25')}]}>Price</Text>
              <TextInput
                style={{
                  width: wp('25'),
                  height: 46,
                  color: '#707070',
                  fontSize: wp('3.3'),
                  fontFamily: FONTS.SFRegular,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 4,
                  borderColor: '#70707026',
                  borderWidth: 1,
                  textAlign: 'center',
                }}
                placeholder="$ 100.00"
                onChangeText={value => {
                  // setPrice(value);
                  getPrice.bind(this);
                }}
                value={price}
                keyboardType="phone-pad"
              />
            </View>

            <View>
              <Text style={[styles.labelStyle, {width: wp('30')}]}>Per</Text>
              <View style={{flexDirection: 'row'}}>
                <ModalSelector
                  selectStyle={{
                    width: wp('30'),
                    height: 46,
                    backgroundColor: '#FFFFFF',
                    borderColor: '#70707026',
                    borderRadius: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  style={{
                    width: wp('30'),
                    height: 46,
                    backgroundColor: '#FFFFFF',
                  }}
                  selectTextStyle={{
                    color: '#707070',
                    fontSize: wp('3.5'),
                    fontFamily: FONTS.SFRegular,
                  }}
                  initValueTextStyle={{
                    color: '#707070',
                    fontSize: wp('3.5'),
                    fontFamily: FONTS.SFRegular,
                  }}
                  data={data}
                  initValue="select"
                  onChange={option => {
                    setPricePer(option.key);
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
          </View>

          {/* <View style={{ width: wp('80'), marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                        <View>
                            <Text style={[styles.labelStyle, { width: wp('37.5') }]} >Quantity</Text>
                            <TextInput
                                style={{ width: wp('37.5'), height: 46, color: '#707070', fontSize: wp('3.3'), fontFamily: FONTS.SFRegular, backgroundColor: '#FFFFFF', borderRadius: 4, borderColor: '#70707026', borderWidth: 1, textAlign: 'center' }}
                                placeholder="1"
                                onChangeText={(value) => { set2ndQuantity(value) }}
                                value={quantitynd}
                            />
                        </View>

                        <View>
                            <Text style={[styles.labelStyle, { width: wp('37.5') }]} >Discounted Price</Text>
                            <TextInput
                                style={{ width: wp('37.5'), height: 46, color: '#707070', fontSize: wp('3.3'), fontFamily: FONTS.SFRegular, backgroundColor: '#FFFFFF', borderRadius: 4, borderColor: '#70707026', borderWidth: 1, textAlign: 'center' }}
                                placeholder="$ 100.00"
                                onChangeText={(value) => { setDiscPrice(value) }}
                                value={discPrice}
                            />
                        </View>
                    </View> */}

          {/* <View style={{width: wp('80'), marginTop: 12}}>
            <Text style={styles.labelStyle}>
              Can the User make monthly payments for this service?
            </Text>
            <Text style={[styles.subHeading1, {fontSize: wp('3')}]}>
              Please check here if the User has the option to make monthly
              payments, instead of making one payment in full
            </Text>
            <RadioForm
              radio_props={monthlyPay}
              initial={1}
              onPress={value => {
                setMonthlyPay(value);
              }}
              buttonColor={'#15488F26'}
              selectedButtonColor={'#21D17F'}
              buttonSize={7}
              labelStyle={styles.greyReg}
              formHorizontal
            />
          </View>
          <View style={styles.recieptContainer}>
            <View style={styles.paymentDetailRow}>
              <Text style={styles.paymentLabel}>Users monthly payment:</Text>
              <Text style={styles.paymentAmount}>$100</Text>
            </View>
            <View style={styles.paymentDetailRow}>
              <Text style={styles.paymentLabel}>Number of months:</Text>
              <Text style={styles.paymentAmount}>12</Text>
            </View>
            <View
              style={{
                width: wp('70'),
                height: 0.4,
                backgroundColor: '#000000',
                marginTop: 12,
              }}
            />
            <View style={styles.paymentDetailRow}>
              <Text
                style={[styles.paymentLabel, {fontFamily: FONTS.SFSemiBold}]}>
                Total Payment:
              </Text>
              <Text style={styles.paymentAmount}>$1200</Text>
            </View>
            <View style={{height: 16}} />
          </View> */}

          <View style={{height: 40}} />
          <TouchableOpacity
            onPress={updateData}
            style={{
              width: wp('80'),
              height: 46,
              borderColor: '#61B2D4',
              borderWidth: 1,
              borderRadius: 4,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <Image source={ICONS.plusIcon} style={{width: 16, height: 16}} />
            <Text
              style={{
                color: '#61B2D4',
                fontSize: wp('3'),
                fontFamily: FONTS.SFRegular,
              }}>
              {' '}
              Add another Schedule
            </Text>
          </TouchableOpacity>
          <Btn
            label="Continue"
            onClick={() => updateData()}
            bgColor="#2C99C6"
          />
        </View>
      </ScrollView>
      {loader ? <TNIndicator /> : null}
    </View>
  );
};

export default editServiceSchedulePrice;

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
    marginBottom: Platform.OS == 'android' ? 8 : 8,
  },
  subHeading1: {
    width: wp('80'),
    color: '#707070',
    fontSize: wp('4'),
    fontFamily: FONTS.SFRegular,
    marginBottom: Platform.OS == 'android' ? 8 : 8,
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
  labelStyle: {
    width: '100%',
    color: '#000000',
    fontSize: wp('4'),
    fontFamily: FONTS.SFSemiBold,
    marginBottom: 6,
  },
  paymentDetailRow: {
    width: wp('70'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  paymentLabel: {
    width: wp('55'),
    color: 'rgba(0, 0, 0, .66)',
    fontSize: wp('3'),
    fontFamily: FONTS.SFRegular,
  },
  paymentAmount: {
    color: 'rgba(0, 0, 0, .78)',
    fontSize: wp('3'),
    fontFamily: FONTS.SFSemiBold,
  },
  recieptContainer: {
    width: wp('80'),
    backgroundColor: 'rgba(180, 217, 236, 0.3)',
    borderRadius: 4,
    marginTop: 6,
    alignItems: 'center',
  },
  greyReg: {
    width: 45,
    color: '#707070',
    fontFamily: FONTS.SFRegular,
    fontSize: 12,
    marginTop: -3,
  },
});
