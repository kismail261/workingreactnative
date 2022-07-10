import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TextInput, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS } from '../../../../constant'
import LargeBtn from '../../../../common/largeBtnSP'
import { useDispatch, useSelector } from 'react-redux'
import { cancelBooking } from '../../../../redux/booking/booking.action'
import { setLoader } from '../../../../redux/loader/loader.action'


const amountPayable = (props) => {
    const detail = props.detail
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser)
    const token = useSelector(state => state.user.token)
    const loader = useSelector(state => state.loader.loader)
    let charges = ((2 / 100) * detail.totalPrice)

    useEffect(() => {
        return () => {
        }
    }, [])

    const onCancelClick = () => {
        dispatch(setLoader(true))
        let data = {
            "userId": currentUser._id,
            "bookingId": detail._id
        }
        // props.navigation.navigate("cancelBookingNotifier", { detail: detail })
        dispatch(cancelBooking(token, data, props.navigation, detail))
    }


    return (
        <View style={styles.container} >
            <View style={{ width: wp('90'), alignItems: 'center' }}>
                <Text style={styles.headingStyle} >Price Details</Text>
                <View style={{ height: 5 }} />
                <View style={styles.paymentDetail}>
                    <View style={{ width: wp('80'), alignItems: 'center' }}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#000000', fontSize: wp('3.2'), fontFamily: FONTS.SFRegular, width: '80%', }} >Price ({detail.listing.schedules[0].pricing.quantity} {detail.listing.schedules[0].pricing.per})</Text>
                            <Text style={{ color: '#000000', fontSize: wp('3.2'), fontFamily: FONTS.SFRegular, }} >${detail.totalPrice}</Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#000000', fontSize: wp('3.2'), fontFamily: FONTS.SFRegular, width: '80%', }} >Discount</Text>
                            <Text style={{ color: '#000000', fontSize: wp('3.2'), fontFamily: FONTS.SFRegular, }} >$0</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#000000', fontSize: wp('3.2'), fontFamily: FONTS.SFBold, width: '80%', }} >Total (USD)</Text>
                        <Text style={{ color: '#000000', fontSize: wp('3.2'), fontFamily: FONTS.SFBold, }} >${detail.totalPrice}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#000000', fontSize: wp('3.2'), fontFamily: FONTS.SFRegular, width: '80%', }} >Cancellation Charge(2%)</Text>
                        <Text style={{ color: '#000000', fontSize: wp('3.2'), fontFamily: FONTS.SFRegular, }} >-${charges}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#000000', fontSize: wp('3.2'), fontFamily: FONTS.SFBold, width: '80%', }} >Amount you will get back</Text>
                        <Text style={{ color: '#000000', fontSize: wp('3.2'), fontFamily: FONTS.SFBold, }} >${detail.totalPrice - charges}</Text>
                    </View>
                </View>
            </View>
            <View style={{ height: 30 }} />
            {
                loader
                    ?
                    <ActivityIndicator size={"small"} color={"#000000"} />
                    :
                    <>
                        {
                            props.btnShow
                                ?
                                <LargeBtn label="Cancel Booking" onClick={onCancelClick} bgColor="#2C99C6" />
                                :
                                null
                        }
                    </>
            }
            <View style={{ height: 15 }} />
        </View>
    )
}

export default amountPayable

const styles = StyleSheet.create({
    container: {
        width: wp('85%'),
        backgroundColor: '#F8FAFF',
        alignItems: 'center',
        marginTop: 20
    },
    headingStyle: {
        width: wp('85'),
        color: "#000000",
        fontSize: wp('4.5'),
        fontFamily: FONTS.SFSemiBold,
        marginTop: 8
    },
    detail: {
        width: wp('85'),
        color: "#707070",
        fontSize: wp('4'),
        fontFamily: FONTS.SFRegular,
        marginTop: 8
    },

    paymentDetail: {
        width: wp('85'),
        backgroundColor: '#D7F0FD',
        alignItems: 'center',
        padding: 8,
        borderRadius: 4,
        marginTop: 6
    },
    nameStyle: {
        color: "#000000",
        fontSize: 10,
        fontFamily: FONTS.SFSemiBold,
    },
    inputStyle: {
        width: wp('85'),
        height: 140,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: 7,
        marginTop: 5
    },
    divider: {
        width: wp('80'),
        height: 1,
        backgroundColor: '#70707057',
        marginTop: 14,
        marginBottom: 14
    }
})
