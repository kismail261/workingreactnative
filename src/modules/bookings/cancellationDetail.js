import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS } from '../../constant'
import BookingDetail from './components/bookingDetails'
import BookingItem from './components/detailItem'
import Header from './components/header'
import LargeBtn from '../../common/largeBtnSP'
import { cancelBookingProvider } from '../../redux/booking/booking.action'
import { setLoader } from '../../redux/loader/loader.action'
import { useDispatch, useSelector } from 'react-redux'


const cancellationDetail = (props) => {
    const detail = props.route.params.detail
    const listingdDetail = props.route.params.listingdDetail
    const dispatch = useDispatch()
    const loader = useSelector(state => state.loader.loader)
    const token = useSelector(state => state.user.token)

    useEffect(() => {
        return () => {
        }

    }, [])

    const onDenyClick = () => {
        dispatch(setLoader(true))
        let data = {
            "bookingIds": [detail._id],
            "userIds": [detail.userId],
            "cancelReason": "Cancellation requested is not accepted by provider",
            "status": "decline"
        }
        dispatch(cancelBookingProvider(token, data, listingdDetail._id))
        props.navigation.navigate("listBookings", { listingId: listingdDetail._id })
    }



    return (
        <View style={styles.container}>
            <Header navigation={props.navigation} label="Cancellation Detail" />
            <ScrollView>
                <View style={{ alignItems: 'center' }} >
                    <BookingItem detail={listingdDetail} />
                    <BookingDetail detail={detail} />
                </View>
            </ScrollView>
            {
                loader
                    ?
                    <ActivityIndicator size={'small'} color={"#000000"} />
                    :
                    <View style={{ position: 'absolute', alignSelf: 'center', bottom: 30 }} >
                        <LargeBtn label="Approve" bgColor="#2C99C6" onClick={() => props.navigation.navigate("approveCancel", { detail: detail, listingdDetail: listingdDetail })} />
                        <TouchableOpacity onPress={onDenyClick} style={styles.btnStyle} >
                            <Text style={styles.btnText} >Deny</Text>
                        </TouchableOpacity>
                    </View>
            }

        </View>
    )
}

export default cancellationDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F8FAFF'
    },
    tabRow: {
        width: wp('100'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        marginBottom: 12
    },
    tab: {
        width: wp('50'),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#2C99C6',
        borderBottomWidth: 2,
        justifyContent: 'center',
        padding: 8,
        borderBottomColor: '#2C99C6',
        borderBottomWidth: 2
    },
    tabInactibe: {
        width: wp('50'),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#2C99C6',
        borderBottomWidth: 2,
        justifyContent: 'center',
        padding: 8.5,
        borderBottomColor: '#D5D5D5',
        borderBottomWidth: 1,
    },
    activeLabelStyle: {
        color: "#000000",
        fontSize: wp('4.5'),
        fontFamily: FONTS.SFMedium
    },
    inactiveLabelStyle: {
        color: '#D5D5D5',
        fontSize: wp('4.5'),
        fontFamily: FONTS.SFMedium
    },
    countBox: {
        width: 15,
        height: 15,
        backgroundColor: '#2C99C6',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    countText: {
        color: '#FFFFFF',
        fontSize: 7
    },
    btnStyle: {
        width: wp('90'),
        height: 46,
        borderWidth: 1,
        borderColor: '#2C99C6',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12
    },
    btnText: {
        color: '#2C99C6',
        fontFamily: FONTS.SFMedium,
        fontSize: wp('3.2')
    }
})
