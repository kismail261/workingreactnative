import React, { useState, useEffect, } from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'
import Header from '../components/header'
import Btn from '../../../common/meduimBtnSP'
import NativePicker from '../../../common/dropdownComponents/nativeNumberPicker';
import { useDispatch, useSelector } from 'react-redux'
import { addServiceParticulars } from '../../../redux/listing/listing.action'
import { setLoader } from '../../../redux/loader/loader.action';
import TNIndicator from '../../../common/TNIndicator'
import { SuitabelForData } from '../components/data/suitableFor'
import { AbilityLevelData } from '../components/data/abilityLevel'
import { GoodForData } from '../components/data/goodFor'
import { DropDownSingle } from '../../../common/dropdownComponents/dropDownSingle';
import CustomTitleDropdown from '../../../common/customTitleDropdown';
import { Dropdown } from '../../../common/dropDown';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks'

const ageData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85]


const addParticulars = (props) => {

    let recordId = props.route.params.recordId
    const dispatch = useDispatch();
    const loader = useSelector(state => state.loader.loader)
    const token = useSelector(state => state.user.token)

    const [progress, setProgress] = useState(0.1)
    const [fromDate, setFromDate] = useState(0)
    const [toDate, setToDate] = useState(0)
    const [gender, setGender] = useState('Select')
    const [selectSuitable, setSuitable] = useState("Select")
    const [selectAbilityLevel, setAbilityLevel] = useState("Select")
    const [selectGoodFor, setGoodFor] = useState([])

    useEffect(() => {
        setTimeout(() => {
            setProgress(0.3)
        }, 100);
        return () => {

        }
    }, [])

    const getGoodFor = selectedItems => {
        setGoodFor(selectedItems)
    };
    const getSuitable = selectedItems => {
        setSuitable(selectedItems)
    };
    const getAbility = selectedItems => {
        setAbilityLevel(selectedItems)
    };

    const getFromDate = (value) => {
        setFromDate(value)
    }

    const getToDate = (value) => {
        if (fromDate > value) {
            showMessage("Age To value should be greater than Age From", 'warning');
            setToDate(value);
        } else {
            setToDate(value);
        }
    }

    const uploadServiceParticulars = () => {
        if (gender == 'Select') {
            showMessage("Should select gender", 'warning')
        } else if (fromDate == 0) {
            showMessage("Should select Age From", 'warning')
        } else if (toDate == 0) {
            showMessage("Should select Age To", 'warning')
        } else if (fromDate > toDate) {
            showMessage("Age To value should be greater than Age From", 'warning');
        } else if (selectSuitable == "Select") {
            showMessage("Should select suitable for", 'warning')
        } else if (selectAbilityLevel == "Select") {
            showMessage("Should select ability level", 'warning')
        } else if (selectGoodFor.length == 0) {
            showMessage("Should select Good for", 'warning')
        } else {
            dispatch(setLoader(true))
            let data = {
                "gender": gender,
                "age": {
                    "from": fromDate + "",
                    "to": toDate + ""
                },
                "suitable": selectSuitable,
                "abilityLevel": selectAbilityLevel,
                "goodfor": selectGoodFor
            }
            dispatch(addServiceParticulars(token, recordId, data, props.navigation, 2))
        }
    }


    return (
        <View style={styles.container} >
            <Header navigation={props.navigation} label="Event" progressCount={progress} />
            <ScrollView contentContainerStyle={{ width: wp('100'), alignItems: 'center', paddingBottom: 20 }} >
                <View style={styles.subContainer} >
                    <Text style={styles.headingStyle} >Participant Particulars</Text>
                    <Text style={styles.subHeading} >Add some particulars to describe who the event is most suited to, and help Users choose what's best for them</Text>
                    <View>
                        <Text style={[styles.labelStyle, { width: wp('80') }]} >Gender</Text>
                        <View style={{ width: wp('80'), marginTop: 0 }}>
                            <Dropdown
                                name={gender}
                                data={['Male', 'Female','Others','All']}
                                getValue={setGender.bind(this)}
                            />
                        </View>
                    </View>
                    <View style={{ width: wp('80'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ width: wp('37.5'), marginTop: 12 }} >
                            <Text style={styles.labelStyle} >Age</Text>
                            <NativePicker placeHolder="0" data={ageData} value={fromDate} getValue={getFromDate.bind(this)} size={"37.5"} type="From:" />
                        </View>
                        <View style={{ width: wp('37.5'), marginTop: 12 }} >
                            <Text style={styles.labelStyle} ></Text>
                            <NativePicker placeHolder="0" data={ageData} value={toDate} getValue={getToDate.bind(this)} size={"37.5"} type="To:" />
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
                    <CustomTitleDropdown item={GoodForData} value={selectGoodFor} label="Good for" placeHolder="Select" getValue={getGoodFor.bind(this)} />
                    <View style={{ height: 40 }} />
                    <Btn label="Continue" onClick={() => uploadServiceParticulars()} bgColor="#2C99C6" />
                </View>
            </ScrollView>
            {
                loader
                    ?
                    <TNIndicator />
                    :
                    null
            }
        </View>
    )
}

export default addParticulars

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
        marginBottom: Platform.OS == "android" ? 18 : 28
    },
    labelStyle: {
        width: '100%',
        color: '#000000',
        fontSize: wp('4'),
        fontFamily: FONTS.SFSemiBold,
        marginBottom: 6
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

})
