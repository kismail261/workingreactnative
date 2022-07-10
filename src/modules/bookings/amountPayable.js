import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS, Url } from '../../constant'
import Header from './components/header'
import LargeBtn from '../../common/largeBtnSP'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks'


const AmountRow = ({ title, amount, paid }) => {
    return (
        <View style={{ width: wp('85'), alignItems: 'center' }}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: '#000000', fontSize: wp('3.5'), fontFamily: FONTS.SFRegular, width: '80%', }} >{title}</Text>
                <Text style={{ color: '#000000', fontSize: wp('3.5'), fontFamily: FONTS.SFRegular, }} >{amount}</Text>
            </View>
            <Text style={{ color: '#000000', fontSize: wp('2.5'), fontFamily: FONTS.SFRegular, width: '100%', opacity: 0.54 }} >{paid}</Text>
        </View>
    )
}

const amountPayable = (props) => {
    const detail = props.route.params.detail;
    const apiData = props.route.params.apiData;
    const token = useSelector(state => state.user.token)
    const [loader, setLoader] = useState(false)
    let charges = ((2 / 100) * detail.totalPrice)


    useEffect(() => {
        return () => {
        }
    }, [])

    const cancelBookingClick = () => {
        setLoader(true)
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        axios.post(`${Url}api/booking/cancel-provider`, apiData,
            {
                headers: headers
            })
            .then(resp => {
                let response = resp.data
                setLoader(false)
                props.navigation.navigate("thankYouNote", { type: 1, listingId: detail })
            }).catch(error => {
                const err = error
                if (err.response) {
                    showMessage(err.response.data.message, 'warning')
                }
                setLoader(false)
            });
    }

    return (
        <View style={styles.container} >
            <Header navigation={props.navigation} label="Amount Payable" />
            <ScrollView>
                <View style={{ width: wp('90'), alignItems: 'center' }}>
                    <Text style={styles.headingStyle} >Amount Payable to {detail.user.Profile.name}</Text>
                    <Text style={styles.detail} >Please checkout the break down of amount including what we'll pay to user and what you have to pay due to this inconvenience caused to user</Text>
                    <View style={{ height: 15 }} />
                    <View style={styles.paymentDetail}>
                        <AmountRow title="Total Booking Amount" amount={"$" + detail.totalPrice} paid="Paid by user" />
                        <View style={styles.divider} />
                        <AmountRow title="Cancellation Charge" amount={"$" + charges} paid="Will be paid by you to Sporforya" />
                        <View style={styles.divider} />
                        <AmountRow title="Amount that will be paid back to user" amount={"$" + detail.totalPrice} paid="" />
                    </View>
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 30, alignSelf: 'center' }} >
                {
                    loader
                        ?
                        <ActivityIndicator size={"small"} color={"#000000"} />
                        :
                        <LargeBtn label="Cancel Booking" onClick={cancelBookingClick} bgColor="#2C99C6" />
                }
            </View>
        </View>
    )
}

export default amountPayable

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
        fontSize: wp('3.8'),
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
