import React, { } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS } from '../../constant'
import BookingDetail from './components/bookingDetails'
import BookingItem from './components/detailItem'
import Header from './components/header'


const bookingsDetail = (props) => {
    const detail = props.route.params.detail
    const listingdDetail = props.route.params.listingdDetail

    return (
        <View style={styles.container}>
            <Header navigation={props.navigation} label="Booking Details" />
            <ScrollView>
                <View style={{ alignItems: 'center' }} >
                    <BookingItem detail={listingdDetail} />
                    <BookingDetail detail={detail} />
                </View>
            </ScrollView>
            {
                detail.status == "cancel"
                ?
                null
                :
                    <TouchableOpacity onPress={() => props.navigation.navigate("reason", { detail: detail })} style={styles.btnStyle} >
                        <Text style={styles.btnText} >Cancel Booking</Text>
                    </TouchableOpacity>
            }
            
        </View>
    )
}

export default bookingsDetail

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
        position: 'absolute',
        bottom: 30
    },
    btnText: {
        color: '#2C99C6',
        fontFamily: FONTS.SFMedium,
        fontSize: wp('3.2')
    }
})
