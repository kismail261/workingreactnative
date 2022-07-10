import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, Platform } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FONTS, Url } from '../../../constant'
import Header from '../components/header'
import Btn from '../../../common/meduimBtnSP'
import CustomInputField from '../components/customInputField'
import CustomPhonePicker from '../components/customPhonePicker'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../../redux/loader/loader.action'
import TNIndicator from '../../../common/TNIndicator'
import axios from 'axios'
import { getUserDetail } from '../../../redux/user/user.action'
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks'


const editOrganizationIinfo = (props) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const userDetail = useSelector(state => state.user.userDetail);
    const loader = useSelector(state => state.loader.loader)
    const token = useSelector(state => state.user.token)
    const [firstName, setFirstName] = useState(userDetail.organizationInfo.orgName)
    const [email, setEmail] = useState(currentUser.email)
    const [phone, setPhone] = useState(userDetail.organizationInfo.phone.substr(3, 13))
    const [code, setCode] = useState('')
    const [progress, setProgress] = useState(0.1)

    useEffect(() => {
        setTimeout(() => {
            setProgress(0.2)
        }, 100);
        return () => {
        }
    }, [])

    const getFullName = (value) => {
        setFirstName(value)
    }
    const getEmail = (value) => {
        setEmail(value)
    }
    const getPhone = (value) => {
        setPhone(value)
    }
    const getCode = (value) => {
        setCode(value)
    }

    const updateData = async () => {
        try {
            if (firstName == '') {
                showMessage("Organization name field should not be blank");
            } else if (code == '') {
                showMessage("Select country code");
            }
            else if (phone.length != 10) {
                showMessage("Phone number should be 10 digit");
            } else {
                dispatch(setLoader(true))
                let headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
                let data = {
                    "isOrganization": true,
                    "name": firstName,
                    "phone": "+" + code + phone,
                }
                axios.post(`https://api2.sporforya.com/api/users/organization-info`, data, { headers: headers })
                    .then(resp => {
                        let response = resp.data
                        resendCode()
                        dispatch(setLoader(false))
                        props.navigation.navigate('confirmEditPhoneOrg', { phoneNo: code + phone });
                        dispatch(getUserDetail(currentUser._id))
                    })
                    .catch(error => {
                        const err = error
                        if (err.response) {
                            showMessage(err.response.data.message)
                        }
                        dispatch(setLoader(false))
                    });
            }
        } catch (error) {
            console.error(error);
            dispatch(setLoader(false))
        }
    };

    const resendCode = () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        let data = {
            "phone": code + phone
        }
        axios.post(`${Url}api/users/resend-verification`, data, { headers: headers })
            .then(resp => {
                let response = resp.data
            })
            .catch(error => {
                const err = error
                if (err.response) {
                    showMessage(err.response.data.message)
                }
                console.log("err resendCode: ", err.response.data.message)
            });
    }

    return (
        <View style={styles.container} >
            <Header navigation={props.navigation} label="Profile information" progressCount={progress} />
            <ScrollView contentContainerStyle={{ width: wp('100'), alignItems: 'center' }} >
                <View style={{ alignItems: 'center', marginTop: Platform.OS == "android" ? 20 : 35 }} >
                    <Text style={styles.headingStyle} >Organization information</Text>
                    <Text style={styles.subheadingStyle} >Tell us about yourself to set up your profile.</Text>
                </View>
                <View style={{ height: 20 }} />
                <CustomInputField label="Organization name" value={firstName} getValue={getFullName.bind(this)} />
                <CustomInputField edit={false} label="Email address" value={email} getValue={getEmail.bind(this)} />
                <CustomPhonePicker label="Phone Number" value={phone} getValue={getPhone.bind(this)} getCountryCode={getCode.bind(this)} />

                <View style={{ height: 50 }} />
                <Btn label="Update & Next" onClick={updateData} bgColor="#2C99C6" />
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
    )
}

export default editOrganizationIinfo

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
    }
})
