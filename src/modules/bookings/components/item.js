import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS, ImageUrl } from '../../../constant'


const item = ({ navigation, type, detail, listingdDetail }) => {

    useEffect(() => {
        return () => {

        }
    }, [])

    return (
        <TouchableOpacity onPress={() => navigation.navigate(type == 1 ? "bookingsDetail" : "cancellationDetail", { detail: detail, listingdDetail: listingdDetail })} style={styles.container} >
            <Image source={detail.user.Profile.avatar != undefined ? { uri: ImageUrl + detail.user.Profile.avatar } : ICONS.userIcon} style={{ width: wp('10'), height: wp('10'), borderRadius: wp('10'), }} />
            <View>
                <Text style={styles.titleStyle} >{detail.user.Profile.name != undefined ? detail.user.Profile.name : 'n/a'}</Text>
                <Text style={styles.labelStyle}>{detail.listing.title}</Text>
            </View>
            <Image source={ICONS.nextArrow} style={{ width: 6, height: 12, marginLeft: 8 }} />
        </TouchableOpacity>
    )
}

export default item

const styles = StyleSheet.create({
    container: {
        width: wp('90'),
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#15488F26',
        borderRadius: 4,
        marginBottom: 12,
        alignItems: 'center',
        elevation: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    titleStyle: {
        width: wp("68"),
        color: '#000000',
        fontSize: wp('5'),
        fontFamily: FONTS.SFBold,
        marginLeft: 8
    },
    labelStyle: {
        width: wp("68"),
        color: '#000000',
        fontSize: wp('3'),
        fontFamily: FONTS.SFRegular,
        marginLeft: 8
    },

})
