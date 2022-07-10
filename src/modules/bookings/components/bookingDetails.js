import moment from 'moment'
import React,{useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { ICONS, FONTS, ImageUrl } from '../../../constant'
import BookingSubItem from './bookingSubItem'


const bookingDetails = ({ detail}) => {

    useEffect(() => {
        return () => {
            
        }
    }, [])
    
    return (
        <View style={styles.container} >
            
            <View style={{ width: wp('90'), flexDirection: 'row', alignItems: 'center', padding: 12, }} >
                <Image source={detail.provider.Profile.avatar != undefined ? { uri: ImageUrl + detail.provider.Profile.avatar} : ICONS.userIcon} style={{ width: wp('10'), height: wp('10'), borderRadius: wp('10'), }} />
                <View>
                    <Text style={styles.titleStyle} >{detail.provider.Profile.name != undefined ? detail.provider.Profile.name : 'n/a' }</Text>
                    <Text style={styles.labelStyle}>{detail.listing.title}</Text>
                </View>
            </View>
            <BookingSubItem img={ICONS.calendarBlue} label={moment(detail.selectedDateTime.start).format('DD MMMM, YYYY')} subLabel="Booking Date & Time" />
            <BookingSubItem img={ICONS.listBlue} label={detail.status} subLabel="Booking Status" />
            <BookingSubItem img={ICONS.handBlue} label="Credit Card" subLabel="Payment Method" />
        </View>
    )
}

export default bookingDetails

const styles = StyleSheet.create({
    container: {
        width: wp('90'),
        alignItems: 'center'
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
        fontSize: wp('2.5'),
        fontFamily: FONTS.SFRegular,
        marginLeft: 8
    },
    
})
