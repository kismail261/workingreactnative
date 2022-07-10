//schedulePrice
import React, { useState, useEffect, } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import RadioForm from 'react-native-simple-radio-button';
import ModalSelector from 'react-native-modal-selector'
import { FONTS, ICONS } from '../../constant'
import Header from '../../common/headerBLC'
import Btn from '../../common/meduimBtnSP'
import CustomInputField from '../profileSetup/components/customInputField'
import CustomDatePicker from './components/customDatePicker';
import CustomTimePicker from './components/customTimePicker';

import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../redux/loader/loader.action'
import TNIndicator from '../../common/TNIndicator'
import { updateSchedule } from '../../redux/listing/listing.action';
import WeekDays from './components/weekDays';
import { ScheduleEnd } from './components/scheduleEnd';
import moment from 'moment';
import NativePicker from '../../common/dropdownComponents/nativePicker';
import NativeTimePicker from '../../common/dropdownComponents/nativeTimePicker';
import { timeData } from './components/data/timeData';
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';

const perData = ["Person", "Group"]
const repeatData = ["day", "week", "month", "year"]

var monthlyPay = [
    { label: 'Yes', value: "Yes" },
    { label: 'No', value: "No" },
];
var RepeatRadio = [
    { label: 'Yes', value: "Yes" },
    { label: 'No', value: "No" },
];

