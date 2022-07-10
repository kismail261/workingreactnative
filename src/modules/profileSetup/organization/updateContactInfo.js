import React, { useState, useEffect } from 'react'
import { ScrollView, SafeAreaView, StyleSheet, View, } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { getAllCountries } from 'react-native-country-picker-modal'
import { FONTS } from '../../../constant'
import Header from '../../../common/headerBLC'
import Btn from '../../../common/meduimBtnSP'
import CustomInputField from '../components/customInputField'
import CustomPhonePicker from '../components/customPhonePickerForUpdate'
import { useDispatch, useSelector } from 'react-redux'
import { updateOrgContactInfo } from '../../../redux/profile/profile.action'
import { setLoader } from '../../../redux/loader/loader.action'
import TNIndicator from '../../../common/TNIndicator'
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks'



const updateContactInfo = (props) => {
    const data = props.route.params.data;
    const dispatch = useDispatch()
    const loader = useSelector(state => state.loader.loader)
    const token = useSelector(state => state.user.token)
    const currentUser = useSelector(state => state.user.currentUser)
    const [name, setName] = useState(data.name)
    const [position, setPosition] = useState(data.position)
    const [email, setEmail] = useState(data.email)
    const [phone, setPhone] = useState('')
    const [code, setCode] = useState("")
    const [flag, setFlag] = useState("US")
    const [mediaUrl, setMediaUrl] = useState(data.webSocialUrl)

    useEffect(() => {
        setIntialFields()
        return () => {
        }
    }, [data])

    const setIntialFields = () => {
        setName(data.name)
        setPosition(data.position)
        setEmail(data.email)
        let tempCode = data.phone.substring(1, data.phone.length - 10)
        let tempPhone = data.phone.substring(data.phone.length - 10, data.phone.length)
        setPhone(tempPhone)
        setMediaUrl(data.webSocialUrl)
        getAllCountries().then((countries) => {
            const country = countries.find((c) => (c.callingCode[0] === tempCode));
            setFlag(country.cca2)
            setCode(country.callingCode[0])
        });
    }

    const getName = (value) => {
        setName(value)
    }

    const getPosition = (value) => {
        setPosition(value)
    }

    const getPhone = (value) => {
        setPhone(value)
    }
    const getCode = (country) => {
        setFlag(country.cca2)
        setCode(country.callingCode[0])
    }

    const getMediaUrl = (value) => {
        setMediaUrl(value)
    }

    const getEmail = (value) => {
        setEmail(value)
    }

    const updateContact = () => {
        if (name == '') {
            showMessage("Name field should not be blank");
        } else if (position == '') {
            showMessage("Position field should not be blank");
        } else if (phone == '') {
            showMessage("Phone number field should not be blank");
        } else if (phone.length != 10) {
            showMessage("Phone number should be 10 digits");
        } else if (code == '') {
            showMessage("Please select calling code");
        } else {
            dispatch(setLoader(true))
            let dataTemp = {
                "contactId": data._id,
                "name": name,
                "phone": '+' + code + phone,
                "position": position,
                "email": email,
                "webSocialUrl": mediaUrl
            }
            dispatch(updateOrgContactInfo(dataTemp, token, data._id, props.navigation, currentUser._id ))
        }
    }


    return (
        <SafeAreaView style={styles.container} >
            <Header navigation={props.navigation} label="Update Contact" />
            <ScrollView contentContainerStyle={{ width: wp('100'), alignItems: 'center' }} >
                <View style={{ height: 20 }} />
                <CustomInputField label="Name" value={name} getValue={getName.bind(this)} />
                <CustomInputField label="Position / Title" value={position} getValue={getPosition.bind(this)} />
                <CustomPhonePicker flag={flag} label="Phone Number" value={phone} getValue={getPhone.bind(this)} getCountryCode={getCode.bind(this)} />
                {/* <CustomPhonePicker label="Phone Number" value={phone} getValue={getPhone.bind(this)} getCountryCode={getCode.bind(this)} /> */}
                <CustomInputField edit={false} label="Email address" value={email} getValue={getEmail.bind(this)} />
                <CustomInputField subLabel="Please add URL of your website or social media, If any" label="Website or Social Media" value={mediaUrl} getValue={getMediaUrl.bind(this)} />

                <View style={{ height: 50 }} />

                <Btn label="Update" onClick={updateContact} bgColor="#2C99C6" />
                <View style={{ height: 20 }} />
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

export default updateContactInfo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
        alignItems: 'center'
    },
    headingStyle: {
        width: wp('80'),
        color: '#000000',
        fontSize: wp('6'),
        fontFamily: FONTS.SFSemiBold
    },
    subheadingStyle: {
        width: wp('80'),
        color: '#707070',
        fontSize: wp('3'),
        fontFamily: FONTS.SFMedium,
        marginTop: 6
    },
    optionContainer: {
        width: wp('80'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btncontainer: {
        width: wp('80'),
        height: hp('7'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#61B2D4',
        marginBottom: 8,
        backgroundColor: '#FFFFFF'
    },
    btnlabelStyle: {
        color: "#61B2D4",
        fontSize: wp('3'),
        fontFamily: FONTS.SFBold,
        marginLeft: 7
    }
})
