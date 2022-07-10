import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../../constant'


const referralSection = ({navigation}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate("GetSpotyPoints")} style={styles.container} >
            <Text style={styles.subHeadingStyle} >Do you have a Referral Code?</Text>
            <View style={styles.switchRow}>
                <Text style={styles.heading} >Add Referral Code</Text>
                <TouchableOpacity>
                    <Image source={ICONS.giftIcon} style={{ width: 15, height: 15 }} resizeMode='contain' />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default referralSection

const styles = StyleSheet.create({
    container: {
        width: wp('82'),
    },
    subHeadingStyle: {
        width: '100%',
        color: '#000000',
        opacity: 0.5,
        fontSize: wp('2.8'),
        fontFamily: FONTS.SFRegular,
    },
    switchRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 6
    },
    heading: {
        width: '85%',
        color: '#000000',
        fontSize: wp('4.2'),
        fontFamily: FONTS.SFBold,
    },
})
