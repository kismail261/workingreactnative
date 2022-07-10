import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../constant'


const headerBL = ({ navigation, label }) => {
    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={ICONS.backArrow} style={styles.backBtnIcon} resizeMode="contain" />
            </TouchableOpacity>
            <Text style={styles.titleStyle} >{label}</Text>
            <View style={{ width: 12, height: 20, marginRight: wp('5%') }} />
        </View>
    )
}

export default headerBL

const styles = StyleSheet.create({
    container: {
        width: wp('100'),
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#15488F1A',
        borderBottomWidth: 1,
        marginBottom: 1,
        marginTop: Platform.OS == 'android' ? 0 : 35
    },
    backBtnIcon: {
        width: wp('3.5'),
        height: wp('6'),
        marginLeft: wp('7.5%')
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleStyle: {
        color: '#000000',
        fontFamily: FONTS.SFSemiBold,
        fontSize: wp('5'),
        marginLeft: 8
    }
})
