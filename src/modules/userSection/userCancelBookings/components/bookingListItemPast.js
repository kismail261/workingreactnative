import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS, ImageUrl } from '../../../../constant'


const bookingListItemPause = ({ navigation, detail }) => {

   

    return (
        <TouchableOpacity onPress={() => navigation.navigate("bookingDetail", { type: 2, detail: detail })} style={styles.container} >
            <View style={styles.headerRow}>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelText} >Past</Text>
                </View>
                <View />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, marginTop: 2 }} >
                <Image source={detail.listing.images.length > 0 ? { uri: ImageUrl + detail.listing.images } : ICONS.providerGallery} style={{ width: 70, height: 70, borderRadius: 4, }} />
                <View>
                    <Text style={styles.labelStyle}>{detail.listing.listingType}</Text>
                    <Text style={styles.titleStyle} >{detail.listing.title}</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 8 }} >
                        <Image source={ICONS.pinBlue} style={{ width: 5, height: 8, marginRight: 4, marginTop: 4 }} resizeMode='stretch' />
                        <Text numberOfLines={2} style={styles.locationStyle} >{detail.listing.location != undefined ? detail.listing.location.description : 'n/a'}  </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default bookingListItemPause

const styles = StyleSheet.create({
    container: {
        width: wp('90'),
        backgroundColor: '#FFFFFF',
        borderWidth: 0.4,
        borderColor: '#15488F26',
        borderRadius: 4,
        marginTop: 15,
        alignItems: 'center',
        elevation: 1
    },
    headerRow: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    labelContainer: {
        width: 64,
        height: 18,
        backgroundColor: '#E6C06A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    labelText: {
        color: '#FFFFFF',
        fontSize: 8,
        fontFamily: FONTS.SFRegular
    },
    titleStyle: {
        width: wp("65"),
        color: '#000000',
        fontSize: wp('4.3'),
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
    takingStyle: {
        color: '#000000',
        fontSize: wp('2.3'),
        fontFamily: FONTS.SFRegular,
    },
    menuItemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    locationStyle: {
        width: wp('50'),
        color: '#000000',
        fontSize: wp('3'),
        fontFamily: FONTS.SFRegular,
    }

})
