import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, Platform, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'
import Header from '../components/header'
import Btn from '../../../common/meduimBtnSP'
import CustomInputField from '../components/customInputField'
import CustomPhonePicker from '../components/customPhonePicker'
import { useDispatch, useSelector } from 'react-redux'
import { getLocationsList, saveOrgContactInfo } from '../../../redux/profile/profile.action'
import { setLoader } from '../../../redux/loader/loader.action'
import TNIndicator from '../../../common/TNIndicator'
import ContactInfoItem from '../components/contactInfoItem'
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks'


const editOrganizationContactInfo = (props) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const loader = useSelector(state => state.loader.loader)
    const token = useSelector(state => state.user.token)
    const locationList = useSelector(state => state.profile.locationList)
    const [name, setName] = useState("")
    const [position, setPosition] = useState("")
    const [email, setEmail] = useState(currentUser.email)
    const [phone, setPhone] = useState("")
    const [code, setCode] = useState("")
    const [mediaUrl, setMediaUrl] = useState("")
    const [progress, setProgress] = useState(0.7)

    useEffect(() => {
        setTimeout(() => {
            setProgress(1)
        }, 100);
        dispatch(setLoader(true))
        dispatch(getLocationsList(token))
        return () => {

        }
    }, [])

    const getName = (value) => {
        setName(value)
    }

    const getPosition = (value) => {
        setPosition(value)
    }

    const getPhone = (value) => {
        setPhone(value)
    }
    const getCode = (value) => {
        setCode(value)
    }

    const getMediaUrl = (value) => {
        setMediaUrl(value)
    }

    const getEmail = (value) => {
        setEmail(value)
    }

    const saveContact = () => {
        if (name == '') {
            showMessage("Name field should not be blank");
        } else if (position == '') {
            showMessage("Position field should not be blank");
        } else if (phone.length != 10) {
            showMessage("Phone Number should be 10 digits");
        } else {
            dispatch(setLoader(true))
            let data = {
                "contactInfo": [
                    {
                        "name": name,
                        "phone": '+' + code + phone,
                        "position": position,
                        "email": email,
                        "webSocialUrl": mediaUrl
                    }
                ]
            }
            dispatch(saveOrgContactInfo(data, token, currentUser._id))
            setName('')
            setPhone('')
            setPosition('')
            setMediaUrl('')
        }
    }

    const onDuplicateRecordSave = (contact) => {
        dispatch(setLoader(true))
        let data = {
            "contactInfo": [
                {
                    "name": contact.name,
                    "phone": contact.phone,
                    "position": contact.position + "1",
                    "email": contact.email,
                    "webSocialUrl": contact.webSocialUrl
                }
            ]
        }
        dispatch(saveOrgContactInfo(data, token, currentUser._id))
    }

    const onNextClick = () => {
        if (locationList.organizationInfo.contactInfo.length == 0) {
            showMessage("Please add atleast one contact info")
        } else {
            props.navigation.navigate( "providerHome" )
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
                        <Text style={styles.headingStyle} >Contact information</Text>
                        <Text style={styles.subheadingStyle} >Contact details are required so we can assist and support you when needed. They will not be made public</Text>
                        <View style={{ height: 12 }} />
                        <Text style={styles.subheadingStyle} >You have the option to add multiple contacts for your organization</Text>
                    </View>
                    {
                        locationList.organizationInfo && locationList.organizationInfo.contactInfo.length == 0
                            ?
                            null
                            :
                            <View style={{ maxHeight: hp('30'), paddingBottom: 10 }} >
                                <ScrollView nestedScrollEnabled style={{ width: '100%', }} >
                                    {
                                        locationList.organizationInfo !== undefined && locationList.organizationInfo.contactInfo.map((item, index) => {
                                            return (
                                                <ContactInfoItem key={index} data={item} onDuplicate={onDuplicateRecordSave.bind(this)} navigation={props.navigation} />
                                            )
                                        })
                                    }
                                </ScrollView>
                            </View>
                    }

                    <View style={{ height: 20 }} />
                    <CustomInputField label="Name" value={name} getValue={getName.bind(this)} />
                    <CustomInputField label="Position / Title" value={position} getValue={getPosition.bind(this)} />
                    <CustomPhonePicker label="Phone Number" value={phone} getValue={getPhone.bind(this)} getCountryCode={getCode.bind(this)} />
                    <CustomInputField edit={false} label="Email address" value={email} getValue={getEmail.bind(this)} />
                    <CustomInputField subLabel="Please add URL of your website or social media, If any" label="Website or Social Media" value={mediaUrl} getValue={getMediaUrl.bind(this)} />

                    <View style={{ height: 50 }} />
                    <TouchableOpacity style={styles.btncontainer} onPress={saveContact} >
                        <Image source={ICONS.plusIcon} style={{ width: 14, height: 14 }} />
                        <Text style={styles.btnlabelStyle} >Add another Contact</Text>
                    </TouchableOpacity>
                    <Btn label="Next" onClick={onNextClick} bgColor="#2C99C6" />
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

export default editOrganizationContactInfo

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
        height: Platform.OS == "ios" ? hp('6') : hp('7'),
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
