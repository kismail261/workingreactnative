import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'


const bookingItem = ({navigation, detail}) => {
    return (
        <View style={styles.container} >
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, }} >
                <Image source={ICONS.providerGallery} style={{ width: 70, height: 70, borderRadius: 4, }} />
                <View>
                    <Text style={styles.titleStyle} >{detail.title}</Text>
                    <Text style={styles.labelStyle}>{detail.listingType}</Text>
                </View>
            </View>
            <View style={styles.divider} />
            <TouchableOpacity onPress={() => navigation.navigate("selectCancelBookingUsers", {detail: detail})} >
                <Text style={styles.btnText} >Cancel Multiple Bookings</Text>
            </TouchableOpacity>
        </View>
    )
}

export default bookingItem

const styles = StyleSheet.create({
    container: {
        width: wp('90'),
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#15488F26',
        borderRadius: 4,
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
        elevation:1
    },
    titleStyle: {
        width: wp("65"),
        color: '#000000',
        fontSize: wp('5'),
        fontFamily: FONTS.SFBold,
        marginLeft: 8
    },
    labelStyle: {
        width: wp("65"),
        color: '#000000',
        fontSize: wp('3'),
        fontFamily: FONTS.SFRegular,
        marginLeft: 8
    },
    divider: {
        width: wp('90'),
        backgroundColor: '#15488F26',
        height: 1,
        marginTop: 12,
        marginBottom: 12
    },
    btnText: {
        color:'#2C99C6',
        fontSize: wp('3'),
        fontFamily: FONTS.SFRegular,
        marginBottom: 12
    }
})
