import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { ICONS, FONTS } from '../../../constant'

const bookingSubItem = ({ img, label, subLabel}) => {
    return (
        <View style={styles.container} >
            <View style={{ width: wp('10'), height: wp('10'), justifyContent: 'center', alignItems: 'center' }} >
                <Image source={img} style={{ width: wp('5'), height: wp('5') }} resizeMode="contain" />
            </View>

            <View>
                <Text style={styles.labelStyle}>{subLabel}</Text>
                <Text style={styles.titleStyle} >{label}</Text>
            </View>
        </View>
    )
}

export default bookingSubItem

const styles = StyleSheet.create({
    container: {
        width: wp('90'),
        flexDirection: 'row',
        padding: 12,
    },
    titleStyle: {
        width: wp("65"),
        color: '#000000',
        fontSize: wp('5.5'),
        fontFamily: FONTS.SFBold,
        marginLeft: 8
    },
    labelStyle: {
        width: wp("65"),
        color: '#6B6B6B',
        fontSize: wp('2.8'),
        fontFamily: FONTS.SFRegular,
        marginLeft: 8
    },
})
