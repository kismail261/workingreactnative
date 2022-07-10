import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS, FONTS, ICONS } from '../../../constant'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Header from "../../../common/headerBL";

export const ViewLiability = ({ navigation, route }) => {
    const detail = route.params.detail

    return (
        <View style={styles.container}>
            <Header navigation={navigation} label={"Waiver, Release of Liability"} />
            <View style={{ height: 50 }} />
            <View style={{ width: '85%' }} >
                <Text style={styles.detailStyle}>{detail}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.rowStyle}>
                <Image source={ICONS.pdfIcon} style={{ width: 35, height: 45 }} />
                <View style={{ width: '80%', marginLeft: 10 }} >
                    <Text style={styles.pdfNameStyle} >Release_of_Liability.pdf</Text>
                    <Text style={styles.sizeStyle}>53 kb</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    labelStyle: {
        width: '85%',
        color: COLORS.secondary,
        fontSize: wp(6),
        fontFamily: FONTS.SFSemiBold
    },
    detailStyle: {
        width: '85%',
        color: COLORS.secondary,
        fontSize: wp(4),
        fontFamily: FONTS.SFRegular
    },
    divider: {
        width: '85%',
        height: 1,
        backgroundColor: 'rgba(112, 112, 112, 0.1)',
        marginVertical: 21
    },
    rowStyle: {
        width: '85%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    pdfNameStyle: {
        color: '#2C99C6',
        fontSize: wp('4.2'),
        fontFamily: FONTS.SFMedium
    },
    sizeStyle: {
        color: '#707070',
        fontSize: wp('3'),
        fontFamily: FONTS.SFMedium
    }
})