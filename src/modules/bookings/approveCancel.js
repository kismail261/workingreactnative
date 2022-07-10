import React,{useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../constant'
import Header from './components/header'
import LargeBtn from '../../common/largeBtnSP'
import { cancelBookingProvider } from '../../redux/booking/booking.action'
import { setLoader } from '../../redux/loader/loader.action'
import { useDispatch, useSelector } from 'react-redux'

const AmountRow = ({ title, amount, paid }) => {
    return (
        <View style={{ width: wp('85'), alignItems: 'center' }}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: '#000000', fontSize: wp('3.5'), fontFamily: FONTS.SFRegular, width: '80%', }} >{title}</Text>
                <Text style={{ color: '#000000', fontSize: wp('3.5'), fontFamily: FONTS.SFRegular, }} >${amount}</Text>
            </View>
            <Text style={{ color: '#000000', fontSize: wp('2.5'), fontFamily: FONTS.SFRegular, width: '100%', opacity: 0.54 }} >{paid}</Text>
        </View>
    )
}

const approveCancel = (props) => {
    const detail = props.route.params.detail
    const listingdDetail = props.route.params.listingdDetail

    const dispatch = useDispatch()
    const loader = useSelector(state => state.loader.loader)
    const token = useSelector(state => state.user.token)
    let charges = ((2 / 100) * detail.totalPrice)

    useEffect(() => {
        return () => {
        }
    }, [])

    const onApproveClick = () => {
        dispatch(setLoader(true))
        let data = {
            "bookingIds": [detail._id],
            "userIds": [detail.userId],
            "cancelReason": "Requested from user side",
            "status": "approve"
        }
        dispatch(cancelBookingProvider(token, data, listingdDetail._id))
        props.navigation.navigate("thankYouNote", { type: 2, listingId: listingdDetail  })
    }

    return (
        <View style={styles.container} >
            <Header navigation={props.navigation} label="Amount Payable" />
            <ScrollView>
                <View style={{ width: wp('90'), alignItems: 'center' }}>
                    <Text style={styles.headingStyle} >Amount Payable to {detail.user.Profile.name}</Text>
                    <Text style={styles.detail} >Please checkout the break down of amount including what we'll pay to user and cancellation charges.</Text>
                    <View style={{ height: 15 }} />
                    <View style={styles.paymentDetail}>
                        <AmountRow title="Total Booking Amount" amount={detail.totalPrice} paid="Paid by user" />
                        <View style={styles.divider} />
                        <AmountRow title="Cancellation Charge" amount={charges} paid="Will be paid by you to Sporforya" />
                        <View style={styles.divider} />
                        <AmountRow title="Amount that will be paid back to user" amount={detail.totalPrice - charges} paid="" />
                    </View>
                </View>
            </ScrollView>
            {
                loader
                    ?
                    <ActivityIndicator size={'small'} color={"#000000"} />
                    :
                    <View style={{ position: 'absolute', bottom: 30, alignSelf: 'center' }} >
                        <LargeBtn label="Approve Cancel" onClick={onApproveClick} bgColor="#2C99C6" />
                    </View>
            }
        </View>
    )
}

export default approveCancel

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
        alignItems: 'center'
    },
    headingStyle: {
        width: wp('90'),
        color: "#000000",
        fontSize: wp('6.5'),
        fontFamily: FONTS.SFSemiBold,
        marginTop: 8
    },
    detail: {
        width: wp('90'),
        color: "#707070",
        fontSize: wp('4.2'),
        fontFamily: FONTS.SFRegular,
        marginTop: 8
    },

    paymentDetail: {
        width: wp('90'),
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
        width: wp('90'),
        height: 140,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: 7,
        marginTop: 5
    },
    divider: {
        width: wp('85'),
        height: 1,
        backgroundColor: '#707070',
        marginTop: 14,
        marginBottom: 14
    }
})
