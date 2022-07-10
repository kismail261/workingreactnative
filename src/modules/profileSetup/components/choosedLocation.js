import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'

const choosedLocation = ({ data }) => {
    const { shortName, description } = data
    return (
        <View style={styles.card} >
            <View style={styles.rowStyle}>
                <Text style={styles.locationName} >{shortName}</Text>
                <Image source={ICONS.greenTick} style={{ width: 16, height: 16, marginLeft: 5 }} />
            </View>
            <View style={{ height: 7 }} />
            <View style={styles.rowStyle}>
                <Image source={ICONS.greenMarker} style={{ width: 10, height: 14, marginRight: 5 }} />
                <Text numberOfLines={2} style={styles.descStyle} >{description}</Text>
            </View>
        </View>
    )
}

export default choosedLocation

const styles = StyleSheet.create({
    card: {
        width: wp('80%'),
        height: 80,
        shadowColor: '#00000080',
        shadowOffset: { width: 0, height: 1 },
        // elevation: 10,
        shadowRadius: 4,
        shadowOpacity: 0.26,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        marginTop: 10,
        borderColor: '#15488F26',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowStyle: {
        width: wp('72'),
        flexDirection: 'row',
    },
    locationName: {
        width: wp('65'),
        fontSize: wp('4.2'),
        fontFamily: FONTS.SFBold,
        color: '#000000',
    },
    descStyle: {
        width: wp('66'),
        fontSize: wp('3.2'),
        fontFamily: FONTS.SFRegular,
        color: '#000000',
    },
})