const updateSchedulePrice = (props) => {
    const scheduleDetail = props.route.params.data;
    let recordId = props.route.params.recordId
    const dispatch = useDispatch();
    const loader = useSelector(state => state.loader.loader)
    const token = useSelector(state => state.user.token)

    const [serviceName, setServiceName] = useState(scheduleDetail.name)
    const [startDate, setStartDate] = useState(new Date(scheduleDetail.duration.start))
    const [endDate, setEndDate] = useState(new Date(scheduleDetail.duration.end))
    const [startTime, setStartTime] = useState(new Date(scheduleDetail.duration.start))
    const [endTime, setEndTime] = useState(new Date(scheduleDetail.duration.end))

    const [repeatRadio, setRepeatRadio] = useState(scheduleDetail.repeat.isRepeat ? "Yes" : "No")
    const [repeatEvery, setRepeatEvery] = useState(scheduleDetail.repeat.isRepeat ? scheduleDetail.repeat.repeatEvery.count + "" : '')
    const [repeatType, setRepeatType] = useState(scheduleDetail.repeat.isRepeat ? scheduleDetail.repeat.repeatEvery.period : '')
    const [repeatOn, setRepeatOn] = useState([])
    const [end, setEnd] = useState("Never")
    const [accpetingBookingUntil, setAccpetingBookingUntil] = useState(new Date())
    const [quantity, setQuantity] = useState(scheduleDetail.pricing.quantity + "")
    const [price, setPrice] = useState(scheduleDetail.pricing.price + "")
    const [pricePer, setPricePer] = useState(scheduleDetail.pricing.per)
    const [monthlyPayment, setMonthlyPay] = useState("No")

    // const [quantitynd, set2ndQuantity] = useState('')
    // const [discPrice, setDiscPrice] = useState('')



    useEffect(() => {
        setRepeat()
        return () => {

        }
    }, [])

    const setRepeat = () => {
        let repeatDays = scheduleDetail.repeat.repeatsOn
        let weekDays = ["sunday", "monday", "tuesday", "wednesday", "thrusday", "friday", "saturday"]
        let result = []
        weekDays.forEach((item, index) => {
            if (repeatDays.includes(item)) {
                result.push(index)
            }
        });
        setRepeatOn(result)
    }

    const getServiceName = value => {
        setServiceName(value)
    };

    const getStartDate = value => {
        setStartDate(value);
    };

    const getEndDate = value => {
        const x = new Date(startDate).setHours(0, 0, 0, 0);
        const y = new Date(value).setHours(0, 0, 0, 0);
        if (y < x) {
            showMessage("End date should not less than start date", 'warning')
        } else {
            setEndDate(value);
        }
    };

    const getStartTime = (value) => {
        setStartTime(value)
    }

    const getEndTime = (value) => {
        setEndTime(value)
    }

    const getAccpetingBookingUntil = (value) => {
        let compareDate = new Date(value).setHours(0, 0, 0, 0);
        let SDate = new Date(startDate).setHours(0, 0, 0, 0);
        let EDate = new Date(endDate).setHours(0, 0, 0, 0);
        if (compareDate <= EDate && compareDate >= SDate) {
            setAccpetingBookingUntil(value);
        } else {
            showMessage("Accpeting booking until should be between start and end date", 'warning')
        }
    };

    const getDays = (value) => {
        setRepeatOn(value)
    }

    const getEnd = value => {
        setEnd(value);
    };

    const getPerPerson = value => {
        setPricePer(value);
    };
    const getRepeatType = value => {
        setRepeatType(value);
    };

    const updateClick = () => {
        const ss = new Date(startDate).setHours(0, 0, 0, 0);
        const se = new Date(endDate).setHours(0, 0, 0, 0);
        const seu = new Date(accpetingBookingUntil).setHours(0, 0, 0, 0);
        const ends = new Date(end).setHours(0, 0, 0, 0);
        if (serviceName == '') {
            showMessage('Schedule title field should not be blank', 'warning');
        } else if (se < ss) {
            showMessage("End date should not be smaller then start date", 'warning')
        } else if (seu < ss || seu > se) {
            showMessage("Accepting bookings until date should between start and end date", 'warning')
        } else if (repeatRadio == 'Yes' && (ends < ss || ends > se)) {
            showMessage("Repeat ends date should between start and end date", 'warning')
        } else if (quantity == '') {
            showMessage('Pricing quantity field should not be blank', 'warning');
        } else if (price == '') {
            showMessage('Price field should not be blank', 'warning');
        } else if (pricePer == '') {
            showMessage('Should select pricing per type', 'warning');
        } else {
            let weekDays = ["sunday", "monday", "tuesday", "wednesday", "thrusday", "friday", "saturday"]
            let result = weekDays.filter((item, index) => repeatOn.includes(index));
            const Sdate = moment(startDate).format("YYYY-MM-DD");
            const Edate = moment(endDate).format("YYYY-MM-DD");
            const Stime = moment(startTime).format("HH:mm:ss");
            const Etime = moment(endTime).format("HH:mm:ss");

            const startDateTime = moment(`${Sdate} ${Stime}`, 'YYYY-MM-DD HH:mm:ss').format();
            const EndDateTime = moment(`${Edate} ${Etime}`, 'YYYY-MM-DD HH:mm:ss').format();
            dispatch(setLoader(true))
            let data = {
                "name": serviceName,
                "start": startDateTime,
                "end": EndDateTime,
                "isRepeat": repeatRadio == "No" ? false : true,
                "repeatCount": parseInt(repeatEvery),
                "repeatType": repeatType,
                "repeatsOn": result,
                "stopBooking": moment(accpetingBookingUntil).format(''),
                "quantity": parseInt(quantity),
                "price": parseInt(price),
                "per": pricePer
            }
            dispatch(updateSchedule(token, recordId, scheduleDetail._id, data, props.navigation, 1))
        }
    }



    return (
        <SafeAreaView style={styles.container} >
            <Header navigation={props.navigation} label="Update Schedule" />
            <ScrollView contentContainerStyle={{ width: wp('100'), alignItems: 'center', paddingBottom: 20 }} >
                <View style={styles.subContainer} >
                    <CustomInputField value={serviceName} label="Schedule Title" subLabel="Add a Sub Title or Name for this Schedule, (examples: Beginners Class, Practice Schedule, or Morning Camp)" getValue={getServiceName.bind(this)} />
                    <View style={{ width: wp('80'), marginTop: 12 }} >
                        <Text style={styles.labelStyle} >Start date</Text>
                        <Text style={[styles.subHeading1, { fontSize: wp('3') }]} >This is the date that your service starts</Text>
                        <CustomDatePicker value={startDate} getValue={getStartDate.bind(this)} />
                    </View>
                    <View style={{ width: wp('80'), marginTop: 12 }} >
                        <Text style={styles.labelStyle} >End date</Text>
                        <Text style={[styles.subHeading1, { fontSize: wp('3') }]} >This is the date that your service ends</Text>
                        <CustomDatePicker value={endDate} getValue={getEndDate.bind(this)} />
                    </View>
                    <View style={{ width: wp('80'), marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                        <View>
                            <Text style={[styles.labelStyle, { width: wp('37.5') }]} >Start time</Text>
                            <NativeTimePicker placeHolder={moment(startTime).format('hh:mm A')} data={timeData} value={startTime} getValue={getStartTime.bind(this)} size={"37.5"} />
                        </View>
                        <View>
                            <Text style={[styles.labelStyle, { width: wp('37.5') }]} >End time</Text>
                            <NativeTimePicker placeHolder={moment(endTime).format('hh:mm A')} data={timeData} value={endTime} getValue={getEndTime.bind(this)} size={"37.5"} />
                        </View>
                    </View>


                    <View style={{ width: wp('80'), marginTop: 12 }} >
                        <Text style={styles.labelStyle} >Repeat</Text>
                        <RadioForm
                            radio_props={RepeatRadio}
                            initial={repeatRadio == "Yes" ? 0 : 1}
                            onPress={(value) => { setRepeatRadio(value) }}
                            buttonColor={'#15488F26'}
                            selectedButtonColor={"#21D17F"}
                            buttonSize={7}
                            labelStyle={styles.greyReg}
                            formHorizontal
                        />
                    </View>
                    {
                        repeatRadio == "No"
                            ?
                            null
                            :
                            <>
                                <View style={{ width: wp('80'), marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                                    <View>
                                        <Text style={[styles.labelStyle, { width: wp('37.5') }]} >Repeats every</Text>
                                        <TextInput
                                            style={{ width: wp('37.5'), height: 46, color: '#707070', fontSize: wp('3.3'), fontFamily: FONTS.SFRegular, backgroundColor: '#FFFFFF', borderRadius: 4, borderColor: '#70707026', borderWidth: 1, textAlign: 'center' }}
                                            placeholder="1"
                                            onChangeText={(value) => { setRepeatEvery(value) }}
                                            value={repeatEvery}
                                            keyboardType="numeric"
                                        />
                                    </View>

                                    <View>
                                        <Text style={[styles.labelStyle, { width: wp('37.5') }]} ></Text>
                                        <NativePicker placeHolder={repeatType} data={repeatData} getValue={getRepeatType.bind(this)} size={"37.5"} />
                                    </View>
                                </View>
                                <WeekDays days={repeatOn} getValue={getDays.bind(this)} />
                                <View style={{ height: 12 }} />
                                <Text style={styles.labelStyle} >End</Text>
                                <ScheduleEnd name={end} getValue={getEnd.bind(this)} start={startDate} end={endDate} />
                            </>
                    }

                    <View style={{ width: wp('80'), marginTop: 12 }} >
                        <Text style={styles.labelStyle} >Accepting Bookings Until</Text>
                        <Text style={[styles.subHeading1, { fontSize: wp('3') }]} >This is the date that you can stop accepting bookings</Text>
                        <CustomDatePicker value={accpetingBookingUntil} getValue={getAccpetingBookingUntil.bind(this)} />
                    </View>
                    <View style={{ width: wp('80'), marginTop: 12 }} >
                        <Text style={styles.labelStyle} >Pricing</Text>
                        <Text style={[styles.subHeading1, { fontSize: wp('3') }]} >Set the pricing for this Schedule</Text>
                    </View>
                    <View style={{ width: wp('80'), marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                        <View>
                            <Text style={[styles.labelStyle, { width: wp('20') }]} >Quantity</Text>
                            <TextInput
                                style={{ width: wp('20'), height: 46, color: '#707070', fontSize: wp('3.3'), fontFamily: FONTS.SFRegular, backgroundColor: '#FFFFFF', borderRadius: 4, borderColor: '#70707026', borderWidth: 1, textAlign: 'center' }}
                                placeholder="1"
                                onChangeText={(value) => { setQuantity(value) }}
                                value={quantity}
                                keyboardType="numeric"
                            />
                        </View>

                        <View>
                            <Text style={[styles.labelStyle, { width: wp('25') }]} >Price</Text>
                            <TextInput
                                style={{ width: wp('25'), height: 46, color: '#707070', fontSize: wp('3.3'), fontFamily: FONTS.SFRegular, backgroundColor: '#FFFFFF', borderRadius: 4, borderColor: '#70707026', borderWidth: 1, textAlign: 'center' }}
                                placeholder="$ 100.00"
                                onChangeText={(value) => { setPrice(value) }}
                                value={price}
                                keyboardType="numeric"
                            />
                        </View>

                        <View>
                            <Text style={[styles.labelStyle, { width: wp('30') }]} >Per</Text>
                            <NativePicker placeHolder={pricePer} data={perData} value={pricePer} getValue={getPerPerson.bind(this)} size={"30"} />
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

                    {/* <View style={{ width: wp('80'), marginTop: 12 }} >
                        <Text style={styles.labelStyle} >Can the User make monthly payments for this service?</Text>
                        <Text style={[styles.subHeading1, { fontSize: wp('3') }]} >Please check here if the User has the option to make monthly payments, instead of making one payment in full</Text>
                        <RadioForm
                            radio_props={monthlyPay}
                            initial={1}
                            onPress={(value) => { setMonthlyPay(value) }}
                            buttonColor={'#15488F26'}
                            selectedButtonColor={"#21D17F"}
                            buttonSize={7}
                            labelStyle={styles.greyReg}
                            formHorizontal
                        />
                    </View>
                    <View style={styles.recieptContainer}>
                        <View style={styles.paymentDetailRow}>
                            <Text style={styles.paymentLabel}  >Users monthly payment:</Text>
                            <Text style={styles.paymentAmount} >$100</Text>
                        </View>
                        <View style={styles.paymentDetailRow}>
                            <Text style={styles.paymentLabel}  >Number of months:</Text>
                            <Text style={styles.paymentAmount} >12</Text>
                        </View>
                        <View style={{ width: wp('70'), height: 0.4, backgroundColor: '#000000', marginTop: 12 }} />
                        <View style={styles.paymentDetailRow}>
                            <Text style={[styles.paymentLabel, { fontFamily: FONTS.SFSemiBold }]}  >Total Payment:</Text>
                            <Text style={styles.paymentAmount} >$1200</Text>
                        </View>
                        <View style={{ height: 16 }} />
                    </View> */}

                    <View style={{ height: 40 }} />
                    <Btn label="Update" onClick={() => updateClick()} bgColor="#2C99C6" />
                </View>
            </ScrollView>
            {
                loader
                    ?
                    <TNIndicator />
                    :
                    null
            }
        </SafeAreaView>
    )
}

export default updateSchedulePrice

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
        alignItems: 'center'
    },
    subContainer: {
        width: wp('80%'),
        alignItems: 'center'
    },
    headingStyle: {
        width: wp('80'),
        color: '#000000',
        fontSize: wp("6.5"),
        fontFamily: FONTS.SFBold,
        marginTop: Platform.OS == "android" ? 18 : 28,
    },
    subHeading: {
        width: wp('80'),
        color: '#707070',
        fontSize: wp("4"),
        fontFamily: FONTS.SFRegular,
        marginTop: 8,
        marginBottom: Platform.OS == "android" ? 8 : 8
    },
    subHeading1: {
        width: wp('80'),
        color: '#707070',
        fontSize: wp("4"),
        fontFamily: FONTS.SFRegular,
        marginBottom: Platform.OS == "android" ? 8 : 8
    },
    h3: {
        width: wp('80'),
        fontFamily: FONTS.SFSemiBold,
        fontSize: wp('3.5'),
        color: '#000000',
        marginTop: Platform.OS == "android" ? 18 : 28,
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
        color: '#3D3D3D'
    },
    addAccountContainer: {
        width: wp('80%'),
        height: 200,
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        paddingBottom: 12
    },
    wrapper: {
    },
    buttonText: {
        color: 'white',
        fontSize: 80,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
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
        margin: 2
    },
    inActiveScroll: {
        width: 8,
        height: 8,
        backgroundColor: '#2C99C6',
        opacity: 0.18,
        borderRadius: 7,
        margin: 2
    },
    photoTitle: {
        color: '#000000',
        fontSize: wp("4.5"),
        fontFamily: FONTS.SFBold,
        marginTop: 4
    },
    btnRow: {
        width: wp('80'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16
    },
    fillBtn: {
        width: 84,
        height: 32,
        backgroundColor: '#2C99C6',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    borderBtn: {
        width: 84,
        height: 32,
        borderColor: '#2C99C6',
        borderRadius: 4,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelStyle: {
        width: '100%',
        color: '#000000',
        fontSize: wp('4'),
        fontFamily: FONTS.SFSemiBold,
        marginBottom: 6
    },
    paymentDetailRow: {
        width: wp('70'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12
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
        alignItems: 'center'
    },
    greyReg: {
        width: 45,
        color: '#707070',
        fontFamily: FONTS.SFRegular,
        fontSize: 12,
        marginTop: -3
    },

})
