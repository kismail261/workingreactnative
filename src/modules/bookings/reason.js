import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TextInput } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS, ImageUrl } from '../../constant'
import Header from './components/header'
import LargeBtn from '../../common/largeBtnSP'
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks'

const reason = (props) => {
    const detail = props.route.params.detail
    const [reason, setReason] = useState('')

    useEffect(() => {
        return () => {

        }
    }, [])


    const cancelNowClick = () => {
        if (reason == '') {
            showMessage("Reason field should not be blank", 'warning')
        } else {
            let data = {
                bookingIds: [detail._id],
                userIds: [detail.userId],
                cancelReason: reason,
                "status": 'approve'
            }
            props.navigation.navigate("amountPayable", { detail: detail, apiData: data })
        }
    }



    return (
        <View style={styles.container} >
            <Header navigation={props.navigation} label="Reason" />
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ width: wp('90'), alignItems: 'center' }}>
                    <Text style={styles.headingStyle} >Reason for cancellation</Text>
                    <Text style={styles.detail} >Please share with us the reason for cancellation, so we can communicate the same with user</Text>
                    <Text style={styles.cancelFor} >Cancelling Booking for</Text>
                    <View style={styles.userDetailContainer} >
                        <Image source={detail.provider.Profile.avatar != undefined ? { uri: ImageUrl + detail.provider.Profile.avatar } : ICONS.userIcon} style={{ width: 20, height: 20, borderRadius: 10 }} />
                        <Text numberOfLines={1} style={styles.nameStyle} > {detail.provider.Profile.name != undefined ? detail.provider.Profile.name : 'n/a'} </Text>
                    </View>
                    <View style={{ height: 15 }} />
                    <Text style={styles.cancelFor} >Reason</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        style={styles.inputStyle}
                        onChangeText={(value) => setReason(value)}
                        value={reason}
                    />
                    <View style={{ alignSelf: 'center', marginTop: hp('17') }} >
                        <LargeBtn label="Cancel Now" onClick={cancelNowClick} bgColor="#2C99C6" />
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

export default reason

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
        alignItems: 'center'
    },
    headingStyle: {
        width: wp('90'),
        color: "#000000",
        fontSize: wp('7'),
        fontFamily: FONTS.SFSemiBold,
        marginTop: 8
    },
    detail: {
        width: wp('90'),
        color: "#707070",
        fontSize: wp('4'),
        fontFamily: FONTS.SFRegular,
        marginTop: 8
    },
    cancelFor: {
        width: wp('90'),
        color: "#808080",
        fontSize: wp('3.5'),
        fontFamily: FONTS.SFSemiBold,
        marginTop: 20
    },
    userDetailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderWidth: 1,
        borderColor: '#EAEAEA',
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginTop: 6
    },
    nameStyle: {
        color: "#000000",
        fontSize: 10,
        fontFamily: FONTS.SFSemiBold,
    },
    inputStyle: {
        width: wp('90'),
        height: 140,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: 7,
        marginTop: 5,
        textAlignVertical: 'top',
        padding: 7
    }
})
