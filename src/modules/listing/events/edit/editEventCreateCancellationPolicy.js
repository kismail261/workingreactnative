import React, { useState, useEffect, } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../../constant'
import Header from '../../components/header'
import Btn from '../../../../common/meduimBtnSP'
import CustomInputField from '../../../profileSetup/components/customInputField'
import { MyTextinputMultiline } from '../../../../common/textinputMultiline'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../../../redux/loader/loader.action'
import TNIndicator from '../../../../common/TNIndicator'
import { addPolicy } from '../../../../redux/listing/listing.action'
import { showMessage } from '../../../../helpers/replaceDigitsWithAesteriks'


const editServiceCreateCancellationPolicy = (props) => {
    let recordId = props.route.params.recordId
    const dispatch = useDispatch();
    const loader = useSelector(state => state.loader.loader)
    const token = useSelector(state => state.user.token)
    const [progress, setProgress] = useState(0.6)
    const [days, setDays] = useState('')
    const [detail, setDetail] = useState('')


    useEffect(() => {
        setTimeout(() => {
            setProgress(0.8)
        }, 100);
        return () => {

        }
    }, [])

    const getDays = value => {
        setDays(value)
    };
    const getDetail = value => {
        setDetail(value)
    };

    const savePolicy = () => {
        if (days == '') {
            showMessage("Days field should not be blank")
        } else if (detail == '') {
            showMessage("Detail field should not be blank")
        } else {
            dispatch(setLoader(true))
            let data = {
                "numberOfDays": days,
                "description": detail
            }
            dispatch(addPolicy(token, recordId, data, props.navigation, 2))
            props.navigation.navigate("cancellationPolicy", { recordId: recordId })
        }
    }



    return (
        <View style={styles.container} >
            <Header navigation={props.navigation} label="Service" progressCount={progress} />
            <ScrollView contentContainerStyle={{ width: wp('100'), alignItems: 'center', paddingBottom: 20 }} >

                <View style={styles.subContainer} >
                    <Text style={styles.headingStyle} >Create your own Cancellation Policy</Text>
                    <Text style={styles.subHeading} >Enter the number of days that works best for your Cancellation Policy</Text>

                    <CustomInputField value={days} label="Number of days" getValue={getDays.bind(this)} />

                    <View style={{ width: wp('80'), alignItems: 'center', marginTop: 16 }} >
                        <MyTextinputMultiline
                            styles={{ width: wp('80'), height: 92, marginTop: 5 }}
                            placeholderTextColor={styles.placeholderStyle}
                            placeholder="Enter detail"
                            value={detail}
                            onChangeText={getDetail.bind(this)}
                        />
                    </View>

                    <View style={{ height: 40 }} />
                    <Btn label="Done" onClick={() => savePolicy()} bgColor="#2C99C6" />

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

export default editServiceCreateCancellationPolicy

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
    skipBtn: {
        color: 'rgba(44, 153, 198, 1)',
        fontSize: wp('3.5'),
        fontFamily: FONTS.SFMedium,
    },

})
