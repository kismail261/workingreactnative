import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, Platform, KeyboardAvoidingView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux'
import { saveLocationInfo } from '../../redux/profile/profile.action'
import { setLoader } from '../../redux/loader/loader.action'
import TNIndicator from '../../common/TNIndicator'
import { FONTS } from '../../constant'
import Header from './components/header'
import Btn from '../../common/meduimBtnSP'
import CustomInputField from './components/customInputField'
import CustomInputNumberPad from './components/customInputFieldNumberPaid'
import CountryPicker from 'react-native-country-picker-modal'
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks'

const locationInfo = (props) => {
    const dispatch = useDispatch()
    const loader = useSelector(state => state.loader.loader)
    const token = useSelector(state => state.user.token)
    const currentUser = useSelector(state => state.user.currentUser)
    const [address, setAddress] = useState("")
    const [apartment, setApartment] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [postCode, setPostCode] = useState("")
    const [progress, setProgress] = useState(0.5)

    useEffect(() => {
        setTimeout(() => {
            setProgress(0.7)
        }, 100);
        return () => {

        }
    }, [])

    const getAddress = (value) => {
        setAddress(value)
    }
    const getApartment = (value) => {
        setApartment(value)
    }
    const getCity = (value) => {
        setCity(value)
    }
    const getState = (value) => {
        setState(value)
    }
    const getCountry = (value) => {
        setCountry(value)
    }
    const getPostCode = (value) => {
        setPostCode(value)
    }

    const saveLocation = () => {
        if (address == '') {
            showMessage("Address field should not be blank");
        } else if (apartment == '') {
            showMessage("Apartment field should not be blank");
        } else if (city == '') {
            showMessage("City field should not be blank");
        } else if (state == '') {
            showMessage("State field should not be blank");
        } else if (country == '') {
            showMessage("Country field should not be blank");
        } else if (postCode == '') {
            showMessage("Post code field should not be blank");
        } else {
            dispatch(setLoader(true))
            let data = {
                "address": address,
                "appartment": apartment,
                "city": city,
                "state": state,
                "countary": country,
                "postcode": postCode
            }
            dispatch(saveLocationInfo(data, token, props.navigation, currentUser._id))
        }

    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, width: '100%', alignItems: 'center' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
            <View style={styles.container} >
                <Header navigation={props.navigation} label="Profile information" progressCount={progress} />
                <ScrollView contentContainerStyle={{ width: wp('100'), alignItems: 'center' }} >
                    <View style={{ alignItems: 'center', marginTop: Platform.OS == "android" ? 20 : 35 }} >
                        <Text style={styles.headingStyle} >Location information</Text>
                        <Text style={styles.subheadingStyle} >Please tell us where your service is located</Text>
                    </View>
                    <View style={{ height: 20 }} />
                    <CustomInputField label="Address" value={address} getValue={getAddress.bind(this)} />
                    <CustomInputField label="Apartment / Building" value={apartment} getValue={getApartment.bind(this)} />
                    <CustomInputField label="City" value={city} getValue={getCity.bind(this)} />
                    <CustomInputField label="State" value={state} getValue={getState.bind(this)} />
                    <CustomInputField label="Country" value={country} getValue={getCountry.bind(this)} />
                    <CustomInputNumberPad label="Post code" value={postCode} getValue={getPostCode.bind(this)} />
                    <View style={{ height: 50 }} />
                    <Btn label="Next" onClick={() => { saveLocation() }} bgColor="#2C99C6" />
                    <View style={{ height: 20 }} />
                </ScrollView>
                {
                    loader
                        ?
                        <TNIndicator />
                        :
                        null
                }
            </View>
        </KeyboardAvoidingView>
    )
}

export default locationInfo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
        alignItems: 'center'
    },
    headingStyle: {
        width: wp('80'),
        color: '#000000',
        fontSize: wp('6.5'),
        fontFamily: FONTS.SFSemiBold
    },
    subheadingStyle: {
        width: wp('80'),
        color: '#707070',
        fontSize: wp('3.2'),
        fontFamily: FONTS.SFRegular,
        marginTop: 6
    },
    optionContainer: {
        width: wp('80'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})
